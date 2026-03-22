import classNames from "classnames";
import { useAtomValue } from "jotai";

import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./VercelFrame.module.css";
import { elementDarkModeAtom, elementPaddingAtom, elementTransparentAtom } from "../../store/editor";

const VercelFrame = () => {
  const padding = useAtomValue(elementPaddingAtom);
  const darkMode = useAtomValue(elementDarkModeAtom);
  const transparent = useAtomValue(elementTransparentAtom);
  return (
    <div
      className={classNames(
        sharedStyles.frame,
        transparent && styles.frame,
        transparent && !darkMode && styles.frameLightMode,
        !transparent && sharedStyles.noBackground,
        !transparent && styles.noBackground,
      )}
      style={{ padding }}
    >
      {!transparent && <div data-ignore-in-export className={sharedStyles.transparentPattern}></div>}
      <div className={styles.window}>
        <span className={styles.gridlinesHorizontal} data-grid></span>
        <span className={styles.gridlinesVertical} data-grid></span>
        <span className={styles.bracketLeft} data-grid></span>
        <span className={styles.bracketRight} data-grid></span>
        <Editor />
      </div>
    </div>
  );
};

export default VercelFrame;
