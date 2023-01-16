import { atom } from "jotai";

export type FlashMessage = {
  icon: any;
  message: string;
  timeout?: number;
};

const timeoutAtom = atom<number>(0);
const flashMessageAtom = atom<FlashMessage | null>(null);

export const derivedFlashMessageAtom = atom<FlashMessage | null, FlashMessage | null>(
  (get) => get(flashMessageAtom),
  (get, set, flashMessage) => {
    window.clearTimeout(get(timeoutAtom));

    set(flashMessageAtom, flashMessage);

    if (flashMessage?.timeout) {
      set(
        timeoutAtom,
        window.setTimeout(() => {
          set(flashMessageAtom, null);
        }, flashMessage.timeout)
      );
    }
  }
);
