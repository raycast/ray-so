import { useAtomValue } from "jotai";
import { blocksAtom } from "../store/blocks";

export function usePrimaryBlockId() {
  return useAtomValue(blocksAtom)[0]?.id ?? null;
}

export function useIsMultiBlock() {
  return useAtomValue(blocksAtom).length > 1;
}
