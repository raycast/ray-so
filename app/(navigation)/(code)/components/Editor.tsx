import React, {
  useCallback,
  KeyboardEventHandler,
  useRef,
  ChangeEventHandler,
  FocusEventHandler,
  useState,
  useEffect,
  useMemo,
} from "react";
import styles from "./Editor.module.css";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { codeExampleAtom, detectBlockLanguage, getBlockLanguage, isCodeExampleAtom } from "../store/code";
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
import classNames from "classnames";
import { derivedFlashMessageAtom } from "../store/flash";
import { LANGUAGES } from "../util/languages";
import {
  activeBlockIdAtom,
  blocksAtom,
  createEmptyBlock,
  resolvedActiveBlockIdAtom,
  setBlocksAndPersistAtom,
  updateBlockAtom,
} from "../store/blocks";

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

const fontMap = {
  "jetbrains-mono": styles.jetBrainsMono,
  "geist-mono": styles.geistMono,
  "ibm-plex-mono": styles.ibmPlexMono,
  "fira-code": styles.firaCode,
  "soehne-mono": styles.soehneMono,
  "roboto-mono": styles.robotoMono,
  "commit-mono": styles.commitMono,
  "space-mono": styles.spaceMono,
  "source-code-pro": styles.sourceCodePro,
  "google-sans-code": styles.googleSansCode,
} as const;

type EditorProps = {
  blockId: string;
};

function Editor({ blockId }: EditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const blocks = useAtomValue(blocksAtom);
  const setBlocksAndPersist = useSetAtom(setBlocksAndPersistAtom);
  const updateBlock = useSetAtom(updateBlockAtom);
  const setActiveBlockId = useSetAtom(activeBlockIdAtom);
  const codeExample = useAtomValue(codeExampleAtom);
  const [isCodeExample] = useAtom(isCodeExampleAtom);
  const [themeCSS] = useAtom(themeCSSAtom);
  const [themeFont] = useAtom(themeFontAtom);
  const [theme, setTheme] = useAtom(themeAtom);
  const [unlockedThemes, setUnlockedThemes] = useAtom(unlockedThemesAtom);
  const setFlashMessage = useSetAtom(derivedFlashMessageAtom);
  const [isHighlightingLines, setIsHighlightingLines] = useState(false);
  const [showLineNumbers] = useAtom(themeLineNumbersAtom);

  const block = blocks.find((b) => b.id === blockId);
  const showingExample = blocks.length === 1 && !blocks.some((b) => b.code.length > 0);
  const code = showingExample && block ? (codeExample?.code ?? "") : (block?.code ?? "");
  const selectedLanguage = useMemo(() => {
    if (!block) return null;
    if (showingExample && codeExample) return codeExample.language;
    return getBlockLanguage(block);
  }, [block, showingExample, codeExample]);

  const numberOfLines = (code.match(/\n/g) || []).length;

  const isActive = useAtomValue(resolvedActiveBlockIdAtom) === blockId;

  useHotkeys("f", (event) => {
    if (!isActive) return;
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
        try {
          localStorage.setItem("codeTheme", THEMES.rabbit.id);
        } catch (error) {
          console.log("Could not set theme in localStorage", error);
        }
        setFlashMessage({
          message: "Evil Rabbit Theme Unlocked",
          variant: "unlock",
          timeout: 2000,
          icon: React.createElement(THEMES.rabbit.icon || "", { style: { color: "black" } }),
        });
      }

      const nextCode = event.target.value;

      if (showingExample) {
        const detectedLanguageKey = codeExample
          ? (Object.keys(LANGUAGES).find((key) => LANGUAGES[key] === codeExample.language) ?? null)
          : null;
        setBlocksAndPersist([
          createEmptyBlock({
            id: blockId,
            code: nextCode,
            languageKey: null,
            detectedLanguageKey,
            title: block?.title ?? "",
          }),
        ]);
      } else {
        updateBlock({ blockId, update: { code: nextCode } });
      }

      detectBlockLanguage(nextCode).then((language) => {
        if (LANGUAGES[language]) {
          updateBlock({ blockId, update: { detectedLanguageKey: language } });
        }
      });
    },
    [
      block?.title,
      blockId,
      codeExample,
      setBlocksAndPersist,
      setFlashMessage,
      setTheme,
      setUnlockedThemes,
      showingExample,
      theme.id,
      unlockedThemes,
      updateBlock,
    ],
  );

  const handleFocus = useCallback<FocusEventHandler>(() => {
    setActiveBlockId(blockId);
    if (isCodeExample && showingExample && textareaRef.current) {
      // Safari needs a timeout otherwise the selection flickers
      const textarea = textareaRef.current;
      setTimeout(() => {
        textarea.select();
      }, 1);
    }
  }, [blockId, isCodeExample, setActiveBlockId, showingExample]);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const lineNumber = (target.closest("[data-line]") as HTMLElement)?.dataset?.line;
      const editorRoot = textareaRef.current?.closest("[data-block-id]") as HTMLElement | null;
      if (!editorRoot || !editorRoot.contains(target)) return;

      if (lineNumber && isHighlightingLines) {
        const line = Number(lineNumber);
        const prev = block?.highlightedLines ?? [];
        const next = prev.includes(line) ? prev.filter((l) => l !== line) : [...prev, line];
        updateBlock({ blockId, update: { highlightedLines: next } });
      }
    };

    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    };
  }, [block?.highlightedLines, blockId, isHighlightingLines, updateBlock]);

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

  if (!block) return null;

  return (
    <div
      className={classNames(
        styles.editor,
        themeFont ? fontMap[themeFont] : styles.jetBrainsMono,
        isHighlightingLines && styles.isHighlightingLines,
        showLineNumbers &&
          selectedLanguage !== LANGUAGES.plaintext && [
            styles.showLineNumbers,
            numberOfLines > 8 && styles.showLineNumbersLarge,
          ],
      )}
      style={{ "--editor-padding": "16px", ...themeCSS } as React.CSSProperties}
      data-value={code}
      data-block-id={blockId}
      onMouseDown={() => setActiveBlockId(blockId)}
    >
      <textarea
        rows={1}
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
      <HighlightedCode code={code} selectedLanguage={selectedLanguage} highlightedLines={block.highlightedLines} />
    </div>
  );
}

export default Editor;
