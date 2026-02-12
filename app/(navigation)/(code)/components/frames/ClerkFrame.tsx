import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";

import { showBackgroundAtom } from "../../store";
import { paddingAtom } from "../../store/padding";
import { themeDarkModeAtom } from "../../store/themes";
import clerkPattern from "../../assets/clerk/pattern.svg?url";

import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./ClerkFrame.module.css";

const ClerkFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);

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
      {showBackground && <img src={clerkPattern} alt="" className={styles.pattern} />}
      <div className={styles.window}>
        <div className={styles.code}>
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default ClerkFrame;
