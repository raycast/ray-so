import classNames from "classnames";
import { useAtom } from "jotai";
import React, { useContext } from "react";

import styles from "styles/Frame.module.css";
import { fileNameAtom, showBackgroundAtom } from "../store";
import { FrameContext } from "../store/FrameContextStore";
import { paddingAtom } from "../store/padding";
import Editor from "./Editor";

import ResizableFrame from "./ResizableFrame";

const Frame: React.FC = () => {
  const frameContext = useContext(FrameContext);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);

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
              <div className={styles.fileName}>
                <input
                  type="text"
                  value={fileName}
                  onChange={(event) => setFileName(event.target.value)}
                  spellCheck={false}
                />
                {fileName.length === 0 ? <span>Untitled-1</span> : null}
              </div>
            </div>
            <Editor />
          </div>
        </div>
      </ResizableFrame>
    </div>
  );
};

export default Frame;
