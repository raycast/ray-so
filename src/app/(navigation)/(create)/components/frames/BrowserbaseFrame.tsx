import classNames from "classnames";
import { useAtomValue, useSetAtom } from "jotai";
import React from "react";
import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./BrowserbaseFrame.module.css";
import {
  elementDarkModeAtom,
  elementFileNameAtom,
  elementPaddingAtom,
  elementTransparentAtom,
  updateSlideElementAtom,
} from "../../store/editor";

const BrowserbaseFrame = () => {
  const padding = useAtomValue(elementPaddingAtom);
  const darkMode = useAtomValue(elementDarkModeAtom);
  const transparent = useAtomValue(elementTransparentAtom);
  const fileName = useAtomValue(elementFileNameAtom);
  const update = useSetAtom(updateSlideElementAtom);

  return (
    <div
      className={classNames(
        sharedStyles.frame,
        transparent && styles.frame,
        !darkMode && styles.frameLightMode,
        !transparent && sharedStyles.noBackground,
        !transparent && styles.noBackground,
      )}
      style={{ padding }}
    >
      {!transparent && <div data-ignore-in-export className={sharedStyles.transparentPattern}></div>}
      {transparent && (
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
              onChange={(event) => update({ header: { properties: { title: { text: event.target.value } } } })}
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
