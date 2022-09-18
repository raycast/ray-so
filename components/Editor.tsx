import React, {
  useMemo,
  useCallback,
  KeyboardEventHandler,
  useRef,
} from "react";
import styles from "styles/Editor.module.css";
import { rehype } from "rehype";
import rehypePrism from "rehype-prism-plus";

const processHtml = (html: string) => {
  return rehype()
    .data("settings", { fragment: true })
    .use([[rehypePrism, { ignoreMissing: true }]])
    .processSync(`${html}`)
    .toString();
};

function htmlEncode(sHtml: string) {
  return sHtml
    .replace(
      /```(tsx?|jsx?|html|xml)(.*)\s+([\s\S]*?)(\s.+)?```/g,
      (str: string) => {
        return str.replace(
          /[<&"]/g,
          (c: string) =>
            ((
              {
                "<": "&lt;",
                ">": "&gt;",
                "&": "&amp;",
                '"': "&quot;",
              } as Record<string, string>
            )[c])
        );
      }
    )
    .replace(
      /[<&"]/g,
      (c: string) =>
        ((
          { "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" } as Record<
            string,
            string
          >
        )[c])
    );
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

function handleTab(textarea: HTMLTextAreaElement, shiftKey: boolean) {
  const original = textarea.value;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;

  const beforeStart = original.slice(0, start);

  const currentLine = original
    .slice(
      beforeStart.lastIndexOf("\n") != -1
        ? beforeStart.lastIndexOf("\n") + 1
        : 0
    )
    .split("\n")[0];

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
  const original = textarea.value;

  const start = textarea.selectionStart;
  const beforeStart = original.slice(0, start);

  const currentLine = original
    .slice(
      beforeStart.lastIndexOf("\n") != -1
        ? beforeStart.lastIndexOf("\n") + 1
        : 0
    )
    .split("\n")[0];

  const currentIndentationMatch = currentLine.match(/^(\s+)/);
  let wantedIndentation = currentIndentationMatch
    ? currentIndentationMatch[0]
    : "";

  if (currentLine.match(/([{\[:>])$/)) {
    wantedIndentation += "  ";
  }

  document.execCommand("insertText", false, `\n${wantedIndentation}`);
}

function Editor() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );

  const html = useMemo(
    () =>
      processHtml(
        `<pre><code class="language-javascript">${htmlEncode(
          code
        )}</code></pre>`
      ),
    [code]
  );

  const preView = useMemo(
    () => (
      <div
        className={styles.formatted}
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    ),
    [html]
  );

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLTextAreaElement>>(
    (event) => {
      switch (event.key) {
        case "Tab":
          event.preventDefault();
          handleTab(textareaRef.current!, event.shiftKey);
          break;
        case "Enter":
          event.preventDefault();
          handleEnter(textareaRef.current!);
          break;
      }
    },
    []
  );

  return (
    <div
      className={styles.editor}
      style={{ "--editor-padding": "32px" } as React.CSSProperties}
    >
      <textarea
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        autoCapitalize="off"
        ref={textareaRef}
        className={styles.textarea}
        value={code}
        onChange={(event) => {
          setCode(event.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
      {preView}
    </div>
  );
}

export default Editor;
