import React from "react";
import { useAtom } from "jotai";
import { currentElementIdAtom, currentSlideIdAtom } from "../editor";

export const useSelection = () => {
  const [slideId, setSlideId] = useAtom(currentSlideIdAtom);
  const [elementId, setElementId] = useAtom(currentElementIdAtom);

  const selectSlide = React.useCallback(
    (id: string | null) => {
      setSlideId(id);
    },
    [setSlideId],
  );

  const selectElement = React.useCallback(
    (id: string | null) => {
      setElementId(id);
    },
    [setElementId],
  );

  return {
    slideId,
    elementId,
    selectSlide,
    selectElement,
  };
};
