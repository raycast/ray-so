import classNames from "classnames";
import hljs from "highlight.js";
import React, { useMemo } from "react";
import { Language } from "../util/languages";

import styles from "styles/Editor.module.css";

type PropTypes = {
  selectedLanguage: Language | null;
  code: string;
};

const HighlightedCode: React.FC<PropTypes> = ({ selectedLanguage, code }) => {
  const html = useMemo(() => {
    if (selectedLanguage) {
      return hljs.highlight(selectedLanguage.className, code).value;
    } else {
      return code;
    }
  }, [code, selectedLanguage]);

  const preView = useMemo(
    () => (
      <div
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
