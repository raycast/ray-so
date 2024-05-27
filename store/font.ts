import { atomWithHash } from "jotai-location";

export const FONTS = ["jetbrains-mono", "geist-mono", "ibm-plex-mono"] as const;

export type Font = (typeof FONTS)[number];

const fontAtom = atomWithHash<Font>("font", FONTS[0], {
  delayInit: true,
});

export { fontAtom };
