import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Language, LANGUAGES } from "../util/languages";

import styles from "./Editor.module.css";
import { highlightedLinesAtom, highlighterAtom, loadingLanguageAtom, diffModeAtom } from "../store";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { themeDarkModeAtom, themeAtom } from "../store/themes";
import { diffWordsWithSpace } from "diff";

type PropTypes = {
  selectedLanguage: Language | null;
  code: string;
};

interface InlineRange {
  start: number;
  end: number;
  type: "add" | "remove";
}

function applyInlineDiffs(lineNode: any, ranges: InlineRange[]) {
  if (!ranges || ranges.length === 0) return;

  const textNodes: { parent: any; textNode: any; text: string; offset: number }[] = [];
  let currentOffset = 0;

  function walk(node: any) {
    if (node.type === "text") {
      textNodes.push({ parent: null, textNode: node, text: node.value, offset: currentOffset });
      currentOffset += node.value.length;
    } else if (node.children) {
      for (const child of node.children) {
        const startLen = textNodes.length;
        walk(child);
        const endLen = textNodes.length;
        for (let i = startLen; i < endLen; i++) {
          if (!textNodes[i].parent) textNodes[i].parent = node;
        }
      }
    }
  }
  walk(lineNode);

  const tokenToNewChildren = new Map<any, any[]>();

  for (const item of textNodes) {
    const { parent, textNode, text, offset } = item;
    const tokenStart = offset;
    const tokenEnd = offset + text.length;

    const intersectingRanges = ranges.filter((r) => r.start < tokenEnd && r.end > tokenStart);

    if (intersectingRanges.length === 0) {
      if (!tokenToNewChildren.has(parent)) {
        tokenToNewChildren.set(parent, []);
      }
      tokenToNewChildren.get(parent)!.push(textNode);
      continue;
    }

    let currentIdx = 0;
    const newChildren = [];

    for (const r of intersectingRanges) {
      const rStartInText = Math.max(0, r.start - tokenStart);
      if (rStartInText > currentIdx) {
        newChildren.push({ type: "text", value: text.substring(currentIdx, rStartInText) });
      }

      const rEndInText = Math.min(text.length, r.end - tokenStart);
      if (rEndInText > rStartInText) {
        const className = r.type === "add" ? "diff-word-add" : "diff-word-remove";
        newChildren.push({
          type: "element",
          tagName: "span",
          properties: { className: [className] },
          children: [{ type: "text", value: text.substring(Math.max(currentIdx, rStartInText), rEndInText) }],
        });
        currentIdx = rEndInText;
      }
    }

    if (currentIdx < text.length) {
      newChildren.push({ type: "text", value: text.substring(currentIdx) });
    }

    if (!tokenToNewChildren.has(parent)) {
      tokenToNewChildren.set(parent, []);
    }
    tokenToNewChildren.get(parent)!.push(...newChildren);
  }

  tokenToNewChildren.forEach((newChildren, parent) => {
    parent.children = newChildren;
  });
}

const HighlightedCode: React.FC<PropTypes> = ({ selectedLanguage, code }) => {
  const [highlightedHtml, setHighlightedHtml] = useState("");
  const highlighter = useAtomValue(highlighterAtom);
  const setIsLoadingLanguage = useSetAtom(loadingLanguageAtom);
  const highlightedLines = useAtomValue(highlightedLinesAtom);
  const diffMode = useAtomValue(diffModeAtom);
  const darkMode = useAtomValue(themeDarkModeAtom);
  const theme = useAtomValue(themeAtom);
  const themeName = theme.id === "tailwind" ? (darkMode ? "tailwind-dark" : "tailwind-light") : "css-variables";

  useEffect(() => {
    const generateHighlightedHtml = async () => {
      if (!highlighter || !selectedLanguage || selectedLanguage === LANGUAGES.plaintext) {
        return code.replace(/[\u00A0-\u9999<>\&]/g, (i) => `&#${i.charCodeAt(0)};`);
      }

      const loadedLanguages = highlighter.getLoadedLanguages() || [];
      const hasLoadedLanguage = loadedLanguages.includes(selectedLanguage.name.toLowerCase());

      if (!hasLoadedLanguage && selectedLanguage.src) {
        setIsLoadingLanguage(true);
        await highlighter.loadLanguage(selectedLanguage.src);
        setIsLoadingLanguage(false);
      }

      let lang = selectedLanguage.name.toLowerCase();
      if (lang === "typescript") {
        lang = "tsx";
      }

      const lineDiffs: Record<number, InlineRange[]> = {};
      const lines = code.split("\n");

      if (diffMode) {
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].startsWith("-") && i + 1 < lines.length && lines[i + 1].startsWith("+")) {
            const removedCode = lines[i].substring(1);
            const addedCode = lines[i + 1].substring(1);
            const changes = diffWordsWithSpace(removedCode, addedCode);

            let removedOffset = 1;
            let addedOffset = 1;

            const removedRanges: InlineRange[] = [];
            const addedRanges: InlineRange[] = [];

            for (const part of changes) {
              if (part.added) {
                addedRanges.push({
                  start: addedOffset,
                  end: addedOffset + part.value.length,
                  type: "add",
                });
                addedOffset += part.value.length;
              } else if (part.removed) {
                removedRanges.push({
                  start: removedOffset,
                  end: removedOffset + part.value.length,
                  type: "remove",
                });
                removedOffset += part.value.length;
              } else {
                addedOffset += part.value.length;
                removedOffset += part.value.length;
              }
            }

            lineDiffs[i + 1] = removedRanges;
            lineDiffs[i + 2] = addedRanges;
          }
        }
      }

      return highlighter.codeToHtml(code, {
        lang: lang,
        theme: themeName,
        transformers: [
          {
            line(node, line) {
              node.properties["data-line"] = line;
              if (highlightedLines.includes(line)) this.addClassToHast(node, "highlighted-line");

              // Handle diff mode
              if (diffMode) {
                const lineContent = lines[line - 1];
                if (lineContent?.startsWith("+")) {
                  this.addClassToHast(node, "diff-add");
                } else if (lineContent?.startsWith("-")) {
                  this.addClassToHast(node, "diff-remove");
                }

                if (lineDiffs[line]) {
                  applyInlineDiffs(node, lineDiffs[line]);
                }
              }
            },
          },
        ],
      });
    };

    generateHighlightedHtml().then((newHtml) => {
      setHighlightedHtml(newHtml);
    });
  }, [
    code,
    selectedLanguage,
    highlighter,
    setIsLoadingLanguage,
    setHighlightedHtml,
    highlightedLines,
    themeName,
    diffMode,
  ]);

  return (
    <div
      className={classNames(styles.formatted, selectedLanguage === LANGUAGES.plaintext && styles.plainText)}
      dangerouslySetInnerHTML={{
        __html: highlightedHtml,
      }}
    />
  );
};

export default HighlightedCode;
