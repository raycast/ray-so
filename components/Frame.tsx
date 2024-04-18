import classNames from "classnames";
import { useAtom } from "jotai";
import React, { useContext } from "react";

import styles from "../styles/Frame.module.css";
import { fileNameAtom, showBackgroundAtom } from "../store";
import { FrameContext } from "../store/FrameContextStore";
import { paddingAtom } from "../store/padding";
import { darkModeAtom, themeAtom, themeBackgroundAtom } from "../store/themes";
import useIsSafari from "../util/useIsSafari";
import Editor from "./Editor";
import FlashMessage from "./FlashMessage";

import ResizableFrame from "./ResizableFrame";
import { Highlighter } from "shiki";

const Frame = ({ highlighter }: { highlighter: Highlighter | null }) => {
  const frameContext = useContext(FrameContext);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);
  const [themeBackground] = useAtom(themeBackgroundAtom);
  const isSafari = useIsSafari();
  const [theme] = useAtom(themeAtom);
  const [darkMode] = useAtom(darkModeAtom);
  const isVercelLightMode = theme.name === "Vercel" && !darkMode;

  return (
    <div className={styles.frameContainer}>
      <ResizableFrame>
        <div
          className={styles.frame}
          ref={frameContext}
          style={{
            padding,
            backgroundImage: showBackground && !isVercelLightMode ? themeBackground : ``,
            backgroundColor: isVercelLightMode ? "#fff" : undefined,
          }}
        >
          <FlashMessage />
          {!showBackground && <div data-ignore-in-export className={styles.noBackground}></div>}
          {theme.name === "Vercel" || theme.name === "Rabbit" ? (
            <div className={classNames(styles.vercelWindow, isVercelLightMode && styles.vercelLightMode)}>
              <span className={styles.vercelGridlinesHorizontal}></span>
              <span className={styles.vercelGridlinesVertical}></span>
              <span className={styles.vercelBracketLeft}></span>
              <span className={styles.vercelBracketRight}></span>
              <Editor highlighter={highlighter} />
            </div>
          ) : (
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
              <Editor highlighter={highlighter} />
            </div>
          )}
        </div>
      </ResizableFrame>
    </div>
  );
};

export default Frame;
