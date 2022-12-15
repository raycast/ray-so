import React, { useEffect, useMemo, useState } from "react";
import { Language } from "../util/languages";
import { createStarryNight } from "@wooorm/starry-night";
import sourceJs from "@wooorm/starry-night/lang/source.js.js";
import { Root } from "hast";
import { toH } from "hast-to-hyperscript";

import styles from "styles/Editor.module.css";

const starryNightPromise = createStarryNight([sourceJs]);

type PropTypes = {
  selectedLanguage: Language | null;
  code: string;
};

const HighlightedCode: React.FC<PropTypes> = ({ selectedLanguage, code }) => {
  const [tree, setTree] = useState<Root | undefined>();

  useEffect(() => {
    starryNightPromise.then((starryNight) => {
      if (!selectedLanguage || !code) return;

      const tree = starryNight.highlight(code, sourceJs.scopeName);

      setTree(tree);
    });
  }, [code, selectedLanguage]);

  const preView = useMemo(() => {
    if (!tree) return;

    return toH(React.createElement, tree);
  }, [tree]);

  return <div className={styles.formatted}>{preView}</div>;
};

export default HighlightedCode;
