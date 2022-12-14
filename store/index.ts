import { atomWithHash } from "jotai/utils";

export const windowWidthAtom = atomWithHash<number | null>("width", null, {
  delayInit: true,
});

export const showBackgroundAtom = atomWithHash<boolean>("background", true, {
  delayInit: true,
});

export const fileNameAtom = atomWithHash<string>("title", "", {
  delayInit: true,
});
