import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";

import { showBackgroundAtom } from "../../store";
import { paddingAtom } from "../../store/padding";
import { themeDarkModeAtom } from "../../store/themes";
import clerkPattern from "../../assets/clerk/pattern.svg?url";

import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./ClerkFrame.module.css";
import { elementDarkModeAtom, elementPaddingAtom, elementTransparentAtom } from "../../store/editor";

const ClerkFrame = () => {
  const padding = useAtomValue(elementPaddingAtom);
  const darkMode = useAtomValue(elementDarkModeAtom);
  const transparent = useAtomValue(elementTransparentAtom);
  return (
    <div
      className={classNames(
        sharedStyles.frame,
        transparent && styles.frame,
        !darkMode && styles.frameLightMode,
        !transparent && sharedStyles.noBackground,
        !transparent && styles.noBackground,
      )}
      style={{ padding }}
    >
      {!transparent && <div data-ignore-in-export className={sharedStyles.transparentPattern}></div>}
      {transparent && <img src={clerkPattern} alt="" className={styles.pattern} />}
      <div className={styles.window}>
        <div className={styles.code}>
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default ClerkFrame;
