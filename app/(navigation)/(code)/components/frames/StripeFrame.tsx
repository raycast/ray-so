import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";
import React, { useEffect, useRef, useState } from "react";

import { showBackgroundAtom, windowWidthAtom } from "../../store";
import { codeAtom } from "../../store/code";
import { paddingAtom } from "../../store/padding";
import { themeDarkModeAtom } from "../../store/themes";
import useIsSafari from "../../util/useIsSafari";

import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./StripeFrame.module.css";

const StripeFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const code = useAtomValue(codeAtom);
  const windowWidth = useAtomValue(windowWidthAtom);
  const isSafari = useIsSafari();

  const windowRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [innerWindowWidth, setInnerWindowWidth] = useState(0);
  const [frameHeight, setFrameHeight] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const numberOfLines = Math.max(1, (code.match(/\n/g) || []).length + 1);

  useEffect(() => {
    const updateDimensions = () => {
      if (windowRef.current) {
        setInnerWindowWidth(windowRef.current.offsetWidth);
      }
      if (frameRef.current) {
        setFrameHeight(frameRef.current.offsetHeight);
      }
    };

    updateDimensions();

    const timeoutId = setTimeout(updateDimensions, 0);

    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(timeoutId);
    };
  }, [windowWidth, numberOfLines, padding, isTransitioning]);

  // Handle re-trigger when padding has finished changing
  useEffect(() => {
    const startId = setTimeout(() => setIsTransitioning(true), 0);
    const endId = setTimeout(() => setIsTransitioning(false), 200);
    return () => {
      clearTimeout(startId);
      clearTimeout(endId);
    };
  }, [padding]);

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
      ref={frameRef}
    >
      {!showBackground && <div data-ignore-in-export className={sharedStyles.transparentPattern}></div>}
      {showBackground && (
        <div className={styles.background}>
          <div
            className={styles.backgroundGridlineContainer}
            style={{ "--window-width": `${innerWindowWidth}px` } as React.CSSProperties}
          >
            <div className={styles.backgroundGridline}></div>
            <div className={styles.backgroundGridline}></div>
            <div className={styles.backgroundGridline}></div>
            <div className={styles.backgroundGridline}></div>
            <div className={styles.backgroundGridline}></div>
          </div>

          <div className={classNames(styles.stripe)}>
            <div
              className={styles.backgroundGridlineContainer}
              style={{ "--window-width": `${innerWindowWidth}px` } as React.CSSProperties}
            >
              <div className={styles.backgroundGridline}></div>
              <div className={styles.backgroundGridline}></div>
              <div className={styles.backgroundGridline}></div>
              <div className={styles.backgroundGridline}></div>
              <div className={styles.backgroundGridline}></div>

              <div className={classNames(styles.set, frameHeight < 240 && styles.isSmall)}>
                <div className={styles.layer1} />
                <div className={styles.layer2} />
                <div className={styles.intersection} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={classNames(styles.window, isSafari && styles.isSafari)} ref={windowRef}>
        <Editor />
      </div>
    </div>
  );
};

export default StripeFrame;
