import React, {
  useCallback,
  KeyboardEventHandler,
  useRef,
  ChangeEventHandler,
  FormEventHandler,
  FocusEventHandler,
} from "react";
import styles from "styles/Editor.module.css";
import { useAtom } from "jotai";
import {
  codeAtom,
  isCodeExampleAtom,
  selectedLanguageAtom,
} from "../store/code";
import { themeCSSAtom } from "../store/themes";
import useHotkeys from "../util/useHotkeys";
import HighlightedCode from "./HighlightedCode";

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

  return original
    .slice(
      beforeStart.lastIndexOf("\n") != -1
        ? beforeStart.lastIndexOf("\n") + 1
        : 0
    )
    .split("\n")[0];
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
      document.execCommand(
        "insertText",
        false,
        dedentText(original.slice(newStart, end))
      );
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
  let wantedIndentation = currentIndentationMatch
    ? currentIndentationMatch[0]
    : "";

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

  useHotkeys("f", (event) => {
    event.preventDefault();
    textareaRef.current?.focus();
  });

  useHotkeys("esc", (event) => {
    if (textareaRef.current === event.target) {
      textareaRef.current?.blur();
    }
  });

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLTextAreaElement>>(
    (event) => {
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
        case "Enter":
          event.preventDefault();
          handleEnter(textarea);
          break;
      }
    },
    []
  );

  const handleInput = useCallback<FormEventHandler<HTMLTextAreaElement>>(() => {
    const textarea = textareaRef.current!;
    textarea.style.height = "0px";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, []);

  const handleChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    (event) => {
      setCode(event.target.value);
    },
    [setCode]
  );

  const handleFocus = useCallback<FocusEventHandler>(() => {
    if (isCodeExample && textareaRef.current) {
      textareaRef.current.select();
    }
  }, [isCodeExample]);

  return (
    <div
      className={styles.editor}
      style={{ "--editor-padding": "16px", ...themeCSS } as React.CSSProperties}
    >
      <textarea
        tabIndex={1}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        autoCapitalize="off"
        ref={textareaRef}
        className={styles.textarea}
        value={code}
        onChange={handleChange}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
      />
      {<HighlightedCode code={code} selectedLanguage={selectedLanguage} />}
    </div>
  );
}

export default Editor;
