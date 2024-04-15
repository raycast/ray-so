import classNames from "classnames";
import React, { useEffect, useMemo, useState } from "react";
import { Language, LANGUAGES } from "../util/languages";

import styles from "../styles/Editor.module.css";
import { Highlighter, getHighlighter, bundledLanguages, bundledThemes } from "shiki";

import { useAtom } from "jotai";
import { themeAtom } from "../store/themes";

type PropTypes = {
  selectedLanguage: Language | null;
  code: string;
};

const HighlightedCode: React.FC<PropTypes> = ({ selectedLanguage, code }) => {
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null);
  const [theme, setTheme] = useState("monokai");

  useEffect(() => {
    getHighlighter({
      themes: Object.keys(bundledThemes),
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

  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        {Object.keys(bundledThemes).map((theme) => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
      {preView}
    </div>
  );
};

export default HighlightedCode;
