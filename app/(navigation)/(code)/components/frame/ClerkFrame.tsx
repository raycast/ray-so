import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";

import { showBackgroundAtom } from "../../store";
import { paddingAtom } from "../../store/padding";
import { themeDarkModeAtom } from "../../store/themes";
import clerkPattern from "../../assets/clerk/pattern.svg?url";

import Editor from "../Editor";
import styles from "./ClerkFrame.module.css";

const ClerkFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);

  return (
    <div
      className={classNames(
        styles.frame,
        showBackground && styles.clerkFrame,
        !darkMode && styles.clerkFrameLightMode,
        !showBackground && styles.noBackground,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      {showBackground && <img src={clerkPattern} alt="" className={styles.clerkPattern} />}
      <div className={styles.clerkWindow}>
        <div className={styles.clerkCode}>
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default ClerkFrame;
