import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";

import { showBackgroundAtom } from "../../store";
import { paddingAtom } from "../../store/padding";
import { themeDarkModeAtom } from "../../store/themes";
import { useIsMultiBlock, usePrimaryBlockId } from "../../hooks/usePrimaryBlockId";

import CodeBlocks from "../CodeBlocks";
import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./NuxtFrame.module.css";

const NuxtFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const isMulti = useIsMultiBlock();
  const primaryBlockId = usePrimaryBlockId();

  return (
    <div
      className={classNames(
        sharedStyles.frame,
        styles.frame,
        !darkMode && styles.frameLightMode,
        !showBackground && sharedStyles.noBackground,
        !showBackground && styles.noBackground,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={sharedStyles.transparentPattern}></div>}
      <img src="/stars.svg" alt="stars" className={styles.stars} />
      {isMulti ? (
        <CodeBlocks
          windowClassName={styles.window}
          renderChrome={() => (
            <>
              <span data-frameborder />
              <span data-frameborder />
              <span data-frameborder />
            </>
          )}
        />
      ) : (
        <div className={styles.window}>
          <span data-frameborder />
          <span data-frameborder />
          <span data-frameborder />
          {primaryBlockId ? <Editor blockId={primaryBlockId} /> : null}
        </div>
      )}
    </div>
  );
};

export default NuxtFrame;
