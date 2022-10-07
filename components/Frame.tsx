import classNames from "classnames";
import { useAtom } from "jotai";
import React, { useContext } from "react";

import styles from "styles/Frame.module.css";
import { showBackgroundAtom } from "../store";
import { FrameContext } from "../store/FrameContextStore";
import { paddingAtom } from "../store/padding";
import Editor from "./Editor";

import ResizableFrame from "./ResizableFrame";

const Frame: React.FC = () => {
  const frameContext = useContext(FrameContext);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);

  return (
    <div className={styles.frameContainer}>
      <ResizableFrame>
        <div
          className={classNames(styles.frame, {
            [styles.noBackground]: !showBackground,
          })}
          ref={frameContext}
          style={{
            padding,
            backgroundImage: showBackground
              ? `linear-gradient(140deg, rgb(165, 142, 251), rgb(233, 191, 248))`
              : ``,
          }}
        >
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
