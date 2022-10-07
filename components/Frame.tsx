import React, { useContext } from "react";

import styles from "styles/Frame.module.css";
import { FrameContext } from "../store/FrameContextStore";
import Editor from "./Editor";

import ResizableFrame from "./ResizableFrame";

const Frame: React.FC = () => {
  const frameContext = useContext(FrameContext);

  return (
    <div className={styles.frameContainer}>
      <ResizableFrame>
        <div className={styles.frame} ref={frameContext}>
          <div className={styles.window}>
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
      </ResizableFrame>
    </div>
  );
};

export default Frame;
