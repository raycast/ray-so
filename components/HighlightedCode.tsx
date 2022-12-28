import React, { useEffect, useMemo, useState } from "react";
import { Language } from "../util/languages";
import { createStarryNight, common } from "@wooorm/starry-night";
import { Root } from "hast";
import { toH } from "hast-to-hyperscript";

import styles from "styles/Editor.module.css";

const starryNightPromise = createStarryNight(common);

type PropTypes = {
  selectedLanguage: Language | null;
  code: string;
};

const HighlightedCode: React.FC<PropTypes> = ({ selectedLanguage, code }) => {
  const [tree, setTree] = useState<Root | undefined>();

  useEffect(() => {
    starryNightPromise.then((starryNight) => {
      if (!selectedLanguage || !code) {
        setTree(undefined);
        return;
      }

      const tree = starryNight.highlight(code, selectedLanguage.scopeName);

      setTree(tree);
    });
  }, [code, selectedLanguage]);

  const preView = useMemo(() => {
    if (!tree) return <>{code}</>;

    return toH(React.createElement, tree);
  }, [tree, code]);

  return <div className={styles.formatted}>{preView}</div>;
};

export default HighlightedCode;
