import classNames from "classnames";
import React, { useEffect, useMemo, useState } from "react";
import { Language, LANGUAGES } from "../util/languages";

import vercel from "../assets/vercel.json";

import styles from "../styles/Editor.module.css";
import { Highlighter, getHighlighter, bundledLanguages, bundledThemes } from "shiki";

type PropTypes = {
  selectedLanguage: Language | null;
  code: string;
  theme: string;
};

export const THEMES = [
  "dark-plus",
  "light-plus",
  "github-dark",
  "github-light",
  "monokai",
  "nord",
  "solarized-dark",
  "solarized-light",
  "dracula",
  "material-theme",
  "night-owl",
];

const HighlightedCode: React.FC<PropTypes> = ({ selectedLanguage, code, theme }) => {
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null);

  useEffect(() => {
    getHighlighter({
      themes: [...THEMES, vercel] as any,
      langs: Object.keys(bundledLanguages),
    }).then((highlighter) => {
      setHighlighter(highlighter);
    });
  }, [theme]);

  const html = useMemo(() => {
    if (selectedLanguage && selectedLanguage !== LANGUAGES.plaintext) {
      const result = highlighter?.codeToHtml(code, {
        lang: selectedLanguage.name.toLowerCase(),
        theme: theme,
      });
      return result || "";
    } else {
      return code.replace(/[\u00A0-\u9999<>\&]/g, function (i) {
        return `&#${i.charCodeAt(0)};`;
      });
    }
  }, [code, selectedLanguage, highlighter, theme]);

  const preView = useMemo(
    () => (
      <pre
        className={classNames(styles.formatted, "hljs")}
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    ),
    [html]
  );

  return preView;
};

export default HighlightedCode;
