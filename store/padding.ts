import { atomWithHash } from "jotai/utils";

export const PADDING_OPTIONS = [16, 32, 64, 128] as const;

export type Padding = typeof PADDING_OPTIONS[number];

const paddingAtom = atomWithHash<Padding>("padding", PADDING_OPTIONS[2], {
  delayInit: true,
});

export { paddingAtom };
