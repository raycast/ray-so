import { atom } from "jotai";
import hljs from "highlight.js";
import { LANGUAGES, Language } from "../util/languages";
import {
  activeBlockAtom,
  blocksAtom,
  createEmptyBlock,
  resolvedActiveBlockIdAtom,
  setBlocksAndPersistAtom,
  updateBlockAtom,
  type CodeBlock,
} from "./blocks";

type CodeSample = {
  language: Language;
  code: string;
};

const CODE_SAMPLES: CodeSample[] = [
  {
    language: LANGUAGES.javascript,
    code: `module.exports = leftpad;

function leftpad(str, len, ch) {
  str = String(str);
  var i = -1;

  if (!ch && ch !== 0) ch = ' ';

  len = len - str.length;

  while (i++ < len) {
    str = ch + str;
  }
  return str;
}`,
  },
  {
    language: LANGUAGES.swift,
    code: `import SwiftUI

struct CircleImage: View {
  var body: some View {
    Image("turtlerock")
      .clipShape(Circle())
  }
}`,
  },
  {
    language: LANGUAGES.tsx,
    code: `import { Detail } from "@raycast/api";

export default function Command() {
  return <Detail markdown="Hello World" />;
}`,
  },
];

const detectLanguage: (input: string) => Promise<string> = async (input) => {
  return new Promise((resolve) => {
    const highlightResult = hljs.highlightAuto(input, Object.keys(LANGUAGES));

    if (highlightResult.language) {
      resolve(highlightResult.language);
    } else {
      resolve(LANGUAGES.plaintext.name.toLowerCase());
    }
  });
};

function getLanguageKey(language: Language | null) {
  if (!language) return null;
  return Object.keys(LANGUAGES).find((key) => LANGUAGES[key] === language) ?? null;
}

export const codeExampleAtom = atom<CodeSample | null>(CODE_SAMPLES[Math.floor(Math.random() * CODE_SAMPLES.length)]);

function hasPersistedCode(blocks: CodeBlock[]) {
  return blocks.some((block) => block.code.length > 0);
}

export const codeAtom = atom(
  (get) => {
    const block = get(activeBlockAtom);
    if (!block) return "";

    if (!hasPersistedCode(get(blocksAtom))) {
      return get(codeExampleAtom)?.code ?? "";
    }

    return block.code;
  },
  (get, set, newCode: string) => {
    const activeId = get(resolvedActiveBlockIdAtom);
    if (!activeId) return;

    const blocks = get(blocksAtom);
    const showingExample = !hasPersistedCode(blocks);

    if (showingExample) {
      const example = get(codeExampleAtom);
      set(setBlocksAndPersistAtom, [
        createEmptyBlock({
          id: activeId,
          code: newCode,
          languageKey: null,
          detectedLanguageKey: getLanguageKey(example?.language ?? null),
        }),
      ]);
    } else {
      set(updateBlockAtom, { blockId: activeId, update: { code: newCode } });
    }

    detectLanguage(newCode).then((language) => {
      if (LANGUAGES[language]) {
        set(updateBlockAtom, { blockId: activeId, update: { detectedLanguageKey: language } });
      }
    });
  },
);

export const isCodeExampleAtom = atom<boolean>((get) => {
  const code = get(codeAtom);
  return !hasPersistedCode(get(blocksAtom)) && !!CODE_SAMPLES.find((codeSample) => codeSample.code === code);
});

export const autoDetectLanguageAtom = atom<boolean>((get) => {
  const block = get(activeBlockAtom);
  return block?.languageKey == null;
});

export const selectedLanguageAtom = atom(
  (get) => {
    const block = get(activeBlockAtom);
    if (!block) return null;

    if (block.languageKey && LANGUAGES[block.languageKey]) {
      return LANGUAGES[block.languageKey];
    }

    if (get(isCodeExampleAtom)) {
      return get(codeExampleAtom)?.language ?? null;
    }

    if (block.detectedLanguageKey && LANGUAGES[block.detectedLanguageKey]) {
      return LANGUAGES[block.detectedLanguageKey];
    }

    return null;
  },
  (get, set, newLanguage: Language | null) => {
    set(activeBlockAtom, { languageKey: getLanguageKey(newLanguage) });
  },
);

export function getBlockLanguage(block: {
  languageKey: string | null;
  detectedLanguageKey?: string | null;
}): Language | null {
  if (block.languageKey && LANGUAGES[block.languageKey]) {
    return LANGUAGES[block.languageKey];
  }
  if (block.detectedLanguageKey && LANGUAGES[block.detectedLanguageKey]) {
    return LANGUAGES[block.detectedLanguageKey];
  }
  return null;
}

export function detectBlockLanguage(code: string) {
  return detectLanguage(code);
}
