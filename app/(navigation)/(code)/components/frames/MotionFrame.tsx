import classNames from "classnames";
import { useAtom } from "jotai";

import motionBackdrop from "../../assets/motion/rings.png";
import { showBackgroundAtom } from "../../store";
import { paddingAtom } from "../../store/padding";

import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./MotionFrame.module.css";

const MotionFrame = () => {
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);

  return (
    <div
      className={classNames(
        sharedStyles.frame,
        showBackground && styles.frame,
        !showBackground && sharedStyles.noBackground,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={sharedStyles.transparentPattern}></div>}
      {showBackground && (
        <>
          <img src={motionBackdrop.src} alt="" className={styles.backdrop} />
          <span className={styles.backdropFade}></span>
          <span className={styles.glow}></span>
        </>
      )}
      <div className={styles.code}>
        <Editor />
      </div>
    </div>
  );
};

export default MotionFrame;
