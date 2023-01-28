import { atomWithHash } from "jotai-location";

export const windowWidthAtom = atomWithHash<number | null>("width", null, {
  delayInit: true,
});

export const showBackgroundAtom = atomWithHash<boolean>("background", true, {
  delayInit: true,
});

export const fileNameAtom = atomWithHash<string>("title", "", {
  delayInit: true,
  serialize(val) {
    return val;
  },
  deserialize(str) {
    return `${str}`;
  },
});
