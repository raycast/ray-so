import { useAtom } from "jotai";
import React from "react";
import { showBackgroundAtom, fileNameAtom, windowWidthAtom } from "../store";
import { paddingAtom } from "../store/padding";
import { themeBackgroundAtom } from "../store/themes";

import styles from "styles/Frame.module.css";
import classNames from "classnames";
import Editor from "../components/Editor";

const Image: React.FC = () => {
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);
  const [themeBackground] = useAtom(themeBackgroundAtom);
  const [windowWidth] = useAtom(windowWidthAtom);

  return (
    <div
      className={classNames(styles.frame, {
        [styles.noBackground]: !showBackground,
      })}
      id="frame"
      style={{
        padding,
        width: windowWidth || "auto",
        backgroundImage: showBackground ? themeBackground : ``,
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
          </div>
        </div>
        <Editor />
      </div>
    </div>
  );
};

export default Image;
