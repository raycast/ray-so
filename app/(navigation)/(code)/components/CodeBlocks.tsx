"use client";

import classNames from "classnames";
import { ReactNode } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { TrashIcon } from "@raycast/icons";

import { activeBlockIdAtom, blocksAtom, removeBlockAtom, type CodeBlock } from "../store/blocks";
import Editor from "./Editor";
import styles from "./CodeBlocks.module.css";

type CodeBlocksProps = {
  windowClassName?: string;
  renderChrome?: (block: CodeBlock, index: number) => ReactNode;
  renderEditor?: (block: CodeBlock, index: number, editor: ReactNode) => ReactNode;
  renderWindow?: (block: CodeBlock, index: number, editor: ReactNode) => ReactNode;
};

function CodeBlocks({ windowClassName, renderChrome, renderEditor, renderWindow }: CodeBlocksProps) {
  const blocks = useAtomValue(blocksAtom);
  const setActiveBlockId = useSetAtom(activeBlockIdAtom);
  const removeBlock = useSetAtom(removeBlockAtom);

  return (
    <div className={styles.blocks}>
      {blocks.map((block, index) => {
        const editor = <Editor blockId={block.id} />;
        const content = renderEditor ? renderEditor(block, index, editor) : editor;

        return (
          <div
            key={block.id}
            className={classNames(styles.windowWrap, !renderWindow && windowClassName)}
            data-code-window
            onMouseDown={() => setActiveBlockId(block.id)}
          >
            {renderWindow ? (
              renderWindow(block, index, editor)
            ) : (
              <>
                {renderChrome?.(block, index)}
                {content}
              </>
            )}
            {blocks.length > 1 ? (
              <button
                type="button"
                className={styles.removeButton}
                data-ignore-in-export
                aria-label={`Remove block ${index + 1}`}
                onClick={(event) => {
                  event.stopPropagation();
                  removeBlock(block.id);
                }}
              >
                <TrashIcon width={14} height={14} />
              </button>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default CodeBlocks;
