import { atom } from "jotai";
import initialState from "./state";
import { createStorage } from "../storage";
import { atomWithStorage } from "jotai/utils";
import { EditorState } from "@/typings/editor";
import { InitialValues } from "@/typings/editor";

const storage = createStorage<EditorState>({
  name: "slides_store",
  version: 1,
});

export const editorAtom = atomWithStorage("slides", initialState, storage);

export const editorStateAtom = atom(async (get) => {
  const state = get(editorAtom);
  return await state;
});

export const currentSlideIdAtom = atom<string | null>(InitialValues.SLIDE_ID);

export const currentElementIdAtom = atom<string | null>(InitialValues.ELEMENT_ID);
