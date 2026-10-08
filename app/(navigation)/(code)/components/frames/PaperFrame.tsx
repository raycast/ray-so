import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";
import { useLayoutEffect, useRef, useState } from "react";

import { fileNameAtom, showBackgroundAtom } from "../../store";
import { paddingAtom } from "../../store/padding";
import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./PaperFrame.module.css";

const PaperFrame = () => {
  const frameRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const sideLabelRef = useRef<HTMLSpanElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, middleX: 0 });
  const padding = useAtomValue(paddingAtom);
  const showBackground = useAtomValue(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    const window = windowRef.current;
    if (!frame || !window) return;

    const alignGrid = (width: number, height: number) => {
      // Fit whole cells between the one-pixel borders without changing the window size.
      const horizontalSpan = width - 1;
      const verticalSpan = height - 1;
      const columns = Math.max(1, Math.round(horizontalSpan / 12));
      const gridWidth = horizontalSpan / columns;
      const middleX = Math.round(columns / 2) * gridWidth;
      frame.style.setProperty("--paper-grid-width", `${gridWidth}px`);
      frame.style.setProperty("--paper-grid-middle-x", `${middleX}px`);
      frame.style.setProperty("--paper-grid-height", `${verticalSpan / Math.max(1, Math.round(verticalSpan / 24))}px`);
      setDimensions((previous) => {
        const next = {
          width: Math.round(horizontalSpan),
          height: Math.round(verticalSpan),
          middleX: Math.round(middleX),
        };
        return previous.width === next.width && previous.height === next.height && previous.middleX === next.middleX
          ? previous
          : next;
      });
    };

    alignGrid(window.offsetWidth, window.offsetHeight);
    const observer = new ResizeObserver(([entry]) => {
      const { inlineSize, blockSize } = entry.borderBoxSize[0];
      alignGrid(inlineSize, blockSize);
    });
    observer.observe(window);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    const label = sideLabelRef.current;
    if (!frame || !label) return;

    const fitSideLabels = () => {
      const gap = parseFloat(getComputedStyle(frame).getPropertyValue("--paper-side-gap"));
      frame.style.setProperty("--paper-side-visibility", gap + label.offsetWidth + 1 <= padding ? "visible" : "hidden");
    };

    fitSideLabels();
    const observer = new ResizeObserver(fitSideLabels);
    observer.observe(label);
    return () => observer.disconnect();
  }, [dimensions, padding, showBackground]);

  return (
    <div
      ref={frameRef}
      className={classNames(sharedStyles.frame, styles.frame, showBackground && styles.withBackground)}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={sharedStyles.transparentPattern} />}
      <div className={styles.windowContainer}>
        {showBackground && dimensions.width > 0 && (
          <div className={styles.measurements} aria-hidden="true">
            {[styles.topRuler, styles.bottomRuler].map((position) => (
              <div key={position} className={classNames(styles.horizontalRuler, position)}>
                <span>0</span>
                <span>{dimensions.middleX}</span>
                <span>{dimensions.width}</span>
              </div>
            ))}
            {[styles.leftRuler, styles.rightRuler].map((position) => (
              <div key={position} className={classNames(styles.verticalRuler, position)}>
                <span>0</span>
                <span>{Math.round(dimensions.height / 2)}</span>
                <span ref={position === styles.rightRuler ? sideLabelRef : undefined}>{dimensions.height}</span>
              </div>
            ))}
          </div>
        )}
        <div ref={windowRef} className={styles.window}>
          <div className={styles.header}>
            <div className={styles.fileName}>
              <input
                aria-label="File name"
                type="text"
                value={fileName}
                onChange={(event) => setFileName(event.target.value)}
                spellCheck={false}
                tabIndex={-1}
              />
              {fileName.length === 0 && <span data-ignore-in-export>Untitled-1</span>}
            </div>
          </div>
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default PaperFrame;
