import classNames from "classnames";
import { useAtom } from "jotai";
import React, { useContext } from "react";

import { fileNameAtom, showBackgroundAtom } from "../store";
import { FrameContext } from "../store/FrameContextStore";
import { paddingAtom } from "../store/padding";
import { THEMES, darkModeAtom, themeAtom, themeBackgroundAtom } from "../store/themes";
import useIsSafari from "../util/useIsSafari";

import Editor from "./Editor";
import FlashMessage from "./FlashMessage";
import ResizableFrame from "./ResizableFrame";

import styles from "../styles/Frame.module.css";

const VercelFrame = () => {
  const [darkMode] = useAtom(darkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);

  return (
    <div
      className={classNames(
        styles.frame,
        showBackground && styles.vercelFrame,
        showBackground && !darkMode && styles.vercelFrameLightMode,
        !showBackground && styles.vercelNoBackground
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.noBackground}></div>}
      <div className={styles.vercelWindow}>
        <span className={styles.vercelGridlinesHorizontal} data-grid></span>
        <span className={styles.vercelGridlinesVertical} data-grid></span>
        <span className={styles.vercelBracketLeft} data-grid></span>
        <span className={styles.vercelBracketRight} data-grid></span>
        <Editor />
      </div>
    </div>
  );
};

const DefaultFrame = () => {
  const [padding] = useAtom(paddingAtom);
  const isSafari = useIsSafari();
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);
  const [themeBackground] = useAtom(themeBackgroundAtom);

  return (
    <div className={styles.frame} style={{ padding, backgroundImage: showBackground ? themeBackground : `` }}>
      {!showBackground && <div data-ignore-in-export className={styles.noBackground}></div>}
      <div
        className={classNames(styles.window, {
          [styles.withBorder]: !isSafari,
          [styles.withShadow]: !isSafari && showBackground,
        })}
      >
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
        </div>
        <Editor />
      </div>
    </div>
  );
};

const Frame = () => {
  const frameContext = useContext(FrameContext);
  const [theme] = useAtom(themeAtom);

  return (
    <div className={styles.frameContainer}>
      <ResizableFrame>
        <FlashMessage />
        <div className={styles.outerFrame} ref={frameContext}>
          {theme.name === THEMES.vercel.name || theme.name === THEMES.rabbit.name ? <VercelFrame /> : <DefaultFrame />}
        </div>
      </ResizableFrame>
    </div>
  );
};

export default Frame;
