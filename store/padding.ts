import { atomWithHash } from "jotai-location";

export const PADDING_OPTIONS = [16, 32, 64, 128] as const;

export type Padding = (typeof PADDING_OPTIONS)[number];

export function isPadding(value: Padding | unknown): value is Padding {
  return PADDING_OPTIONS.indexOf(value as Padding) !== -1;
}

const paddingAtom = atomWithHash<Padding>("padding", PADDING_OPTIONS[2]);

export { paddingAtom };
