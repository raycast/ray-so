import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";

import beams from "../../assets/tailwind/beams.png";
import { fileNameAtom, showBackgroundAtom } from "../../store";
import { paddingAtom } from "../../store/padding";
import { themeDarkModeAtom } from "../../store/themes";
import useIsSafari from "../../util/useIsSafari";

import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./TailwindFrame.module.css";

const TailwindFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  useAtom(fileNameAtom);
  const isSafari = useIsSafari();

  return (
    <div
      className={classNames(
        sharedStyles.frame,
        showBackground && styles.frame,
        !darkMode && styles.frameLightMode,
        !showBackground && sharedStyles.noBackground,
        !showBackground && styles.noBackground,
        isSafari && styles.isSafari,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={sharedStyles.transparentPattern}></div>}
      {showBackground && <img src={beams.src} alt="beams" className={styles.beams} />}
      <div className={styles.beams} />
      <div className={styles.window}>
        {showBackground && (
          <>
            <span className={styles.gridlinesHorizontal} data-grid></span>
            <span className={styles.gridlinesVertical} data-grid></span>
            <div className={styles.gradient}>
              <div>
                <div className={styles.gradient1}></div>
                <div className={styles.gradient2}></div>
              </div>
            </div>
          </>
        )}
        <div className={classNames(sharedStyles.header, styles.header)}>
          <div className={sharedStyles.controls}>
            <div className={classNames(sharedStyles.control, styles.control)}></div>
            <div className={classNames(sharedStyles.control, styles.control)}></div>
            <div className={classNames(sharedStyles.control, styles.control)}></div>
          </div>
        </div>
        <Editor />
      </div>
    </div>
  );
};

export default TailwindFrame;
