import { atom } from "jotai";
import { atomWithHash } from "jotai-location";

export const FONTS = [
  "jetbrains-mono",
  "geist-mono",
  "ibm-plex-mono",
  "fira-code",
  "soehne-mono",
  "roboto-mono",
] as const;

export type Font = (typeof FONTS)[number];

export const loadingFontAtom = atom<boolean>(false);

const fontAtom = atomWithHash<Font>("font", FONTS[0], {
  serialize(value) {
    return value;
  },
  deserialize(key) {
    return FONTS.includes(key as Font) ? (key as Font) : FONTS[0];
  },
});

export { fontAtom };
