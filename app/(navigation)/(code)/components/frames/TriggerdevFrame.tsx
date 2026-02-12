import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";

import { fileNameAtom, showBackgroundAtom } from "../../store";
import { selectedLanguageAtom } from "../../store/code";
import { flashShownAtom } from "../../store/flash";
import { paddingAtom } from "../../store/padding";
import { themeBackgroundAtom, themeDarkModeAtom } from "../../store/themes";
import triggerPattern from "../../assets/triggerdev/pattern.svg?url";

import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./TriggerdevFrame.module.css";

const TriggerdevFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const [themeBackground] = useAtom(themeBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const flashShown = useAtomValue(flashShownAtom);

  return (
    <div
      className={classNames(
        sharedStyles.frame,
        showBackground && styles.frame,
        !darkMode && styles.frameLightMode,
        !showBackground && sharedStyles.noBackground,
        !showBackground && styles.noBackground,
      )}
      style={{ padding, backgroundImage: showBackground && darkMode ? themeBackground : "" }}
    >
      {!showBackground && <div data-ignore-in-export className={sharedStyles.transparentPattern}></div>}
      {showBackground && (
        <>
          <div className={styles.patternTop} style={{ backgroundImage: `url(${triggerPattern})` }} />
          <div className={styles.patternBottom} style={{ backgroundImage: `url(${triggerPattern})` }} />
        </>
      )}
      <div className={styles.window}>
        <span className={styles.gridlinesHorizontal} data-grid></span>
        <span className={styles.gridlinesVertical} data-grid></span>
        {fileName.length > 0 ? (
          <div className={styles.header}>
            <div className={classNames(sharedStyles.fileName, styles.fileName)} data-value={fileName}>
              <input
                type="text"
                value={fileName}
                onChange={(event) => setFileName(event.target.value)}
                spellCheck={false}
                tabIndex={-1}
                size={1}
              />
            </div>
            <span className={styles.language}>{selectedLanguage?.name}</span>
          </div>
        ) : flashShown ? null : (
          <div className={styles.header} data-ignore-in-export>
            <div className={classNames(sharedStyles.fileName, styles.fileName)} data-value={fileName}>
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
            <span className={styles.language}>{selectedLanguage?.name}</span>
          </div>
        )}
        <Editor />
      </div>
    </div>
  );
};

export default TriggerdevFrame;
