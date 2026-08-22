import classNames from "classnames";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { fileNameAtom, showBackgroundAtom } from "../../store";
import { updateBlockAtom, type CodeBlock } from "../../store/blocks";
import { flashShownAtom } from "../../store/flash";
import { paddingAtom } from "../../store/padding";
import { themeDarkModeAtom } from "../../store/themes";
import useIsSafari from "../../util/useIsSafari";
import { useIsMultiBlock, usePrimaryBlockId } from "../../hooks/usePrimaryBlockId";

import CodeBlocks from "../CodeBlocks";
import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./GeminiFrame.module.css";

const GeminiFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);
  const isSafari = useIsSafari();
  const flashShown = useAtomValue(flashShownAtom);
  const isMulti = useIsMultiBlock();
  const primaryBlockId = usePrimaryBlockId();
  const updateBlock = useSetAtom(updateBlockAtom);

  const renderChrome = (block: CodeBlock, index: number) =>
    block.title.length > 0 ? (
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
        </div>
      </div>
    ) : flashShown ? null : (
      <div className={styles.header} data-ignore-in-export>
        <div className={classNames(sharedStyles.fileName, styles.fileName)} data-value={block.title}>
          <input
            type="text"
            value={block.title}
            onChange={(event) => updateBlock({ blockId: block.id, update: { title: event.target.value } })}
            spellCheck={false}
            tabIndex={-1}
            size={1}
          />
          <span>{`Untitled-${index + 1}`}</span>
        </div>
      </div>
    );

  return (
    <div
      className={classNames(
        sharedStyles.frame,
        styles.frame,
        !darkMode && styles.frameLightMode,
        !showBackground && sharedStyles.noBackground,
        !showBackground && styles.noBackground,
        isSafari && styles.isSafari,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={sharedStyles.transparentPattern}></div>}
      {showBackground && <img src="/stars.svg" alt="stars" className={styles.stars} />}
      {isMulti ? (
        <CodeBlocks
          windowClassName={styles.window}
          renderChrome={renderChrome}
          renderEditor={(_block, _index, editor) => <div>{editor}</div>}
        />
      ) : (
        <div className={styles.window}>
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
            </div>
          )}

          <div>{primaryBlockId ? <Editor blockId={primaryBlockId} /> : null}</div>
        </div>
      )}
    </div>
  );
};

export default GeminiFrame;
