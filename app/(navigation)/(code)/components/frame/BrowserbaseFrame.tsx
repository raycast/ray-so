import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";
import React from "react";

import { fileNameAtom, showBackgroundAtom } from "../../store";
import { paddingAtom } from "../../store/padding";
import { themeDarkModeAtom } from "../../store/themes";

import Editor from "../Editor";
import styles from "./BrowserbaseFrame.module.css";

const BrowserbaseFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);

  return (
    <div
      className={classNames(
        styles.frame,
        showBackground && styles.browserbaseFrame,
        !darkMode && styles.browserbaseFrameLightMode,
        !showBackground && styles.noBackground,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      {showBackground && (
        <div className={styles.browserbaseBackground}>
          <div className={styles.browserbaseBackgroundGridline}></div>
          <div className={styles.browserbaseBackgroundGridline}></div>
          <div className={styles.browserbaseBackgroundGridline}></div>
          <div className={styles.browserbaseBackgroundGridline}></div>
          <div className={styles.browserbaseBackgroundGridline}></div>
          <div className={styles.browserbaseBackgroundGridline}></div>
          <div className={styles.browserbaseBackgroundGridline}></div>
        </div>
      )}
      <div className={styles.browserbaseWindow}>
        <div className={styles.header}>
          <div className={styles.controls}>
            <div className={styles.control}></div>
            <div className={styles.control}></div>
            <div className={styles.control}></div>
          </div>
          <div className={styles.fileName}>
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
      <div className={styles.browserbaseOutline} style={{ "--padding": `${padding}px` } as React.CSSProperties}></div>
    </div>
  );
};

export default BrowserbaseFrame;
