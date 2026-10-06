import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";

import { fileNameAtom, showBackgroundAtom } from "../../store";
import { paddingAtom } from "../../store/padding";
import { themeDarkModeAtom } from "../../store/themes";

import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./BrowserbaseFrame.module.css";

const VERTICAL_GRID_POSITIONS = [12.5, 25, 37.5, 50, 62.5, 75, 87.5];
const HORIZONTAL_GRID_POSITIONS = [25, 50, 75];

const BrowserbaseFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);

  return (
    <div
      className={classNames(
        sharedStyles.frame,
        showBackground && styles.frame,
        !darkMode && styles.frameLightMode,
        !showBackground && sharedStyles.noBackground,
        !showBackground && styles.noBackground,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={sharedStyles.transparentPattern}></div>}
      {showBackground && (
        <div className={styles.background} aria-hidden="true">
          {VERTICAL_GRID_POSITIONS.map((position) => (
            <div
              className={classNames(styles.backgroundGridline, styles.backgroundGridlineVertical)}
              key={position}
              style={{ left: `${position}%` }}
            ></div>
          ))}
          {HORIZONTAL_GRID_POSITIONS.map((position) => (
            <div
              className={classNames(styles.backgroundGridline, styles.backgroundGridlineHorizontal)}
              key={position}
              style={{ top: `${position}%` }}
            ></div>
          ))}
        </div>
      )}
      <div className={styles.window}>
        <div className={classNames(sharedStyles.header, styles.header)}>
          <div className={sharedStyles.controls}>
            <div className={sharedStyles.control}></div>
            <div className={sharedStyles.control}></div>
            <div className={sharedStyles.control}></div>
          </div>
          <div className={classNames(sharedStyles.fileName, styles.fileName)}>
            <input
              type="text"
              value={fileName}
              onChange={(event) => setFileName(event.target.value)}
              spellCheck={false}
              tabIndex={-1}
            />
            {fileName.length === 0 ? <span data-ignore-in-export>Untitled-1</span> : null}
          </div>
          <div />
        </div>
        <Editor />
      </div>
    </div>
  );
};

export default BrowserbaseFrame;
