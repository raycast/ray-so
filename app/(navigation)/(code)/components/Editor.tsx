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
import { useAtom, useSetAtom } from "jotai";
import { codeAtom, isCodeExampleAtom, selectedLanguageAtom } from "../store/code";
import {
  THEMES,
  themeAtom,
  themeCSSAtom,
  themeFontAtom,
  themeLineNumbersAtom,
  unlockedThemesAtom,
} from "../store/themes";
import useHotkeys from "../../../../utils/useHotkeys";
import HighlightedCode from "./HighlightedCode";
import { GeistMono } from "geist/font/mono";
import classNames from "classnames";
import { derivedFlashMessageAtom } from "../store/flash";
import { highlightedLinesAtom, showLineNumbersAtom } from "../store";

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

function getCurrentlySelectedLine(textarea: HTMLTextAreaElement) {
  const original = textarea.value;

  const selectionStart = textarea.selectionStart;
  const beforeStart = original.slice(0, selectionStart);

  return original.slice(beforeStart.lastIndexOf("\n") != -1 ? beforeStart.lastIndexOf("\n") + 1 : 0).split("\n")[0];
}

function handleTab(textarea: HTMLTextAreaElement, shiftKey: boolean) {
  const original = textarea.value;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;

  const beforeStart = original.slice(0, start);

  const currentLine = getCurrentlySelectedLine(textarea);

  if (start === end) {
    // No text selected
    if (shiftKey) {
      // dedent
      const newStart = beforeStart.lastIndexOf("\n") + 1;
      textarea.setSelectionRange(newStart, end);
      document.execCommand("insertText", false, dedentText(original.slice(newStart, end)));
    } else {
      // indent
      document.execCommand("insertText", false, "  ");
    }
  } else {
    // Text selected
    const newStart = beforeStart.lastIndexOf("\n") + 1 || 0;
    textarea.setSelectionRange(newStart, end);

    if (shiftKey) {
      // dedent
      const newText = dedentText(original.slice(newStart, end));
      document.execCommand("insertText", false, newText);

      if (currentLine.startsWith("  ")) {
        textarea.setSelectionRange(start - 2, start - 2 + newText.length);
      } else {
        textarea.setSelectionRange(start, start + newText.length);
      }
    } else {
      // indent
      const newText = indentText(original.slice(newStart, end));
      document.execCommand("insertText", false, newText);
      textarea.setSelectionRange(start + 2, start + 2 + newText.length);
    }
  }
}

function handleEnter(textarea: HTMLTextAreaElement) {
  const currentLine = getCurrentlySelectedLine(textarea);

  const currentIndentationMatch = currentLine.match(/^(\s+)/);
  let wantedIndentation = currentIndentationMatch ? currentIndentationMatch[0] : "";

  if (currentLine.match(/([{\[:>])$/)) {
    wantedIndentation += "  ";
  }

  document.execCommand("insertText", false, `\n${wantedIndentation}`);
}

function handleBracketClose(textarea: HTMLTextAreaElement) {
  const currentLine = getCurrentlySelectedLine(textarea);
  const { selectionStart, selectionEnd } = textarea;

  if (selectionStart === selectionEnd && currentLine.match(/^\s{2,}$/)) {
    textarea.setSelectionRange(selectionStart - 2, selectionEnd);
  }

  document.execCommand("insertText", false, "}");
}

function Editor() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [code, setCode] = useAtom(codeAtom);
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const [themeCSS] = useAtom(themeCSSAtom);
  const [isCodeExample] = useAtom(isCodeExampleAtom);
  const [themeFont] = useAtom(themeFontAtom);
  const [theme, setTheme] = useAtom(themeAtom);
  const [unlockedThemes, setUnlockedThemes] = useAtom(unlockedThemesAtom);
  const setFlashMessage = useSetAtom(derivedFlashMessageAtom);
  const setHighlightedLines = useSetAtom(highlightedLinesAtom);
  const [isHighlightingLines, setIsHighlightingLines] = useState(false);
  const [showLineNumbers] = useAtom(themeLineNumbersAtom);

  useHotkeys("f", (event) => {
    event.preventDefault();
    textareaRef.current?.focus();
  });

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLTextAreaElement>>((event) => {
    const textarea = textareaRef.current!;
    switch (event.key) {
      case "Tab":
        event.preventDefault();
        handleTab(textarea, event.shiftKey);
        break;
      case "}":
        event?.preventDefault();
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
    }
  }, []);

  const handleChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    (event) => {
      if (event.target.value.includes("🐰") && theme.id !== THEMES.rabbit.id) {
        if (!unlockedThemes.includes(THEMES.rabbit.id)) {
          setUnlockedThemes([...unlockedThemes, THEMES.rabbit.id]);
        }
        setTheme(THEMES.rabbit);
        setFlashMessage({
          message: "Evil Rabbit Theme Unlocked",
          variant: "unlock",
          timeout: 2000,
          icon: React.createElement(THEMES.rabbit.icon || "", { style: { color: "black" } }),
        });
      }
      setCode(event.target.value);
    },
    [setCode, setTheme, setFlashMessage, setUnlockedThemes, unlockedThemes, theme.id]
  );

  const handleFocus = useCallback<FocusEventHandler>(() => {
    if (isCodeExample && textareaRef.current) {
      // Safari needs a timeout otherwise the selection flickers
      const textarea = textareaRef.current;
      setTimeout(() => {
        textarea.select();
      }, 1);
    }
  }, [isCodeExample]);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const lineNumber = (target.closest("[data-line]") as HTMLElement)?.dataset?.line;
      if (lineNumber && isHighlightingLines) {
        setHighlightedLines((prev) => {
          const line = Number(lineNumber);
          if (prev.includes(line)) {
            return prev.filter((l) => l !== line);
          } else {
            return [...prev, line];
          }
        });
      }
    };

    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    };
  }, [setHighlightedLines, isHighlightingLines]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Alt") {
        setIsHighlightingLines(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Alt") {
        setIsHighlightingLines(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div
      className={classNames(
        styles.editor,
        themeFont === "geist-mono"
          ? GeistMono.className
          : themeFont === "ibm-plex-mono"
          ? styles.ibmPlexMono
          : themeFont === "fira-code"
          ? styles.firaCode
          : styles.jetBrainsMono,
        isHighlightingLines && styles.isHighlightingLines,
        showLineNumbers && styles.showLineNumbers
      )}
      style={{ "--editor-padding": "16px 16px 21px 16px", ...themeCSS } as React.CSSProperties}
      data-value={code}
    >
      <textarea
        tabIndex={-1}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        autoCapitalize="off"
        ref={textareaRef}
        className={styles.textarea}
        value={code}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        data-enable-grammarly="false"
      />
      <HighlightedCode code={code} selectedLanguage={selectedLanguage} />
    </div>
  );
}

export default Editor;
