import classNames from "classnames";
import React, { useEffect, useMemo, useState } from "react";
import { Language, LANGUAGES } from "../util/languages";

import styles from "../styles/Editor.module.css";
import { Highlighter, getHighlighter, bundledLanguages, bundledThemes, createCssVariablesTheme } from "shiki";

type PropTypes = {
  selectedLanguage: Language | null;
  code: string;
  highlighter: Highlighter | null;
};

const HighlightedCode: React.FC<PropTypes> = ({ selectedLanguage, code, highlighter }) => {
  const html = useMemo(() => {
    if (selectedLanguage && selectedLanguage !== LANGUAGES.plaintext) {
      const result = highlighter?.codeToHtml(code, {
        lang: selectedLanguage.name.toLowerCase(),
        theme: "css-variables",
      });
      return result || "";
    } else {
      return code.replace(/[\u00A0-\u9999<>\&]/g, function (i) {
        return `&#${i.charCodeAt(0)};`;
      });
    }
  }, [code, selectedLanguage, highlighter]);

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
