import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";
import React from "react";

import { showBackgroundAtom } from "../../store";
import { paddingAtom } from "../../store/padding";
import { themeDarkModeAtom } from "../../store/themes";
import { useIsMultiBlock, usePrimaryBlockId } from "../../hooks/usePrimaryBlockId";

import CodeBlocks from "../CodeBlocks";
import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./OpenAIFrame.module.css";

const OpenAIFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const isMulti = useIsMultiBlock();
  const primaryBlockId = usePrimaryBlockId();

  return (
    <div
      className={classNames(
        styles.frame,
        !darkMode && styles.frameLightMode,
        !showBackground && sharedStyles.noBackground,
        !showBackground && styles.noBackground,
      )}
      style={{ padding, "--padding": `${padding}px` } as React.CSSProperties}
    >
      {!showBackground && <div data-ignore-in-export className={sharedStyles.transparentPattern}></div>}
      {isMulti ? (
        <CodeBlocks windowClassName={styles.window} />
      ) : (
        <div className={styles.window}>{primaryBlockId ? <Editor blockId={primaryBlockId} /> : null}</div>
      )}
    </div>
  );
};

export default OpenAIFrame;
