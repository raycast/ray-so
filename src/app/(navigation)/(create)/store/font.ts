import { atomWithHash } from "jotai-location";

export const FONTS = [
  "jetbrains-mono",
  "geist-mono",
  "ibm-plex-mono",
  "fira-code",
  "soehne-mono",
  "roboto-mono",
  "commit-mono",
  "space-mono",
  "source-code-pro",
  "google-sans-code",
] as const;

const fontAtom = atomWithHash("font", FONTS[0]);

export { fontAtom };
