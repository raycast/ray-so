import classNames from "classnames";
import { useAtomValue, useSetAtom } from "jotai";

import useIsSafari from "../../util/useIsSafari";
import Editor from "../Editor";
import styles from "./DefaultFrame.module.css";
import {
  elementDarkModeAtom,
  elementFileNameAtom,
  elementPaddingAtom,
  elementThemeAtom,
  elementTransparentAtom,
  themeBackgroundAtom,
  updateSlideElementAtom,
} from "../../store/editor";

const DefaultFrame = () => {
  const isSafari = useIsSafari();
  const themeBackground = useAtomValue(themeBackgroundAtom);
  const themeId = useAtomValue(elementThemeAtom);

  const padding = useAtomValue(elementPaddingAtom);
  const darkMode = useAtomValue(elementDarkModeAtom);
  const transparent = useAtomValue(elementTransparentAtom);
  const fileName = useAtomValue(elementFileNameAtom);
  const update = useSetAtom(updateSlideElementAtom);

  return (
    <div
      className={classNames(
        styles.frame,
        styles[themeId],
        darkMode && styles.darkMode,
        transparent && styles.withBackground,
      )}
      style={{
        padding,
        backgroundImage: transparent ? themeBackground : "",
      }}
    >
      {!transparent && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      <div
        className={classNames(styles.window, {
          [styles.withBorder]: !isSafari,
          [styles.withShadow]: !isSafari && transparent,
        })}
      >
        <div className={styles.header}>
          <div className={styles.controls}>
            <div className={styles.control}></div>
            <div className={styles.control}></div>
            <div className={styles.control}></div>
          </div>
          <div className={styles.fileName}>
            <input
              type="text"
              value={fileName}
              onChange={(event) => update({ header: { properties: { title: { text: event.target.value } } } })}
              spellCheck={false}
              tabIndex={-1}
            />
            {fileName.length === 0 ? <span data-ignore-in-export>Untitled-1</span> : null}
          </div>
        </div>
        <Editor />
      </div>
    </div>
  );
};

export default DefaultFrame;
