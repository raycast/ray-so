import { atom } from "jotai";
import { atomWithHash } from "jotai-location";
import type { Highlighter } from "shiki";
import { blocksAtom, updateBlockAtom } from "./blocks";

export const windowWidthAtom = atomWithHash<number | null>("width", null);

export const showBackgroundAtom = atomWithHash<boolean>("background", true);

export const showLineNumbersAtom = atomWithHash<boolean | undefined>("lineNumbers", undefined);

export const fileNameAtom = atom(
  (get) => get(blocksAtom)[0]?.title ?? "",
  (get, set, title: string) => {
    const first = get(blocksAtom)[0];
    if (!first) return;
    set(updateBlockAtom, { blockId: first.id, update: { title } });
  },
);

export const subtitleAtom = atomWithHash<string>("subtitle", "", {
  serialize(val) {
    return val;
  },
  deserialize(str) {
    return str || "";
  },
});

export const highlighterAtom = atom<Highlighter | null>(null);

export const loadingLanguageAtom = atom<boolean>(false);
