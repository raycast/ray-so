import React, {
  useCallback,
  KeyboardEventHandler,
  useRef,
  ChangeEventHandler,
  FocusEventHandler,
  useState,
  useEffect,
} from "react";
import styles from "./Editor.module.css";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { isCodeExampleAtom } from "../store/code";
import { themeLineNumbersAtom } from "../store/themes";
import useHotkeys from "../../../../utils/useHotkeys";
import HighlightedCode from "./HighlightedCode";
import { derivedFlashMessageAtom } from "../store/flash";
import { LANGUAGES } from "../util/languages";
import {
  elementContentAtom,
  elementFontFamilyAtom,
  elementHighlightedLinesAtom,
  elementPaddingAtom,
  selectedLanguageAtom,
  themeCSSAtom,
  updateSlideElementAtom,
} from "../store/editor";
import { cn } from "@/utils/cn";
import fonts from "@/fonts/editor/fonts.json";

/* ------------------------------- */
/* Native insert (no execCommand)  */
/* ------------------------------- */

function insertText(textarea: HTMLTextAreaElement, text: string) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const value = textarea.value;
  const newValue = value.slice(0, start) + text + value.slice(end);
  const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;
  nativeSetter?.call(textarea, newValue);
  textarea.dispatchEvent(new Event("input", { bubbles: true }));
  return { start, end, inserted: text, newValue };
}

function setSelection(textarea: HTMLTextAreaElement, start: number, end: number) {
  requestAnimationFrame(() => textarea.setSelectionRange(start, end));
}

/* ------------------------------- */
/* Line utilities                  */
/* ------------------------------- */

function getLineStart(value: string, pos: number) {
  const before = value.slice(0, pos);
  const idx = before.lastIndexOf("\n");
  return idx === -1 ? 0 : idx + 1;
}

function getLineEnd(value: string, pos: number) {
  const after = value.slice(pos);
  const idx = after.indexOf("\n");
  return idx === -1 ? value.length : pos + idx;
}

function getCurrentlySelectedLine(textarea: HTMLTextAreaElement) {
  const { value, selectionStart } = textarea;
  const lineStart = getLineStart(value, selectionStart);
  return value.slice(lineStart).split("\n")[0];
}

function indentText(text: string) {
  return text
    .split("\n")
    .map((str) => `  ${str}`)
    .join("\n");
}

function dedentText(text: string) {
  return text
    .split("\n")
    .map((str) => str.replace(/^\s\s/, ""))
    .join("\n");
}

/* ------------------------------- */
/* Key handlers                    */
/* ------------------------------- */

function handleTab(textarea: HTMLTextAreaElement, shiftKey: boolean) {
  const { value, selectionStart: start, selectionEnd: end } = textarea;
  const beforeStart = value.slice(0, start);
  const currentLine = getCurrentlySelectedLine(textarea);

  if (start === end) {
    if (shiftKey) {
      const newStart = beforeStart.lastIndexOf("\n") + 1;
      textarea.setSelectionRange(newStart, end);
      const newText = dedentText(value.slice(newStart, end));
      insertText(textarea, newText);
      setSelection(textarea, newStart, newStart + newText.length);
    } else {
      insertText(textarea, "  ");
      setSelection(textarea, start + 2, start + 2);
    }
  } else {
    const newStart = beforeStart.lastIndexOf("\n") + 1 || 0;
    textarea.setSelectionRange(newStart, end);
    if (shiftKey) {
      const newText = dedentText(value.slice(newStart, end));
      insertText(textarea, newText);
      setSelection(
        textarea,
        currentLine.startsWith("  ") ? start - 2 : start,
        (currentLine.startsWith("  ") ? start - 2 : start) + newText.length,
      );
    } else {
      const newText = indentText(value.slice(newStart, end));
      insertText(textarea, newText);
      setSelection(textarea, start + 2, start + 2 + newText.length);
    }
  }
}

function handleEnter(textarea: HTMLTextAreaElement) {
  const currentLine = getCurrentlySelectedLine(textarea);
  const match = currentLine.match(/^(\s+)/);
  let indent = match ? match[0] : "";
  if (currentLine.match(/([{\[:>])$/)) indent += "  ";
  const { start } = insertText(textarea, `\n${indent}`);
  setSelection(textarea, start + 1 + indent.length, start + 1 + indent.length);
}

function handleBracketClose(textarea: HTMLTextAreaElement) {
  const currentLine = getCurrentlySelectedLine(textarea);
  const { selectionStart, selectionEnd } = textarea;
  if (selectionStart === selectionEnd && currentLine.match(/^\s{2,}$/)) {
    textarea.setSelectionRange(selectionStart - 2, selectionEnd);
  }
  const { start } = insertText(textarea, "}");
  setSelection(textarea, start + 1, start + 1);
}

function handleAutoPair(textarea: HTMLTextAreaElement, open: string, close: string) {
  const { selectionStart: start, selectionEnd: end, value } = textarea;
  const selected = value.slice(start, end);
  const text = selected ? `${open}${selected}${close}` : `${open}${close}`;
  insertText(textarea, text);
  setSelection(textarea, selected ? start + 1 : start + 1, selected ? end + 1 : start + 1);
}

function handleCommentToggle(textarea: HTMLTextAreaElement) {
  const { value, selectionStart, selectionEnd } = textarea;
  const lineStart = getLineStart(value, selectionStart);
  const lineEnd = getLineEnd(value, selectionEnd);
  const lines = value.slice(lineStart, lineEnd).split("\n");
  const allCommented = lines.every((l) => l.trimStart().startsWith("//"));
  const newLines = lines.map((line) =>
    allCommented ? line.replace(/^(\s*)\/\/\s?/, "$1") : `${line.match(/^(\s*)/)?.[0] ?? ""}// ${line.trimStart()}`,
  );
  const newText = newLines.join("\n");
  textarea.setSelectionRange(lineStart, lineEnd);
  insertText(textarea, newText);
  setSelection(textarea, lineStart, lineStart + newText.length);
}

function handleDeleteLine(textarea: HTMLTextAreaElement) {
  const { value, selectionStart } = textarea;
  const lineStart = getLineStart(value, selectionStart);
  const lineEnd = getLineEnd(value, selectionStart);
  const before = lineStart > 0 ? value.slice(0, lineStart) : "";
  const after =
    lineEnd < value.length ? value.slice(lineEnd + 1) : value.slice(lineStart > 0 ? lineStart - 1 : 0, lineStart);
  const newValue = before + after;
  const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;
  nativeSetter?.call(textarea, newValue);
  textarea.dispatchEvent(new Event("input", { bubbles: true }));
  const newPos = Math.min(lineStart, newValue.length);
  setSelection(textarea, newPos, newPos);
}

function handleMoveLine(textarea: HTMLTextAreaElement, direction: "up" | "down") {
  const { value, selectionStart } = textarea;
  const lineStart = getLineStart(value, selectionStart);
  const lineEnd = getLineEnd(value, selectionStart);
  const currentLine = value.slice(lineStart, lineEnd);

  if (direction === "up") {
    if (lineStart === 0) return;
    const prevLineStart = getLineStart(value, lineStart - 1);
    const prevLine = value.slice(prevLineStart, lineStart - 1);
    const newValue = value.slice(0, prevLineStart) + currentLine + "\n" + prevLine + value.slice(lineEnd);
    const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;
    nativeSetter?.call(textarea, newValue);
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
    setSelection(textarea, prevLineStart, prevLineStart + currentLine.length);
  } else {
    if (lineEnd >= value.length) return;
    const nextLineEnd = getLineEnd(value, lineEnd + 1);
    const nextLine = value.slice(lineEnd + 1, nextLineEnd);
    const before = value.slice(0, lineStart);
    const newValue = before + nextLine + "\n" + currentLine + value.slice(nextLineEnd);
    const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;
    nativeSetter?.call(textarea, newValue);
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
    const offset = before.length + nextLine.length + 1;
    setSelection(textarea, offset, offset + currentLine.length);
  }
}

function handleDuplicateLine(textarea: HTMLTextAreaElement) {
  const { value, selectionStart, selectionEnd } = textarea;
  const lineStart = getLineStart(value, selectionStart);
  const lineEnd = getLineEnd(value, selectionEnd);
  const currentLine = value.slice(lineStart, lineEnd);
  const newValue = value.slice(0, lineEnd) + "\n" + currentLine + value.slice(lineEnd);
  const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;
  nativeSetter?.call(textarea, newValue);
  textarea.dispatchEvent(new Event("input", { bubbles: true }));
  const offset = lineEnd + 1;
  setSelection(textarea, offset, offset + currentLine.length);
}

function handleSelectLine(textarea: HTMLTextAreaElement) {
  const { value, selectionStart } = textarea;
  setSelection(textarea, getLineStart(value, selectionStart), getLineEnd(value, selectionStart));
}

function handleSelectWord(textarea: HTMLTextAreaElement) {
  const { value, selectionStart } = textarea;
  const wordRegex = /\w+/g;
  let match;
  while ((match = wordRegex.exec(value)) !== null) {
    if (match.index <= selectionStart && wordRegex.lastIndex >= selectionStart) {
      setSelection(textarea, match.index, wordRegex.lastIndex);
      break;
    }
  }
}

function handleBlockCommentToggle(textarea: HTMLTextAreaElement) {
  const { value, selectionStart, selectionEnd } = textarea;
  const selected = value.slice(selectionStart, selectionEnd);

  if (!selected) {
    // No selection — insert block comment at cursor
    const text = `/* */`;
    insertText(textarea, text);
    setSelection(textarea, selectionStart + 3, selectionStart + 3);
    return;
  }

  // Toggle — if already wrapped in /* */, remove it
  const trimmed = selected.trim();
  if (trimmed.startsWith("/*") && trimmed.endsWith("*/")) {
    const unwrapped = trimmed.slice(2, -2).trim();
    insertText(textarea, unwrapped);
    setSelection(textarea, selectionStart, selectionStart + unwrapped.length);
  } else {
    const wrapped = `/* ${selected} */`;
    insertText(textarea, wrapped);
    setSelection(textarea, selectionStart, selectionStart + wrapped.length);
  }
}
/* ------------------------------- */
/* Component                       */
/* ------------------------------- */

function Editor() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const themeCSS = useAtomValue(themeCSSAtom);
  const selectedLanguage = useAtomValue(selectedLanguageAtom);
  const code = useAtomValue(elementContentAtom);
  const fontFamily = useAtomValue(elementFontFamilyAtom);
  const highlightedLines = useAtomValue(elementHighlightedLinesAtom);

  const currentFont = fonts.find((f) => f.name === fontFamily) ?? null;

  const [isCodeExample] = useAtom(isCodeExampleAtom);
  const updateSlideElement = useSetAtom(updateSlideElementAtom);
  const setFlashMessage = useSetAtom(derivedFlashMessageAtom);

  const [isHighlightingLines, setIsHighlightingLines] = useState(false);
  const [showLineNumbers] = useAtom(themeLineNumbersAtom);
  const numberOfLines = (code.match(/\n/g) || []).length;
  const language = selectedLanguage?.name ?? "";

  useHotkeys("f", (event) => {
    event.preventDefault();
    textareaRef.current?.focus();
  });

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLTextAreaElement>>((event) => {
    const textarea = textareaRef.current!;
    const isMod = event.metaKey || event.ctrlKey;

    switch (event.key) {
      /* ---- Existing ---- */
      case "Tab":
        event.preventDefault();
        handleTab(textarea, event.shiftKey);
        break;
      case "}":
        event.preventDefault();
        handleBracketClose(textarea);
        break;
      case "Escape":
        event.preventDefault();
        textarea.blur();
        break;
      case "Enter":
        event.preventDefault();
        handleEnter(textarea);
        break;

      /* ---- Auto-pair ---- */
      case "(":
        event.preventDefault();
        handleAutoPair(textarea, "(", ")");
        break;
      case "[":
        event.preventDefault();
        handleAutoPair(textarea, "[", "]");
        break;
      case "{":
        event.preventDefault();
        handleAutoPair(textarea, "{", "}");
        break;
      case '"':
        event.preventDefault();
        handleAutoPair(textarea, '"', '"');
        break;
      case "'":
        event.preventDefault();
        handleAutoPair(textarea, "'", "'");
        break;
      case "`":
        event.preventDefault();
        handleAutoPair(textarea, "`", "`");
        break;

      /* ---- Line movement ---- */
      case "ArrowUp":
        if (event.altKey) {
          event.preventDefault();
          handleMoveLine(textarea, "up");
        }
        break;
      case "ArrowDown":
        if (event.altKey) {
          event.preventDefault();
          handleMoveLine(textarea, "down");
        }
        break;

      /* ---- Mod shortcuts ---- */
      case "/":
        if (isMod && event.shiftKey) {
          event.preventDefault();
          handleBlockCommentToggle(textarea);
        } else if (isMod) {
          event.preventDefault();
          handleCommentToggle(textarea);
        }
        break;
      case "d":
        if (isMod && event.shiftKey) {
          event.preventDefault();
          handleDuplicateLine(textarea);
        } else if (isMod) {
          event.preventDefault();
          handleSelectWord(textarea);
        }
        break;
      case "l":
        if (isMod) {
          event.preventDefault();
          handleSelectLine(textarea);
        }
        break;
      case "k":
        if (isMod && event.shiftKey) {
          event.preventDefault();
          handleDeleteLine(textarea);
        }
        break;
    }
  }, []);

  useEffect(() => {
    if (textareaRef.current && textareaRef.current.value !== code) {
      textareaRef.current.value = code;
    }
  }, [code]);

  const onChangeEditor = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    (event) => {
      updateSlideElement({ content: event.target.value });
    },
    [updateSlideElement],
  );

  const handleFocus = useCallback<FocusEventHandler>(() => {
    if (isCodeExample && textareaRef.current) {
      const textarea = textareaRef.current;
      setTimeout(() => textarea.select(), 1);
    }
  }, [isCodeExample]);

  /* Alt hold → line highlight mode */
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!isHighlightingLines) return;
      const target = event.target as HTMLElement;
      const lineNumber = Number((target.closest("[data-line]") as HTMLElement)?.dataset?.line);
      if (!lineNumber) return;
      updateSlideElement({
        properties: {
          highlightedLines: highlightedLines.includes(lineNumber)
            ? highlightedLines.filter((l) => l !== lineNumber)
            : [...highlightedLines, lineNumber],
        },
      });
    };
    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener);
  }, [updateSlideElement, highlightedLines, isHighlightingLines]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Alt") setIsHighlightingLines(true);
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Alt") setIsHighlightingLines(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return (
    <div
      className={cn(
        styles.editor,
        isHighlightingLines && styles.isHighlightingLines,
        showLineNumbers &&
          language !== LANGUAGES.plaintext.name && [
            styles.showLineNumbers,
            numberOfLines > 8 && styles.showLineNumbersLarge,
          ],
      )}
      style={
        {
          "--editor-padding": "16px",
          ...themeCSS,
          fontFamily: `var(${currentFont?.variable})`,
        } as React.CSSProperties
      }
      data-value={code}
    >
      <textarea
        rows={1}
        tabIndex={-1}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        autoCapitalize="off"
        ref={textareaRef}
        className={styles.textarea}
        defaultValue={code}
        onChange={onChangeEditor}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        data-enable-grammarly="false"
      />
      <HighlightedCode code={code} selectedLanguage={selectedLanguage!} />
    </div>
  );
}

export default Editor;
