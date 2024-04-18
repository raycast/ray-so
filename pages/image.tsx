import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { showBackgroundAtom, fileNameAtom, windowWidthAtom } from "../store";
import { paddingAtom } from "../store/padding";
import { darkModeAtom, shikiTheme, themeBackgroundAtom } from "../store/themes";

import styles from "../styles/Frame.module.css";
import resizableFrameStyles from "../styles/ResizableFrame.module.css";
import classNames from "classnames";
import Editor from "../components/Editor";
import { Highlighter, bundledLanguages, getHighlighter } from "shiki";

const Image: React.FC = () => {
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);
  const [themeBackground] = useAtom(themeBackgroundAtom);
  const [windowWidth] = useAtom(windowWidthAtom);
  const [darkMode] = useAtom(darkModeAtom);

  const [highlighter, setHighlighter] = useState<Highlighter | null>(null);

  useEffect(() => {
    getHighlighter({
      themes: [shikiTheme],
      langs: Object.keys(bundledLanguages),
    }).then((highlighter) => {
      setHighlighter(highlighter);
    });
  }, []);

  return (
    <div className={resizableFrameStyles.resizableFrame}>
      <div
        data-theme={darkMode ? "dark" : "light"}
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
          <Editor highlighter={highlighter} />
        </div>
      </div>
    </div>
  );
};

export default Image;
