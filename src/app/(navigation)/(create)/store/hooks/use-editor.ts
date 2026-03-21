import { produce } from "immer";
import initialState from "../editor/state";
import { useAtomValue, useSetAtom } from "jotai";
import { editorAtom, editorStateAtom } from "../editor";
import { SlideTypes, ElementType, EditorState } from "@/typings/editor";

const useEditor = () => {
  const state = useAtomValue(editorStateAtom);
  const setState = useSetAtom(editorAtom);
  /* ------------------------------- */
  /* Async-safe update wrapper */
  /* ------------------------------- */

  const update = (fn: (draft: EditorState) => void) => {
    setState(async (prev) => {
      const resolved = await prev;
      return produce(resolved, fn);
    });
  };

  /* ------------------------------- */
  /* Slides */
  /* ------------------------------- */

  const createSlide = (slide: SlideTypes) => {
    update((draft) => {
      draft.slides[slide.id] = slide;
      draft.slideElements[slide.id] = [];
    });
  };

  const updateSlide = (slideId: string, patch: Partial<Omit<SlideTypes, "id" | "elements">>) => {
    update((draft) => {
      const slide = draft.slides[slideId];
      if (!slide) return;

      Object.assign(slide, patch);
    });
  };

  const deleteSlide = (slideId: string) => {
    update((draft) => {
      const elementIds = draft.slideElements[slideId] || [];

      for (const id of elementIds) {
        delete draft.elements[id];
      }

      delete draft.slideElements[slideId];
      delete draft.slides[slideId];
    });
  };

  const duplicateSlide = (slideId: string) => {
    update((draft) => {
      const slide = draft.slides[slideId];
      if (!slide) return;

      const newSlideId = crypto.randomUUID();

      draft.slides[newSlideId] = {
        ...slide,
        id: newSlideId,
      };

      const elements = draft.slideElements[slideId];

      draft.slideElements[newSlideId] = [];

      elements.forEach((id) => {
        const element = draft.elements[id];

        const newId = crypto.randomUUID();

        draft.elements[newId] = {
          ...element,
          id: newId,
        };

        draft.slideElements[newSlideId].push(newId);
      });
    });
  };

  /* ------------------------------- */
  /* Elements */
  /* ------------------------------- */

  const createSlideElement = (slideId: string, element: ElementType) => {
    update((draft) => {
      if (!draft.slides[slideId]) return;

      draft.elements[element.id!] = element;

      draft.slideElements[slideId].push(element.id!);
    });
  };

  const updateSlideElement = (elementId: string, patch: Partial<ElementType>) => {
    update((draft) => {
      const element = draft.elements[elementId];
      if (!element) return;

      Object.assign(element, patch);
    });
  };

  const deleteSlideElement = (slideId: string, elementId: string) => {
    update((draft) => {
      delete draft.elements[elementId];

      const list = draft.slideElements[slideId];
      if (!list) return;

      const index = list.indexOf(elementId);
      if (index !== -1) list.splice(index, 1);
    });
  };

  const duplicateSlideElement = (slideId: string, elementId: string) => {
    update((draft) => {
      const element = draft.elements[elementId];
      if (!element) return;

      const newId = crypto.randomUUID();
      const clone = structuredClone(element);

      clone.id = newId;

      draft.elements[newId] = clone;
      draft.slideElements[slideId].push(newId);
    });
  };

  /* ------------------------------- */
  /* Reset */
  /* ------------------------------- */

  const reset = () => {
    setState(() => initialState);
  };

  return {
    state,

    createSlide,
    updateSlide,
    deleteSlide,
    duplicateSlide,

    createSlideElement,
    updateSlideElement,
    deleteSlideElement,
    duplicateSlideElement,

    reset,
  };
};

export default useEditor;
