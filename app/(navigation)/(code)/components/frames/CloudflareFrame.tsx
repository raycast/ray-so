import classNames from "classnames";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { fileNameAtom, showBackgroundAtom } from "../../store";
import { updateBlockAtom, type CodeBlock } from "../../store/blocks";
import { getBlockLanguage, selectedLanguageAtom } from "../../store/code";
import { flashShownAtom } from "../../store/flash";
import { paddingAtom } from "../../store/padding";
import { themeDarkModeAtom } from "../../store/themes";
import { useIsMultiBlock, usePrimaryBlockId } from "../../hooks/usePrimaryBlockId";

import CodeBlocks from "../CodeBlocks";
import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./CloudflareFrame.module.css";

const CloudflareFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const flashShown = useAtomValue(flashShownAtom);
  const isMulti = useIsMultiBlock();
  const primaryBlockId = usePrimaryBlockId();
  const updateBlock = useSetAtom(updateBlockAtom);

  const renderChrome = (block: CodeBlock, index: number) => (
    <>
      <span className={styles.gridlinesHorizontal} data-grid></span>
      <span className={styles.gridlinesVertical} data-grid></span>
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
          {block.title.length === 0 ? <span data-ignore-in-export>{`Untitled-${index + 1}`}</span> : null}
        </div>
        <span className={styles.language}>{getBlockLanguage(block)?.name}</span>
      </div>
    </>
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
      {isMulti ? (
        <CodeBlocks windowClassName={styles.window} renderChrome={renderChrome} />
      ) : (
        <div className={styles.window}>
          <span className={styles.gridlinesHorizontal} data-grid></span>
          <span className={styles.gridlinesVertical} data-grid></span>
          {fileName.length > 0 ? (
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
              </div>
              <span className={styles.language}>{selectedLanguage?.name}</span>
            </div>
          ) : flashShown ? null : (
            <div className={styles.header} data-ignore-in-export>
              <div className={classNames(sharedStyles.fileName, styles.fileName)} data-value={fileName}>
                <input
                  type="text"
                  value={fileName}
                  onChange={(event) => setFileName(event.target.value)}
                  spellCheck={false}
                  tabIndex={-1}
                  size={1}
                />
                <span>Untitled-1</span>
              </div>
              <span className={styles.language}>{selectedLanguage?.name}</span>
            </div>
          )}
          {primaryBlockId ? <Editor blockId={primaryBlockId} /> : null}
        </div>
      )}
    </div>
  );
};

export default CloudflareFrame;
