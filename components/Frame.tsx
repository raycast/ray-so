import React, { MouseEventHandler, useCallback, useRef } from "react";
import { useAtom } from "jotai";

import styles from "styles/Frame.module.css";
import Editor from "./Editor";

import { windowWidthAtom } from "../store";
import classnames from "classnames";

type Handle = "right" | "left";

let maxWidth = 920;
let minWidth = 520;

const Frame: React.FC = () => {
  const currentHandleRef = useRef<Handle>();
  const windowRef = useRef<HTMLDivElement>(null);
  const startWidthRef = useRef<number>();
  const startXRef = useRef<number>();
  const [windowWidth, setWindowWidth] = useAtom(windowWidthAtom);

  const mouseMoveHandler = useCallback(
    (event: MouseEvent) => {
      let newWidth;

      if (currentHandleRef.current === "left") {
        newWidth =
          startWidthRef.current! - (event.clientX - startXRef.current!) * 2;
      } else {
        newWidth =
          startWidthRef.current! + (event.clientX - startXRef.current!) * 2;
      }

      if (newWidth > maxWidth) {
        newWidth = maxWidth;
      } else if (newWidth < minWidth) {
        newWidth = minWidth;
      }

      setWindowWidth(newWidth);
    },
    [setWindowWidth]
  );

  const mouseUpHandler = useCallback(() => {
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  }, [mouseMoveHandler]);

  const handleResizeFrameX = useCallback(
    (handle: Handle): MouseEventHandler<HTMLDivElement> =>
      (event) => {
        currentHandleRef.current = handle;
        startWidthRef.current = windowRef.current!.offsetWidth;
        startXRef.current = event.clientX;
        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);
      },
    [mouseMoveHandler, mouseUpHandler]
  );

  return (
    <div className={styles.frameContainer}>
      <div className={styles.frame}>
        <div
          className={classnames(styles.windowSizeDragPoint, styles.left)}
          onMouseDown={handleResizeFrameX("left")}
        ></div>
        <div
          className={classnames(styles.windowSizeDragPoint, styles.right)}
          onMouseDown={handleResizeFrameX("right")}
        ></div>
        <div
          className={styles.window}
          ref={windowRef}
          style={{ width: windowWidth || "auto" }}
        >
          <div className={styles.header}>
            <div className={styles.controls}>
              <div className={styles.control}></div>
              <div className={styles.control}></div>
              <div className={styles.control}></div>
            </div>
            <div className={styles.fileName}>Untitled-1</div>
          </div>
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default Frame;
