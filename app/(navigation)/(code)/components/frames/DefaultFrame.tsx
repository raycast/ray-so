import classNames from "classnames";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { fileNameAtom, showBackgroundAtom } from "../../store";
import { paddingAtom } from "../../store/padding";
import { themeAtom, themeBackgroundAtom, themeDarkModeAtom } from "../../store/themes";
import useIsSafari from "../../util/useIsSafari";
import { useIsMultiBlock, usePrimaryBlockId } from "../../hooks/usePrimaryBlockId";
import { updateBlockAtom, type CodeBlock } from "../../store/blocks";
import CodeBlocks from "../CodeBlocks";
import Editor from "../Editor";
import styles from "./DefaultFrame.module.css";

const DefaultFrame = () => {
  const [padding] = useAtom(paddingAtom);
  const isSafari = useIsSafari();
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);
  const [themeBackground] = useAtom(themeBackgroundAtom);
  const [theme] = useAtom(themeAtom);
  const darkMode = useAtomValue(themeDarkModeAtom);
  const isMulti = useIsMultiBlock();
  const primaryBlockId = usePrimaryBlockId();
  const updateBlock = useSetAtom(updateBlockAtom);

  const windowClassName = classNames(styles.window, {
    [styles.withBorder]: !isSafari,
    [styles.withShadow]: !isSafari && showBackground,
  });

  const renderChrome = (block: CodeBlock, index: number) => (
    <div className={styles.header}>
      <div className={styles.controls}>
        <div className={styles.control}></div>
        <div className={styles.control}></div>
        <div className={styles.control}></div>
      </div>
      <div className={styles.fileName}>
        <input
          type="text"
          value={block.title}
          onChange={(event) => updateBlock({ blockId: block.id, update: { title: event.target.value } })}
          spellCheck={false}
          tabIndex={-1}
        />
        {block.title.length === 0 ? <span data-ignore-in-export>{`Untitled-${index + 1}`}</span> : null}
      </div>
    </div>
  );

  return (
    <div
      className={classNames(
        styles.frame,
        styles[theme.id],
        darkMode && styles.darkMode,
        showBackground && styles.withBackground,
      )}
      style={{
        padding,
        backgroundImage: showBackground ? themeBackground : "",
      }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      {isMulti ? (
        <CodeBlocks windowClassName={windowClassName} renderChrome={renderChrome} />
      ) : (
        <div className={windowClassName}>
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
                onChange={(event) => setFileName(event.target.value)}
                spellCheck={false}
                tabIndex={-1}
              />
              {fileName.length === 0 ? <span data-ignore-in-export>Untitled-1</span> : null}
            </div>
          </div>
          {primaryBlockId ? <Editor blockId={primaryBlockId} /> : null}
        </div>
      )}
    </div>
  );
};

export default DefaultFrame;
