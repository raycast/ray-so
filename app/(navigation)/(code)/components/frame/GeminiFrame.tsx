import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";

import { fileNameAtom, showBackgroundAtom } from "../../store";
import { flashShownAtom } from "../../store/flash";
import { paddingAtom } from "../../store/padding";
import { themeDarkModeAtom } from "../../store/themes";
import useIsSafari from "../../util/useIsSafari";

import Editor from "../Editor";
import styles from "./GeminiFrame.module.css";

const GeminiFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);
  const isSafari = useIsSafari();
  const flashShown = useAtomValue(flashShownAtom);

  return (
    <div
      className={classNames(
        styles.frame,
        styles.geminiFrame,
        !darkMode && styles.geminiFrameLightMode,
        !showBackground && styles.noBackground,
        isSafari && styles.isSafari,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      {showBackground && <img src="/stars.svg" alt="stars" className={styles.geminiStars} />}
      <div className={styles.geminiWindow}>
        {fileName.length > 0 ? (
          <div className={styles.geminiHeader}>
            <div className={classNames(styles.fileName, styles.geminiFileName)} data-value={fileName}>
              <input
                type="text"
                value={fileName}
                onChange={(event) => setFileName(event.target.value)}
                spellCheck={false}
                tabIndex={-1}
                size={1}
              />
            </div>
          </div>
        ) : flashShown ? null : (
          <div className={styles.geminiHeader} data-ignore-in-export>
            <div className={classNames(styles.fileName, styles.geminiFileName)} data-value={fileName}>
              <input
                type="text"
                value={fileName}
                onChange={(event) => setFileName(event.target.value)}
                spellCheck={false}
                tabIndex={-1}
                size={1}
              />
              <span>Untitled-1</span>
            </div>
          </div>
        )}

        <div className={styles.geminiEditor}>
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default GeminiFrame;
