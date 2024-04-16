import { atomWithHash } from "jotai-location";

export const FONTS = ["jetbrains-mono", "geist-mono"] as const;

export type Font = (typeof FONTS)[number];

export function isPadding(value: Font | unknown): value is Font {
  return FONTS.indexOf(value as Font) !== -1;
}

const fontAtom = atomWithHash<Font>("font", FONTS[0], {
  delayInit: true,
});

export { fontAtom };
