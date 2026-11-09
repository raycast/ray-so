import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";
import { useLayoutEffect, useRef, useState } from "react";

import { fileNameAtom, showBackgroundAtom } from "../../store";
import { codeAtom } from "../../store/code";
import { flashShownAtom } from "../../store/flash";
import { paddingAtom } from "../../store/padding";
import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./PaperFrame.module.css";
import PaperPrintBackground from "./PaperPrintBackground";

const PaperFrame = ({ variant = "grid" }: { variant?: "grid" | "print" }) => {
  const isPrint = variant === "print";
  const frameRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const sideLabelRef = useRef<HTMLSpanElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, middleX: 0 });
  const padding = useAtomValue(paddingAtom);
  const showBackground = useAtomValue(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);
  const flashShown = useAtomValue(flashShownAtom);
  const hasTitle = fileName.trim().length > 0;
  const showTitleBar = hasTitle || !flashShown;
  const code = useAtomValue(codeAtom);
  const fileNameField = (
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
  );

  const gridWidth = dimensions.width / Math.max(1, Math.round(dimensions.width / 12));
  const gridHeight = dimensions.height / Math.max(1, Math.round(dimensions.height / 24));
  const backgroundWidth = dimensions.width + 1 + padding * 2;
  const backgroundHeight = dimensions.height + 1 + padding * 2;
  const gridLines: string[] = [];

  if (!isPrint && gridWidth > 0 && gridHeight > 0) {
    // Position each stroke from the window origin; repeated background tiles can
    // round fractional cell sizes and drift away from the opposite border.
    for (let x = -Math.ceil(padding / gridWidth); x <= Math.ceil((dimensions.width + padding) / gridWidth); x++) {
      const position = padding + x * gridWidth + 0.5;
      gridLines.push(`M${position} 0V${backgroundHeight}`);
    }
    for (let y = -Math.ceil(padding / gridHeight); y <= Math.ceil((dimensions.height + padding) / gridHeight); y++) {
      const position = padding + y * gridHeight + 0.5;
      gridLines.push(`M0 ${position}H${backgroundWidth}`);
    }
  }

  useLayoutEffect(() => {
    if (isPrint) return;
    const frame = frameRef.current;
    const window = windowRef.current;
    if (!frame || !window) return;

    const alignGrid = (width: number, height: number) => {
      // Hidden previews can briefly report zero dimensions.
      if (!(width > 1 && height > 1)) return;

      // Fit whole cells between the one-pixel borders without changing the window size.
      const horizontalSpan = width - 1;
      const verticalSpan = height - 1;
      const columns = Math.max(1, Math.round(horizontalSpan / 12));
      const gridWidth = horizontalSpan / columns;
      const middleX = Math.round(columns / 2) * gridWidth;
      frame.style.setProperty("--paper-grid-middle-x", `${middleX}px`);
      setDimensions((previous) => {
        const next = {
          width: horizontalSpan,
          height: verticalSpan,
          middleX: Math.round(middleX),
        };
        return previous.width === next.width && previous.height === next.height && previous.middleX === next.middleX
          ? previous
          : next;
      });
    };

    const measure = () => {
      const style = getComputedStyle(window);
      alignGrid(parseFloat(style.width), parseFloat(style.height));
    };

    measure();
    const observer = new ResizeObserver(([entry]) => {
      const size = entry.borderBoxSize[0];
      if (size?.inlineSize > 1 && size.blockSize > 1) {
        alignGrid(size.inlineSize, size.blockSize);
      } else {
        measure();
      }
    });
    observer.observe(window, { box: "border-box" });
    document.addEventListener("visibilitychange", measure);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", measure);
    };
  }, [isPrint, showTitleBar]);

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
      className={classNames(
        sharedStyles.frame,
        styles.frame,
        isPrint && styles.print,
        showBackground && styles.withBackground,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={sharedStyles.transparentPattern} />}
      {showBackground && isPrint && <PaperPrintBackground className={styles.grid} />}
      {showBackground && !isPrint && (
        <svg className={styles.grid} width="100%" height="100%" aria-hidden="true">
          <path d={gridLines.join(" ")} fill="none" stroke="#cbdcf5" strokeWidth="1" />
        </svg>
      )}
      <div className={styles.windowContainer}>
        {showBackground && !isPrint && dimensions.width > 0 && (
          <div className={styles.measurements} aria-hidden="true">
            {[styles.topRuler, styles.bottomRuler].map((position) => (
              <div key={position} className={classNames(styles.horizontalRuler, position)}>
                <span>0</span>
                <span>{dimensions.middleX}</span>
                <span>{Math.round(dimensions.width)}</span>
              </div>
            ))}
            {[styles.leftRuler, styles.rightRuler].map((position) => (
              <div key={position} className={classNames(styles.verticalRuler, position)}>
                <span>0</span>
                <span>{Math.round(dimensions.height / 2)}</span>
                <span ref={position === styles.rightRuler ? sideLabelRef : undefined}>
                  {Math.round(dimensions.height)}
                </span>
              </div>
            ))}
          </div>
        )}
        <div ref={windowRef} className={styles.window}>
          {!isPrint && showTitleBar && (
            <div className={styles.header} data-ignore-in-export={!hasTitle || undefined}>
              {fileNameField}
            </div>
          )}
          <Editor />
          {isPrint && showTitleBar && (
            <div className={styles.footer} data-ignore-in-export={!hasTitle || undefined}>
              {fileNameField}
              <span className={styles.characterCount} aria-label={`${code.length} characters`}>
                {code.length}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaperFrame;
