import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";

import { fileNameAtom, showBackgroundAtom } from "../../store";
import { selectedLanguageAtom } from "../../store/code";
import { paddingAtom } from "../../store/padding";
import { themeDarkModeAtom } from "../../store/themes";

import Editor from "../Editor";
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
        styles.frame,
        styles.resend,
        darkMode && styles.darkMode,
        showBackground && styles.withBackground,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      <div className={styles.resendWindow}>
        <div className={styles.resendHeader}>
          <div className={classNames(styles.fileName, styles.resendFileName)} data-value={fileName}>
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
          <span className={styles.resendLanguage}>{selectedLanguage?.name}</span>
        </div>
        <Editor />
      </div>
    </div>
  );
};

export default ResendFrame;
