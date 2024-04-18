import { atom } from "jotai";
import { atomWithHash } from "jotai-location";
import type { Highlighter } from "shiki";

export const windowWidthAtom = atomWithHash<number | null>("width", null, {
  delayInit: true,
});

export const showBackgroundAtom = atomWithHash<boolean>("background", true, {
  delayInit: true,
});

export const fileNameAtom = atomWithHash<string>("title", "", {
  delayInit: true,
  serialize(val) {
    return val;
  },
  deserialize(str) {
    return str || "";
  },
});

export const highlighterAtom = atom<Highlighter | null>(null);

export const loadingLanguageAtom = atom<boolean>(false);
