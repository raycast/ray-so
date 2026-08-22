import classNames from "classnames";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { fileNameAtom, showBackgroundAtom } from "../../store";
import { updateBlockAtom, type CodeBlock } from "../../store/blocks";
import { paddingAtom } from "../../store/padding";
import { themeDarkModeAtom } from "../../store/themes";
import mintlifyPatternDark from "../../assets/mintlify-pattern-dark.svg?url";
import mintlifyPatternLight from "../../assets/mintlify-pattern-light.svg?url";
import { useIsMultiBlock, usePrimaryBlockId } from "../../hooks/usePrimaryBlockId";

import CodeBlocks from "../CodeBlocks";
import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./MintlifyFrame.module.css";

const MintlifyFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);
  const isMulti = useIsMultiBlock();
  const primaryBlockId = usePrimaryBlockId();
  const updateBlock = useSetAtom(updateBlockAtom);

  const renderChrome = (block: CodeBlock, index: number) => (
    <div className={styles.header}>
      <div className={classNames(sharedStyles.fileName, styles.fileName)} data-value={block.title}>
        <input
          type="text"
          value={block.title}
          onChange={(event) => updateBlock({ blockId: block.id, update: { title: event.target.value } })}
          spellCheck={false}
          tabIndex={-1}
          size={1}
        />
        {block.title.length === 0 ? <span>{`Untitled-${index + 1}`}</span> : null}
      </div>
    </div>
  );

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
      {showBackground && (
        <span className={styles.patternWrapper}>
          <img src={darkMode ? mintlifyPatternDark : mintlifyPatternLight} alt="" className={styles.pattern} />
        </span>
      )}
      {isMulti ? (
        <CodeBlocks windowClassName={styles.window} renderChrome={renderChrome} />
      ) : (
        <div className={styles.window}>
          <div className={styles.header}>
            <div className={classNames(sharedStyles.fileName, styles.fileName)} data-value={fileName}>
              <input
                type="text"
                value={fileName}
                onChange={(event) => setFileName(event.target.value)}
                spellCheck={false}
                tabIndex={-1}
                size={1}
              />
              {fileName.length === 0 ? <span>Untitled-1</span> : null}
            </div>
          </div>
          {primaryBlockId ? <Editor blockId={primaryBlockId} /> : null}
        </div>
      )}
    </div>
  );
};

export default MintlifyFrame;
