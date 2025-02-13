import { atomWithHash } from "jotai-location";

export const FONTS = [
  "jetbrains-mono",
  "geist-mono",
  "ibm-plex-mono",
  "fira-code",
  "soehne-mono",
  "ia-writer-mono",
] as const;

export type Font = (typeof FONTS)[number];

const fontAtom = atomWithHash<Font>("font", FONTS[0]);

export { fontAtom };
