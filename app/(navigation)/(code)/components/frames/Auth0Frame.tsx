import classNames from "classnames";
import { ReactNode } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { fileNameAtom, showBackgroundAtom, subtitleAtom } from "../../store";
import { updateBlockAtom, type CodeBlock } from "../../store/blocks";
import { getBlockLanguage, selectedLanguageAtom } from "../../store/code";
import { paddingAtom } from "../../store/padding";
import { themeDarkModeAtom } from "../../store/themes";
import useIsSafari from "../../util/useIsSafari";
import { useIsMultiBlock, usePrimaryBlockId } from "../../hooks/usePrimaryBlockId";

import CodeBlocks from "../CodeBlocks";
import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./Auth0Frame.module.css";

const Auth0Frame = () => {
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);
  const [subtitle] = useAtom(subtitleAtom);
  const darkMode = useAtomValue(themeDarkModeAtom);
  const isSafari = useIsSafari();
  const selectedLanguage = useAtomValue(selectedLanguageAtom);
  const subtitleFallback = selectedLanguage?.name ?? "Plain Text";
  const subtitleDisplayValue = subtitle || subtitleFallback;
  const isMulti = useIsMultiBlock();
  const primaryBlockId = usePrimaryBlockId();
  const updateBlock = useSetAtom(updateBlockAtom);

  const renderWindow = (block: CodeBlock, index: number, editor: ReactNode) => {
    const languageName = getBlockLanguage(block)?.name ?? "Plain Text";
    return (
      <>
        <div className={styles.toolbar}>
          <div className={styles.controls}>
            <span className={styles.control}></span>
            <span className={styles.control}></span>
            <span className={styles.control}></span>
          </div>
          <div className={styles.badge} data-value={block.title}>
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
          <div className={styles.runtime} data-value={languageName}>
            <span>{languageName}</span>
          </div>
        </div>
        <div className={styles.window}>{editor}</div>
      </>
    );
  };

  return (
    <div
      className={classNames(
        sharedStyles.frame,
        styles.frame,
        !darkMode && styles.frameLightMode,
        showBackground && styles.withBackground,
        !showBackground && sharedStyles.noBackground,
        isSafari && styles.isSafari,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={sharedStyles.transparentPattern}></div>}

      <div className={styles.shell}>
        {showBackground && (
          <>
            <span className={styles.gridlinesHorizontal} data-grid></span>
            <span className={styles.gridlinesVertical} data-grid></span>
          </>
        )}
        {isMulti ? (
          <CodeBlocks renderWindow={renderWindow} />
        ) : (
          <>
            <div className={styles.toolbar}>
              <div className={styles.controls}>
                <span className={styles.control}></span>
                <span className={styles.control}></span>
                <span className={styles.control}></span>
              </div>
              <div className={styles.badge} data-value={fileName}>
                <input
                  type="text"
                  value={fileName}
                  onChange={(event) => setFileName(event.target.value)}
                  spellCheck={false}
                  tabIndex={-1}
                  size={1}
                />
                {fileName.length === 0 ? <span data-ignore-in-export>Untitled</span> : null}
              </div>
              <div className={styles.runtime} data-value={subtitleDisplayValue}>
                <span>{subtitleFallback}</span>
              </div>
            </div>

            <div className={styles.window}>{primaryBlockId ? <Editor blockId={primaryBlockId} /> : null}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth0Frame;
