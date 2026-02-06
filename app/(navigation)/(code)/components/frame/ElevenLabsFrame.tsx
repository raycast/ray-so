import classNames from "classnames";
import { useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";

import { showBackgroundAtom, windowWidthAtom } from "../../store";
import { codeAtom } from "../../store/code";
import { paddingAtom } from "../../store/padding";
import { themeDarkModeAtom } from "../../store/themes";

import Editor from "../Editor";
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
        styles.frame,
        showBackground && styles.elevenLabsFrame,
        showBackground && !darkMode && styles.elevenLabsFrameLightMode,
        !showBackground && styles.noBackground,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      <div className={styles.elevenLabsWindow} ref={windowRef}>
        <span
          className={classNames(styles.elevenLabsCircle, isTransitioning && styles.isTransitioning)}
          style={{
            width: `${circleDiameter}px`,
            height: `${circleDiameter}px`,
          }}
        ></span>

        <span className={styles.elevenLabsGridlineHorizontalTop} data-grid></span>
        <span className={styles.elevenLabsGridlineHorizontalCenter} data-grid></span>
        <span className={styles.elevenLabsGridlineHorizontalBottom} data-grid></span>

        <span className={styles.elevenLabsGridlineVerticalLeft} data-grid></span>
        <span className={styles.elevenLabsGridlineVerticalCenter} data-grid></span>
        <span className={styles.elevenLabsGridlineVerticalRight} data-grid></span>

        <span className={styles.elevenLabsDotTopLeft} data-dot></span>
        <span className={styles.elevenLabsDotTopRight} data-dot></span>
        <span className={styles.elevenLabsDotBottomLeft} data-dot></span>
        <span className={styles.elevenLabsDotBottomRight} data-dot></span>

        <span className={styles.elevenLabsGridlineCornerTopLeft} data-grid></span>
        <span className={styles.elevenLabsGridlineCornerTopRight} data-grid></span>
        <span className={styles.elevenLabsGridlineCornerBottomRight} data-grid></span>
        <span className={styles.elevenLabsGridlineCornerBottomLeft} data-grid></span>

        <div className={styles.elevenLabsEditor}>
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default ElevenLabsFrame;
