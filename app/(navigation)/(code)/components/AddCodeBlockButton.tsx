"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { PlusIcon } from "@raycast/icons";

import { addBlockAtom, blocksAtom, MAX_CODE_BLOCKS } from "../store/blocks";
import { codeExampleAtom } from "../store/code";
import { LANGUAGES } from "../util/languages";
import styles from "./AddCodeBlockButton.module.css";

function AddCodeBlockButton() {
  const blocks = useAtomValue(blocksAtom);
  const addBlock = useSetAtom(addBlockAtom);
  const codeExample = useAtomValue(codeExampleAtom);
  const atLimit = blocks.length >= MAX_CODE_BLOCKS;
  const showingExample = blocks.length === 1 && !blocks.some((block) => block.code.length > 0);

  if (atLimit) return null;

  const handleAddBlock = () => {
    if (showingExample && codeExample) {
      const detectedLanguageKey = Object.keys(LANGUAGES).find((key) => LANGUAGES[key] === codeExample.language) ?? null;
      addBlock({
        code: codeExample.code,
        languageKey: null,
        detectedLanguageKey,
      });
      return;
    }
    addBlock();
  };

  return (
    <button
      type="button"
      className={styles.addButton}
      onClick={handleAddBlock}
      aria-label="Add code block"
      title="Add code block"
    >
      <PlusIcon width={16} height={16} />
    </button>
  );
}

export default AddCodeBlockButton;
