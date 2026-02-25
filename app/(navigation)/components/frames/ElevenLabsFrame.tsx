import classNames from "classnames";
import { useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";

import { showBackgroundAtom, windowWidthAtom } from "../../store";
import { codeAtom } from "../../store/code";
import { paddingAtom } from "../../store/padding";
import { themeDarkModeAtom } from "../../store/themes";

import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./ElevenLabsFrame.module.css";

const ElevenLabsFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const padding = useAtomValue(paddingAtom);
  const showBackground = useAtomValue(showBackgroundAtom);
  const windowWidth = useAtomValue(windowWidthAtom);
  const code = useAtomValue(codeAtom);

  const windowRef = useRef<HTMLDivElement>(null);
  const [circleDiameter, setCircleDiameter] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const numberOfLines = Math.max(1, (code.match(/\n/g) || []).length + 1);

  useEffect(() => {
    const updateCircleSize = () => {
      if (windowRef.current) {
        const boxWidth = windowRef.current.offsetWidth;
        const boxHeight = windowRef.current.offsetHeight;
        const diagonal = Math.sqrt(Math.pow(boxWidth, 2) + Math.pow(boxHeight, 2));
        setCircleDiameter(diagonal);
      }
    };

    updateCircleSize();

    const timeoutId = setTimeout(updateCircleSize, 0);

    window.addEventListener("resize", updateCircleSize);
    return () => {
      window.removeEventListener("resize", updateCircleSize);
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
        showBackground && !darkMode && styles.frameLightMode,
        !showBackground && sharedStyles.noBackground,
        !showBackground && styles.noBackground,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={sharedStyles.transparentPattern}></div>}
      <div className={styles.window} ref={windowRef}>
        <span
          className={classNames(styles.circle, isTransitioning && styles.isTransitioning)}
          style={{
            width: `${circleDiameter}px`,
            height: `${circleDiameter}px`,
          }}
        ></span>

        <span className={styles.gridlineHorizontalTop} data-grid></span>
        <span className={styles.gridlineHorizontalCenter} data-grid></span>
        <span className={styles.gridlineHorizontalBottom} data-grid></span>

        <span className={styles.gridlineVerticalLeft} data-grid></span>
        <span className={styles.gridlineVerticalCenter} data-grid></span>
        <span className={styles.gridlineVerticalRight} data-grid></span>

        <span className={styles.dotTopLeft} data-dot></span>
        <span className={styles.dotTopRight} data-dot></span>
        <span className={styles.dotBottomLeft} data-dot></span>
        <span className={styles.dotBottomRight} data-dot></span>

        <span className={styles.gridlineCornerTopLeft} data-grid></span>
        <span className={styles.gridlineCornerTopRight} data-grid></span>
        <span className={styles.gridlineCornerBottomRight} data-grid></span>
        <span className={styles.gridlineCornerBottomLeft} data-grid></span>

        <div className={styles.editor}>
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default ElevenLabsFrame;
