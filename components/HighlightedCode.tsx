import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Language, LANGUAGES } from "../util/languages";

import styles from "../styles/Editor.module.css";
import { highlightedLinesAtom, highlighterAtom, loadingLanguageAtom } from "../store";
import { useAtom, useSetAtom } from "jotai";
import { customThemesAtom, themeAtom } from "../store/themes";

type PropTypes = {
  selectedLanguage: Language | null;
  code: string;
};

const HighlightedCode: React.FC<PropTypes> = ({ selectedLanguage, code }) => {
  const [highlighter] = useAtom(highlighterAtom);
  const [highlightedHtml, setHighlightedHtml] = useState("");
  const setIsLoadingLanguage = useSetAtom(loadingLanguageAtom);
  const [highlightedLines, setHighlightedLines] = useAtom(highlightedLinesAtom);
  const [theme, setTheme] = useAtom(themeAtom);
  const [customThemes] = useAtom(customThemesAtom);
  const isCustomTheme = !!customThemes.find((t) => t.id === theme.id);

  console.log("isCUstomTHeme", isCustomTheme);

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

      const loadedThemes = highlighter.getLoadedThemes() || [];
      const hasLoadedTheme = loadedThemes.includes(theme.id);
      console.log("loadedTHemes", loadedThemes, hasLoadedTheme, theme.id);

      if (!hasLoadedTheme && isCustomTheme) {
        // setIsLoadingLanguage(true);
        console.log("theme loading", theme);
        const customThemeConfig = {
          name: theme.name,
          settings: theme.theme.tokenColors,
        };
        await highlighter.loadTheme(customThemeConfig);
        // setIsLoadingLanguage(false);
      }

      return highlighter.codeToHtml(code, {
        lang: lang,
        theme: isCustomTheme ? theme.id : "css-variables",
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

    generateHighlightedHtml().then((newHtml) => {
      if (newHtml) {
        setHighlightedHtml(newHtml);
      }
    });
  }, [
    code,
    selectedLanguage,
    highlighter,
    setIsLoadingLanguage,
    setHighlightedHtml,
    highlightedLines,
    isCustomTheme,
    theme,
  ]);

  return (
    <div
      className={classNames(styles.formatted)}
      dangerouslySetInnerHTML={{
        __html: highlightedHtml,
      }}
    />
  );
};

export default HighlightedCode;
