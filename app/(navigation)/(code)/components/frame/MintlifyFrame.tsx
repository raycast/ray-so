import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";

import { fileNameAtom, showBackgroundAtom } from "../../store";
import { paddingAtom } from "../../store/padding";
import { themeDarkModeAtom } from "../../store/themes";
import mintlifyPatternDark from "../../assets/mintlify-pattern-dark.svg?url";
import mintlifyPatternLight from "../../assets/mintlify-pattern-light.svg?url";

import Editor from "../Editor";
import styles from "./MintlifyFrame.module.css";

const MintlifyFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);

  return (
    <div
      className={classNames(
        styles.frame,
        showBackground && styles.mintlifyFrame,
        !darkMode && styles.mintlifyFrameLightMode,
        !showBackground && styles.noBackground,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      {showBackground && (
        <span className={styles.mintlifyPatternWrapper}>
          <img src={darkMode ? mintlifyPatternDark : mintlifyPatternLight} alt="" className={styles.mintlifyPattern} />
        </span>
      )}
      <div className={styles.mintlifyWindow}>
        <div className={styles.mintlifyHeader}>
          <div className={classNames(styles.fileName, styles.mintlifyFileName)} data-value={fileName}>
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
        </div>
        <Editor />
      </div>
    </div>
  );
};

export default MintlifyFrame;
