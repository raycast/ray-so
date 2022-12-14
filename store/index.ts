import { atom } from "jotai";

export const windowWidthAtom = atom<number | null>(null);

windowWidthAtom.onMount = (setValue) => {
  const searchParams = new URLSearchParams(location.search);
  const searchParamsWindowWidth = parseInt(searchParams.get("width")!, 10);

  if (searchParamsWindowWidth) {
    setValue(searchParamsWindowWidth);
  }
};

export const showBackgroundAtom = atom<boolean>(true);

showBackgroundAtom.onMount = (setValue) => {
  const searchParams = new URLSearchParams(location.search);

  const searchParamsShowBackground = searchParams.get("background");

  if (searchParamsShowBackground) {
    setValue(searchParamsShowBackground === "true");
  }
};

export const fileNameAtom = atom<string>("");

fileNameAtom.onMount = (setValue) => {
  const searchParams = new URLSearchParams(location.search);
  const searchParamsFileName = searchParams.get("title");

  if (searchParamsFileName) {
    setValue(searchParamsFileName);
  }
};
