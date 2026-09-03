import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";

import { fileNameAtom, showBackgroundAtom } from "../../store";
import { selectedLanguageAtom } from "../../store/code";
import { paddingAtom } from "../../store/padding";
import { themeDarkModeAtom } from "../../store/themes";

import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./ResendFrame.module.css";

const ResendFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);
  const selectedLanguage = useAtomValue(selectedLanguageAtom);

  return (
    <div
      className={classNames(
        sharedStyles.frame,
        styles.frame,
        darkMode && styles.darkMode,
        showBackground && styles.withBackground,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={sharedStyles.transparentPattern}></div>}
      <div className={styles.window}>
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
            {fileName.length === 0 ? <span>Untitled-1</span> : null}
          </div>
          <span className={styles.language}>{selectedLanguage?.name}</span>
        </div>
        <Editor />
      </div>
    </div>
  );
};

export default ResendFrame;
