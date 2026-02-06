import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";

import beams from "../../assets/tailwind/beams.png";
import { fileNameAtom, showBackgroundAtom } from "../../store";
import { paddingAtom } from "../../store/padding";
import { themeDarkModeAtom } from "../../store/themes";
import useIsSafari from "../../util/useIsSafari";

import Editor from "../Editor";
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
        styles.frame,
        showBackground && styles.tailwindFrame,
        !darkMode && styles.tailwindFrameLightMode,
        !showBackground && styles.noBackground,
        isSafari && styles.isSafari,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      {showBackground && <img src={beams.src} alt="beams" className={styles.tailwindBeams} />}
      <div className={styles.beams} />
      <div className={styles.tailwindWindow}>
        {showBackground && (
          <>
            <span className={styles.tailwindGridlinesHorizontal} data-grid></span>
            <span className={styles.tailwindGridlinesVertical} data-grid></span>
            <div className={styles.tailwindGradient}>
              <div>
                <div className={styles.tailwindGradient1}></div>
                <div className={styles.tailwindGradient2}></div>
              </div>
            </div>
          </>
        )}
        <div className={styles.tailwindHeader}>
          <div className={styles.controls}>
            <div className={styles.control}></div>
            <div className={styles.control}></div>
            <div className={styles.control}></div>
          </div>
        </div>
        <Editor />
      </div>
    </div>
  );
};

export default TailwindFrame;
