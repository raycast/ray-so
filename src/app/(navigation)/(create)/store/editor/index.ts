import { atom } from "jotai";
import { produce } from "immer";
import deepmerge from "deepmerge";
import initialState from "./state";
import { createStorage } from "../storage";
import { atomWithStorage, selectAtom, unwrap } from "jotai/utils";
import { InitialValues } from "@/typings/editor";
import { EditorState, ElementType, SlideTypes } from "@/typings/editor";
import { Language, LANGUAGES } from "../../util/languages";
import { THEMES } from "../../constants/themes";
import { CSSProperties } from "react";

const storage = createStorage<EditorState>({
  name: "slides_store",
  version: 1,
});

/* ------------------------------- */
/* Core State */
/* ------------------------------- */

/** Persisted editor state — source of truth for all slides and elements. */
export const editorAtom = atomWithStorage("slides", initialState, storage);

/** Derived atom that returns all slides as an array. */
export const slidesAtom = unwrap(
  atom(async (get) => {
    const state = await get(editorAtom);
    return Object.values(state.slides);
  }),
  (prev) => prev ?? [],
);

/** Derived atom that returns all elements as an array. */
export const elementsAtom = atom(async (get) => {
  const state = await get(editorAtom);
  return Object.values(state.elements);
});
/** Async-resolved read-only view of the editor state. */
export const editorStateAtom = atom(async (get) => {
  const state = get(editorAtom);
  return await state;
});

/** ID of the slide currently active in the editor. */
export const currentSlideIdAtom = atom<string | null>(InitialValues.SLIDE_ID);

/** ID of the element currently selected on the active slide. */
export const currentElementIdAtom = atom<string | null>(InitialValues.ELEMENT_ID);

/** Selects a slide and auto-selects its first element. */
export const selectSlideAtom = atom(null, async (get, set, slideId: string | null) => {
  set(currentSlideIdAtom, slideId);

  if (!slideId) {
    set(currentElementIdAtom, null);
    return;
  }

  const state = await get(editorAtom);
  const firstElementId = state.slideElements[slideId]?.[0] ?? null;
  set(currentElementIdAtom, firstElementId);
});

/** Selects an element by id. */
export const selectElementAtom = atom(null, (_get, set, elementId: string | null) => {
  set(currentElementIdAtom, elementId);
});

/** Derived atom that resolves the full element object for the current selection. */
export const currentElementAtom = unwrap(
  atom(async (get) => {
    const state = await get(editorAtom);
    const elementId = await get(currentElementIdAtom);
    if (!elementId) return null;
    return state.elements?.[elementId] ?? null;
  }),
  (prev) => prev ?? null,
);

/** Derived atom for element style only. */
export const currentElementStyleAtom = atom(async (get) => {
  const element = await get(currentElementAtom);
  return element?.style ?? null;
});

/** Derived atom for element properties only. */
export const currentElementPropertiesAtom = atom(async (get) => {
  const element = await get(currentElementAtom);
  return element?.properties ?? null;
});

/* ------------------------------- */
/* Slides */
/* ------------------------------- */

/** Inserts a new slide and initialises its element list. */
export const createSlideAtom = atom(null, async (get, set, slide: SlideTypes) => {
  const prev = await get(editorAtom);
  set(
    editorAtom,
    produce(prev, (draft) => {
      draft.slides[slide.id] = slide;
      draft.slideElements[slide.id] = [];
    }),
  );
});

/** Merges a partial patch into the current slide. ID and elements are immutable. */
export const updateSlideAtom = atom(null, async (get, set, patch: Partial<Omit<SlideTypes, "id" | "elements">>) => {
  const slideId = get(currentSlideIdAtom);
  if (!slideId) return;
  const prev = await get(editorAtom);
  set(
    editorAtom,
    produce(prev, (draft) => {
      const slide = draft.slides[slideId];
      if (!slide) return;
      Object.assign(slide, patch);
    }),
  );
});

/** Deletes the current slide along with all of its child elements. */
export const deleteSlideAtom = atom(null, async (get, set) => {
  const slideId = get(currentSlideIdAtom);
  if (!slideId) return;
  const prev = await get(editorAtom);

  const nextSlideId = Object.values(prev.slides).find((slide) => slide.id !== slideId)?.id ?? null;

  set(
    editorAtom,
    produce(prev, (draft) => {
      const elementIds = draft.slideElements[slideId] || [];
      for (const id of elementIds) delete draft.elements[id];
      delete draft.slideElements[slideId];
      delete draft.slides[slideId];
    }),
  );

  set(currentSlideIdAtom, nextSlideId);
});
/** Deep-clones the current slide and all its elements, assigning new UUIDs throughout. */
export const duplicateSlideAtom = atom(null, async (get, set) => {
  const slideId = get(currentSlideIdAtom);
  if (!slideId) return;
  const prev = await get(editorAtom);
  set(
    editorAtom,
    produce(prev, (draft) => {
      const slide = draft.slides[slideId];
      if (!slide) return;

      const newSlideId = crypto.randomUUID();
      draft.slides[newSlideId] = { ...slide, id: newSlideId };
      draft.slideElements[newSlideId] = [];

      draft.slideElements[slideId].forEach((id) => {
        const newId = crypto.randomUUID();
        draft.elements[newId] = { ...draft.elements[id], id: newId };
        draft.slideElements[newSlideId].push(newId);
      });
    }),
  );
});

/* ------------------------------- */
/* Elements */
/* ------------------------------- */

/** Registers a new element and appends it to the current slide's element list. */
export const createSlideElementAtom = atom(null, async (get, set, element: ElementType) => {
  const slideId = get(currentSlideIdAtom);
  if (!slideId) return;
  const prev = await get(editorAtom);
  set(
    editorAtom,
    produce(prev, (draft) => {
      if (!draft.slides[slideId]) return;
      draft.elements[element.id!] = element;
      draft.slideElements[slideId].push(element.id!);
    }),
  );
});
const overwriteMerge = (_dest: any[], source: any[]) => source;

/** Shallow-merges a patch into the currently selected element. */
export const updateSlideElementAtom = atom(null, async (get, set, patch: Partial<ElementType>) => {
  const elementId = get(currentElementIdAtom);
  if (!elementId) return;
  const prev = await get(editorAtom);
  set(
    editorAtom,
    produce(prev, (draft) => {
      const element = draft.elements[elementId];
      if (!element) return;
      const merged = deepmerge(element, patch as ElementType, {
        arrayMerge: overwriteMerge,
      });
      Object.assign(element, merged);
    }),
  );
});

/** Removes the selected element from both the elements map and the slide's element list. */
export const deleteSlideElementAtom = atom(null, async (get, set) => {
  const slideId = get(currentSlideIdAtom);
  const elementId = get(currentElementIdAtom);
  if (!slideId || !elementId) return;
  const prev = await get(editorAtom);
  set(
    editorAtom,
    produce(prev, (draft) => {
      delete draft.elements[elementId];
      const list = draft.slideElements[slideId];
      if (!list) return;
      const index = list.indexOf(elementId);
      if (index !== -1) list.splice(index, 1);
    }),
  );
});

/** Deep-clones the selected element via structuredClone and appends it to the current slide. */
export const duplicateSlideElementAtom = atom(null, async (get, set) => {
  const slideId = get(currentSlideIdAtom);
  const elementId = get(currentElementIdAtom);
  if (!slideId || !elementId) return;
  const prev = await get(editorAtom);
  set(
    editorAtom,
    produce(prev, (draft) => {
      const element = draft.elements[elementId];
      if (!element) return;
      const newId = crypto.randomUUID();
      const clone = structuredClone(element);
      clone.id = newId;
      draft.elements[newId] = clone;
      draft.slideElements[slideId].push(newId);
    }),
  );
});

/* ------------------------------- */
/* Reset */
/* ------------------------------- */

/** Wipes all editor state and restores the initial defaults. */
export const resetEditorAtom = atom(null, (_get, set) => set(editorAtom, initialState));

/* ------------------------------- */
/* Selectors */
/* ------------------------------- */
const DEFAULT_PADDING = "16px";

export const elementContentAtom = selectAtom(currentElementAtom, (el) => el?.content as string);

export const elementPaddingAtom = selectAtom(currentElementAtom, (el) => el?.style?.padding ?? DEFAULT_PADDING);
export const elementDarkModeAtom = selectAtom(currentElementAtom, (el) => el?.properties?.darkMode ?? false);
export const elementTransparentAtom = selectAtom(currentElementAtom, (el) => el?.properties?.transparent ?? false);
export const elementShowLineNumbersAtom = selectAtom(
  currentElementAtom,
  (el) => el?.properties?.showLineNumbers ?? false,
);
export const elementFontFamilyAtom = selectAtom(currentElementAtom, (el) => el?.style?.fontFamily ?? "");
export const elementFontSizeAtom = selectAtom(currentElementAtom, (el) => el?.style?.fontSize ?? 14);
export const elementFontWeightAtom = selectAtom(currentElementAtom, (el) => el?.style?.fontWeight ?? 400);
export const elementBackgroundAtom = selectAtom(currentElementAtom, (el) => el?.style?.background ?? "");
export const elementThemeAtom = selectAtom(currentElementAtom, (el) => el?.properties?.theme ?? "");
export const elementLanguageAtom = selectAtom(currentElementAtom, (el) => el?.properties?.language ?? "");

export const elementHighlightedLinesAtom = selectAtom(
  currentElementAtom,
  (el) => (el?.properties?.highlightedLines as number[]) ?? [],
);

export const selectedLanguageAtom = atom(
  (get) => {
    const languageName = get(elementLanguageAtom);
    // if (!languageName) return get(detectedLanguageAtom);
    return Object.values(LANGUAGES).find((l) => l.name === languageName);
  },
  (_get, set, newLanguage: Language | null) => {
    set(updateSlideElementAtom, { properties: { language: newLanguage?.name } });
  },
);
export const themeAtom = selectAtom(currentElementAtom, (el) => {
  const themeId = el?.properties?.theme as string | undefined;
  return themeId && THEMES[themeId] ? THEMES[themeId] : THEMES.candy;
});

export const themeDarkModeAtom = atom<boolean>((get) => {
  const theme = get(themeAtom);
  const hasLight = !!theme.syntax.light;
  const hasDark = !!theme.syntax.dark;
  const userDarkMode = get(elementDarkModeAtom);

  // If theme only has dark mode, force dark
  if (hasDark && !hasLight) return true;

  // If theme only has light mode, force light
  if (hasLight && !hasDark) return false;

  // If theme has both, use user preference
  return userDarkMode;
});

export const themeCSSAtom = atom<CSSProperties>((get) => {
  const isDark = get(themeDarkModeAtom);
  const syntax = get(themeAtom).syntax;
  return (isDark ? syntax.dark : syntax.light) || syntax.light || syntax.dark || {};
});

export const themeBackgroundAtom = atom<string>((get) => {
  const { from, to } = get(themeAtom).background;
  return `linear-gradient(140deg, ${from}, ${to})`;
});

export const themeFontAtom = atom<string | null>((get) => get(themeAtom)?.font ?? "jetbrains-mono");

export const themeLineNumbersAtom = atom<boolean>((get) => {
  const theme = get(themeAtom);
  const showLineNumbers = get(elementShowLineNumbersAtom);

  if (theme.partner) {
    if (theme.lineNumbersToggleable) {
      return showLineNumbers ?? theme.lineNumbers ?? false;
    }
    return theme.lineNumbers ?? false;
  }

  return showLineNumbers ?? false;
});

export const elementHeaderAtom = selectAtom(currentElementAtom, (el) => el?.header ?? null);

export const elementFileNameAtom = selectAtom(currentElementAtom, (el) => el?.header?.properties?.title?.text ?? "");

export const elementFileIconAtom = selectAtom(currentElementAtom, (el) => el?.header?.properties?.title?.icon ?? "");
