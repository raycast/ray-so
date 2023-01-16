import { atom } from "jotai";

export type FlashMessage = {
  icon: any;
  message: string;
  timeout?: number;
};

const timeoutAtom = atom<number>(0);
const iconAtom = atom<any>(null);
const messageAtom = atom<string>("");
export const flashShownAtom = atom(false);

export const derivedFlashMessageAtom = atom<FlashMessage | null, FlashMessage>(
  (get) => ({
    icon: get(iconAtom),
    message: get(messageAtom),
  }),
  (get, set, flashMessage) => {
    window.clearTimeout(get(timeoutAtom));

    set(messageAtom, flashMessage.message);
    set(iconAtom, flashMessage.icon);
    set(flashShownAtom, true);

    if (flashMessage?.timeout) {
      set(
        timeoutAtom,
        window.setTimeout(() => {
          set(flashShownAtom, false);
        }, flashMessage.timeout)
      );
    }
  }
);
