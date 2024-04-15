import classNames from "classnames";
import React, { useEffect, useMemo, useState } from "react";
import { Language, LANGUAGES } from "../util/languages";

import styles from "../styles/Editor.module.css";
import { Highlighter, getHighlighter } from "shiki";
import { useAtom } from "jotai";
import { themeAtom } from "../store/themes";

type PropTypes = {
  selectedLanguage: Language | null;
  code: string;
};

const HighlightedCode: React.FC<PropTypes> = ({ selectedLanguage, code }) => {
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null);
  const [theme] = useAtom(themeAtom);

  useEffect(() => {
    getHighlighter({
      themes: ["nord", "monokai", "github-dark", "github-light", "solarized-dark", "solarized-light"],
      langs: ["javascript", "typescript", "swift", "html", "r", "rust", "python", "go", "java"],
    }).then((highlighter) => {
      setHighlighter(highlighter);
    });
  }, [theme]);

  const html = useMemo(() => {
    if (selectedLanguage && selectedLanguage !== LANGUAGES.plaintext) {
      const result = highlighter?.codeToHtml(code, {
        lang: "javascript",
        theme: "nord",
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
