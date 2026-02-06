import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";

import { showBackgroundAtom } from "../../store";
import { paddingAtom } from "../../store/padding";
import { themeDarkModeAtom } from "../../store/themes";

import Editor from "../Editor";
import styles from "./WrappedFrame.module.css";

const WrappedFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);

  return (
    <div
      className={classNames(
        styles.frame,
        showBackground && styles.wrappedFrame,
        !darkMode && styles.wrappedFrameLightMode,
        !showBackground && styles.noBackground,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      {showBackground && (
        <>
          <span className={styles.wrappedBottomGlow}></span>
          <span className={styles.wrappedBorder}></span>
          <span className={styles.wrappedFade}></span>
          <span className={styles.wrappedGlowLeft}></span>
          <span className={styles.wrappedGlowRight}></span>
          <span className={styles.wrappedGlowBottom}></span>
        </>
      )}
      <div className={styles.wrappedWindow}>
        <Editor />
      </div>
    </div>
  );
};

export default WrappedFrame;
