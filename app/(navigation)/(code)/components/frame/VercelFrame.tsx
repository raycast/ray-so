import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";

import { showBackgroundAtom } from "../../store";
import { paddingAtom } from "../../store/padding";
import { themeDarkModeAtom } from "../../store/themes";

import Editor from "../Editor";
import styles from "./VercelFrame.module.css";

const VercelFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);

  return (
    <div
      className={classNames(
        styles.frame,
        showBackground && styles.vercelFrame,
        showBackground && !darkMode && styles.vercelFrameLightMode,
        !showBackground && styles.noBackground,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      <div className={styles.vercelWindow}>
        <span className={styles.vercelGridlinesHorizontal} data-grid></span>
        <span className={styles.vercelGridlinesVertical} data-grid></span>
        <span className={styles.vercelBracketLeft} data-grid></span>
        <span className={styles.vercelBracketRight} data-grid></span>
        <Editor />
      </div>
    </div>
  );
};

export default VercelFrame;
