import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";

import { fileNameAtom, showBackgroundAtom } from "../../store";
import { selectedLanguageAtom } from "../../store/code";
import { flashShownAtom } from "../../store/flash";
import { paddingAtom } from "../../store/padding";
import { themeDarkModeAtom } from "../../store/themes";

import Editor from "../Editor";
import styles from "./CloudflareFrame.module.css";

const CloudflareFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const flashShown = useAtomValue(flashShownAtom);

  return (
    <div
      className={classNames(
        styles.frame,
        showBackground && styles.cloudflareFrame,
        !darkMode && styles.cloudflareFrameLightMode,
        !showBackground && styles.noBackground,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      <div className={styles.cloudflareWindow}>
        <span className={styles.cloudflareGridlinesHorizontal} data-grid></span>
        <span className={styles.cloudflareGridlinesVertical} data-grid></span>
        {fileName.length > 0 ? (
          <div className={styles.cloudflareHeader}>
            <div className={classNames(styles.fileName, styles.cloudflareFileName)} data-value={fileName}>
              <input
                type="text"
                value={fileName}
                onChange={(event) => setFileName(event.target.value)}
                spellCheck={false}
                tabIndex={-1}
                size={1}
              />
            </div>
            <span className={styles.cloudflareLanguage}>{selectedLanguage?.name}</span>
          </div>
        ) : flashShown ? null : (
          <div className={styles.cloudflareHeader} data-ignore-in-export>
            <div className={classNames(styles.fileName, styles.cloudflareFileName)} data-value={fileName}>
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
            <span className={styles.cloudflareLanguage}>{selectedLanguage?.name}</span>
          </div>
        )}
        <Editor />
      </div>
    </div>
  );
};

export default CloudflareFrame;
