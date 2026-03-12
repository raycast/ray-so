import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";
import React, { useEffect, useRef, useState } from "react";

import { showBackgroundAtom } from "../../store";
import { exportSizeAtom } from "../../store/image";
import { paddingAtom } from "../../store/padding";
import { darkModeAtom } from "../../store/themes";

import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./FirecrawlFrame.module.css";

const FIRECRAWL_ASCII_ART = `                                   .. ..-
                                   :          .
                              ..        .   ..-
                            .        .._  ..-...:.              ..       .
                  .      .  .-.    ...     .-.-.._.-   ..        .-..     .      .
               ...._. . .-.....-:....      ..-::.::._=:.  ....       ...  .-      ....
             .....-._.._.:.....-.+:....-..    .....-:+++++++=:..-.---..    ...:.-..      ....
           .._.-._.-.:_.:-.  ...+..+:._-....:-._:+++++===+:_:+:....      -..+++++.:..  .-._-..      .
        .........--::+:._-:-.._..-.+:.-_::++_.:+:+========+=+:+:--..  .   _-_.:+===+-. ._..+:.-........  .
       ....-..---_-++====+:_:=:..+:.:+=+-..._++++======X==========++::.:+-..  .:+====X==+=++++++-.-......
     .......-:+:_:+:++=XX=X======++++++=X===::+++:++==XXXXXX===+==++===+=+=========XXX===++++=+:_---...-..-.
    ....._.:++======+===XXXXXXXX=+=++============XXXXXXXXXX============X======XXXXXXX======X==++:._---_`;

/* Star path (filled plus, viewBox 0 0 22 21), center at 11, 10.5 */
const FIRECRAWL_STAR_PATH =
  "M10.5 4C10.5 7.31371 7.81371 10 4.5 10H0.5V11H4.5C7.81371 11 10.5 13.6863 10.5 17V21H11.5V17C11.5 13.6863 14.1863 11 17.5 11H21.5V10H17.5C14.1863 10 11.5 7.31371 11.5 4V0H10.5V4Z";

function FirecrawlFrameCanvas({
  gridColor,
  padding,
  exportPixelRatio = 2,
}: {
  gridColor: string;
  padding: number;
  exportPixelRatio?: number;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, color: string) => {
      const i = padding;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      /* Lines extend to canvas edges; they cross at the inset rectangle (stars at its corners). */
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(w, i);
      ctx.moveTo(0, h - i);
      ctx.lineTo(w, h - i);
      ctx.moveTo(i, 0);
      ctx.lineTo(i, h);
      ctx.moveTo(w - i, 0);
      ctx.lineTo(w - i, h);
      ctx.stroke();
      const starPath = new Path2D(FIRECRAWL_STAR_PATH);
      ctx.fillStyle = color;
      const drawStar = (x: number, y: number) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.translate(-11, -10.5);
        ctx.fill(starPath);
        ctx.restore();
      };
      drawStar(i, i);
      drawStar(w - i, i);
      drawStar(i, h - i);
      drawStar(w - i, h - i);
    },
    [padding],
  );

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      if (w > 0 && h > 0) setSize((prev) => (prev.width === w && prev.height === h ? prev : { width: w, height: h }));
    };
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    measure();
    const fallback = setTimeout(measure, 100);
    return () => {
      clearTimeout(fallback);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || size.width === 0 || size.height === 0) return;
    const displayDpr = Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1);
    /* Use at least export scale so the canvas stays sharp when user exports at 2x/4x/6x. */
    const dpr = Math.max(displayDpr, exportPixelRatio);
    canvas.width = size.width * dpr;
    canvas.height = size.height * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    draw(ctx, size.width, size.height, gridColor);
  }, [size, gridColor, draw, exportPixelRatio]);

  return (
    <div ref={overlayRef} className={styles.frameOverlay} data-grid>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} aria-hidden />
    </div>
  );
}

const FirecrawlFrame = () => {
  const [darkMode] = useAtom(darkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const exportSize = useAtomValue(exportSizeAtom);
  const gridColor = darkMode ? "#444" : "#ededed";

  return (
    <div
      className={classNames(
        sharedStyles.frame,
        showBackground && styles.frame,
        showBackground && !darkMode && styles.frameLightMode,
        !showBackground && sharedStyles.noBackground,
        !showBackground && styles.noBackground,
      )}
      style={{ padding, ["--frame-padding" as string]: `${padding}px` }}
    >
      {!showBackground && <div data-ignore-in-export className={sharedStyles.transparentPattern}></div>}
      <div className={styles.window}>
        {showBackground && (
          <div className={styles.asciiArtContainer}>
            <pre className={styles.asciiArt}>{FIRECRAWL_ASCII_ART}</pre>
          </div>
        )}
        <Editor />
        {showBackground && (
          <FirecrawlFrameCanvas gridColor={gridColor} padding={padding} exportPixelRatio={exportSize} />
        )}
      </div>
    </div>
  );
};

export default FirecrawlFrame;
