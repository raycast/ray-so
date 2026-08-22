import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";

import { showBackgroundAtom } from "../../store";
import { paddingAtom } from "../../store/padding";
import { themeDarkModeAtom } from "../../store/themes";
import clerkPattern from "../../assets/clerk/pattern.svg?url";
import { useIsMultiBlock, usePrimaryBlockId } from "../../hooks/usePrimaryBlockId";

import CodeBlocks from "../CodeBlocks";
import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./ClerkFrame.module.css";

const ClerkFrame = () => {
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
        !darkMode && styles.frameLightMode,
        !showBackground && sharedStyles.noBackground,
        !showBackground && styles.noBackground,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={sharedStyles.transparentPattern}></div>}
      {showBackground && <img src={clerkPattern} alt="" className={styles.pattern} />}
      {isMulti ? (
        <CodeBlocks
          windowClassName={styles.window}
          renderEditor={(_block, _index, editor) => <div className={styles.code}>{editor}</div>}
        />
      ) : (
        <div className={styles.window}>
          <div className={styles.code}>{primaryBlockId ? <Editor blockId={primaryBlockId} /> : null}</div>
        </div>
      )}
    </div>
  );
};

export default ClerkFrame;
