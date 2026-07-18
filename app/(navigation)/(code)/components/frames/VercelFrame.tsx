import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";

import { showBackgroundAtom } from "../../store";
import { paddingAtom } from "../../store/padding";
import { themeDarkModeAtom } from "../../store/themes";
import { useIsMultiBlock, usePrimaryBlockId } from "../../hooks/usePrimaryBlockId";

import CodeBlocks from "../CodeBlocks";
import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./VercelFrame.module.css";

const VercelFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const isMulti = useIsMultiBlock();
  const primaryBlockId = usePrimaryBlockId();

  return (
    <div
      className={classNames(
        sharedStyles.frame,
        showBackground && styles.frame,
        showBackground && !darkMode && styles.frameLightMode,
        !showBackground && sharedStyles.noBackground,
        !showBackground && styles.noBackground,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={sharedStyles.transparentPattern}></div>}
      {isMulti ? (
        <CodeBlocks
          windowClassName={styles.window}
          renderChrome={() => (
            <>
              <span className={styles.gridlinesHorizontal} data-grid />
              <span className={styles.gridlinesVertical} data-grid />
              <span className={styles.bracketLeft} data-grid />
              <span className={styles.bracketRight} data-grid />
            </>
          )}
        />
      ) : (
        <div className={styles.window}>
          <span className={styles.gridlinesHorizontal} data-grid></span>
          <span className={styles.gridlinesVertical} data-grid></span>
          <span className={styles.bracketLeft} data-grid></span>
          <span className={styles.bracketRight} data-grid></span>
          {primaryBlockId ? <Editor blockId={primaryBlockId} /> : null}
        </div>
      )}
    </div>
  );
};

export default VercelFrame;
