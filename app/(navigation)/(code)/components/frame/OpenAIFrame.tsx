import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";
import React from "react";

import { showBackgroundAtom } from "../../store";
import { paddingAtom } from "../../store/padding";
import { themeDarkModeAtom } from "../../store/themes";

import Editor from "../Editor";
import styles from "./OpenAIFrame.module.css";

const OpenAIFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);

  return (
    <div
      className={classNames(
        styles.openAIFrame,
        !darkMode && styles.openAIFrameLightMode,
        !showBackground && styles.noBackground,
      )}
      style={{ padding, "--padding": `${padding}px` } as React.CSSProperties}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      <div className={styles.openAIWindow}>
        <Editor />
      </div>
    </div>
  );
};

export default OpenAIFrame;
