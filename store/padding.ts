import { atom } from "jotai";

export const PADDING_OPTIONS = [16, 32, 64, 128] as const;

export type Padding = typeof PADDING_OPTIONS[number];

const paddingAtom = atom<Padding>(PADDING_OPTIONS[2]);

export function isPadding(padding: Padding | unknown): padding is Padding {
  return PADDING_OPTIONS.indexOf(padding as Padding) !== -1;
}

paddingAtom.onMount = (setValue) => {
  const searchParams = new URLSearchParams(location.search);

  const searchparamsPadding = searchParams.get("padding");
  const wantedPadding = parseInt(searchparamsPadding!, 10);

  if (isPadding(wantedPadding)) {
    setValue(wantedPadding);
  }
};

export { paddingAtom };
