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

const fontAtom = atomWithHash<Font | null>("font", null, {
  serialize(value) {
    return value || "";
  },
  deserialize(key) {
    return FONTS.includes(key as Font) ? (key as Font) : null;
  },
});

export { fontAtom };
