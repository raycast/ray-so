import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";
import React from "react";

import { fileNameAtom, showBackgroundAtom } from "../../store";
import { paddingAtom } from "../../store/padding";
import { themeDarkModeAtom } from "../../store/themes";

import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./BrowserbaseFrame.module.css";

const BrowserbaseFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);

  return (
    <div
      className={classNames(
        sharedStyles.frame,
        showBackground && styles.frame,
        !darkMode && styles.frameLightMode,
        !showBackground && sharedStyles.noBackground,
        !showBackground && styles.noBackground,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={sharedStyles.transparentPattern}></div>}
      {showBackground && (
        <div className={styles.background}>
          <div className={styles.backgroundGridline}></div>
          <div className={styles.backgroundGridline}></div>
          <div className={styles.backgroundGridline}></div>
          <div className={styles.backgroundGridline}></div>
          <div className={styles.backgroundGridline}></div>
          <div className={styles.backgroundGridline}></div>
          <div className={styles.backgroundGridline}></div>
        </div>
      )}
      <div className={styles.window}>
        <div className={classNames(sharedStyles.header, styles.header)}>
          <div className={sharedStyles.controls}>
            <div className={sharedStyles.control}></div>
            <div className={sharedStyles.control}></div>
            <div className={sharedStyles.control}></div>
          </div>
          <div className={sharedStyles.fileName}>
            <input
              type="text"
              value={fileName}
              onChange={(event) => setFileName(event.target.value)}
              spellCheck={false}
              tabIndex={-1}
            />
            {fileName.length === 0 ? <span data-ignore-in-export>Untitled-1</span> : null}
          </div>
          <div />
        </div>
        <Editor />
      </div>
      <div className={styles.outline} style={{ "--padding": `${padding}px` } as React.CSSProperties}></div>
    </div>
  );
};

export default BrowserbaseFrame;
