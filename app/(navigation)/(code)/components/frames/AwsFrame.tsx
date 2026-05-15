import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";

import { showBackgroundAtom } from "../../store";
import { paddingAtom } from "../../store/padding";
import { themeDarkModeAtom } from "../../store/themes";

import Editor from "../Editor";
import styles from "./AwsFrame.module.css";

const AwsFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);

  return (
    <div
      className={classNames(
        styles.frame,
        showBackground && styles.awsFrame,
        showBackground && !darkMode && styles.awsFrameLightMode,
        !showBackground && styles.noBackground,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      <div className={styles.awsWindow}>
        <span className={styles.awsGridlinesHorizontal} data-grid></span>
        <span className={styles.awsGridlinesVertical} data-grid></span>
        <span className={styles.awsBracketLeft} data-grid></span>
        <span className={styles.awsBracketRight} data-grid></span>
        <Editor />
      </div>
    </div>
  );
};

export default AwsFrame;
