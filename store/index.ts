import { atom } from "jotai";
import { atomWithHash } from "jotai-location";
import type { Highlighter } from "shiki";

export const windowWidthAtom = atomWithHash<number | null>("width", null);

export const showBackgroundAtom = atomWithHash<boolean>("background", true);

export const showLineNumbersAtom = atomWithHash<boolean | undefined>("lineNumbers", undefined);

export const fileNameAtom = atomWithHash<string>("title", "", {
  serialize(val) {
    return val;
  },
  deserialize(str) {
    return str || "";
  },
});

export const highlighterAtom = atom<Highlighter | null>(null);

export const loadingLanguageAtom = atom<boolean>(false);

export const highlightedLinesAtom = atomWithHash<number[]>("highlightedLines", [], {
  serialize(val) {
    return val.join(",");
  },
  deserialize(str) {
    return str ? str.split(",").map(Number) : [];
  },
});
