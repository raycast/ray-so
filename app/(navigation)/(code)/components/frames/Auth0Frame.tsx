import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";

import { fileNameAtom, showBackgroundAtom, subtitleAtom } from "../../store";
import { selectedLanguageAtom } from "../../store/code";
import { paddingAtom } from "../../store/padding";
import { themeDarkModeAtom } from "../../store/themes";

import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./Auth0Frame.module.css";

const Auth0Frame = () => {
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);
  const [subtitle, setSubtitle] = useAtom(subtitleAtom);
  const darkMode = useAtomValue(themeDarkModeAtom);
  const selectedLanguage = useAtomValue(selectedLanguageAtom);
  const subtitleFallback = selectedLanguage?.name ?? "Plain Text";
  const subtitleDisplayValue = subtitle || subtitleFallback;

  return (
    <div
      className={classNames(
        sharedStyles.frame,
        showBackground && styles.frame,
        !darkMode && styles.frameLightMode,
        !showBackground && sharedStyles.noBackground,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={sharedStyles.transparentPattern}></div>}

      <div className={styles.shell}>
        {showBackground && (
          <>
            <span className={styles.gridlinesHorizontal} data-grid></span>
            <span className={styles.gridlinesVertical} data-grid></span>
          </>
        )}
        <div className={styles.toolbar}>
          <div className={styles.controls}>
            <span className={styles.control}></span>
            <span className={styles.control}></span>
            <span className={styles.control}></span>
          </div>
          <div className={styles.badge} data-value={fileName}>
            <input
              type="text"
              value={fileName}
              onChange={(event) => setFileName(event.target.value)}
              spellCheck={false}
              tabIndex={-1}
              size={1}
            />
            {fileName.length === 0 ? <span data-ignore-in-export>Untitled</span> : null}
          </div>
          <div className={styles.runtime} data-value={subtitleDisplayValue}>
            <span>{subtitleFallback}</span>
          </div>
        </div>

        <div className={styles.window}>
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default Auth0Frame;
