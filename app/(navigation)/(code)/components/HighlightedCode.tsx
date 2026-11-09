import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { highlightedLinesAtom, highlighterAtom, loadingLanguageAtom } from "../store";
import { themeDarkModeAtom, themeAtom } from "../store/themes";
import { Language, LANGUAGES } from "../util/languages";

import styles from "./Editor.module.css";

type PropTypes = {
  selectedLanguage: Language | null;
  code: string;
};

const HighlightedCode: React.FC<PropTypes> = ({ selectedLanguage, code }) => {
  const [rendered, setRendered] = useState({ html: "", key: "" });
  const highlighter = useAtomValue(highlighterAtom);
  const setIsLoadingLanguage = useSetAtom(loadingLanguageAtom);
  const highlightedLines = useAtomValue(highlightedLinesAtom);
  const darkMode = useAtomValue(themeDarkModeAtom);
  const theme = useAtomValue(themeAtom);
  const themeName = theme.id === "tailwind" ? (darkMode ? "tailwind-dark" : "tailwind-light") : "css-variables";
  const renderKey = JSON.stringify([code, selectedLanguage?.name, themeName, highlightedLines]);

  useEffect(() => {
    let cancelled = false;
    let loadingLanguage = false;

    const generateHighlightedHtml = async () => {
      if (!highlighter || !selectedLanguage || selectedLanguage === LANGUAGES.plaintext) {
        return code.replace(/[\u00A0-\u9999<>\&]/g, (i) => `&#${i.charCodeAt(0)};`);
      }

      const loadedLanguages = highlighter.getLoadedLanguages() || [];
      const hasLoadedLanguage = loadedLanguages.includes(selectedLanguage.name.toLowerCase());

      if (!hasLoadedLanguage && selectedLanguage.src) {
        loadingLanguage = true;
        setIsLoadingLanguage(true);
        await highlighter.loadLanguage(selectedLanguage.src);
        if (cancelled) return "";
        loadingLanguage = false;
        setIsLoadingLanguage(false);
      }

      let lang = selectedLanguage.name.toLowerCase();
      if (lang === "typescript") {
        lang = "tsx";
      }

      return highlighter.codeToHtml(code, {
        lang: lang,
        theme: themeName,
        transformers: [
          {
            line(node, line) {
              node.properties["data-line"] = line;
              if (highlightedLines.includes(line)) this.addClassToHast(node, "highlighted-line");
            },
          },
        ],
      });
    };

    generateHighlightedHtml().then(
      (html) => {
        if (!cancelled) setRendered({ html, key: renderKey });
      },
      (error) => {
        if (!cancelled) {
          setIsLoadingLanguage(false);
          console.error("Could not highlight code", error);
        }
      },
    );

    return () => {
      cancelled = true;
      if (loadingLanguage) setIsLoadingLanguage(false);
    };
  }, [code, highlightedLines, highlighter, selectedLanguage, setIsLoadingLanguage, renderKey, themeName]);

  return (
    <div
      className={classNames(styles.formatted, selectedLanguage === LANGUAGES.plaintext && styles.plainText)}
      data-export-layer="code"
      data-export-ready={rendered.key === renderKey}
      dangerouslySetInnerHTML={{
        __html: rendered.html,
      }}
    />
  );
};

export default HighlightedCode;
