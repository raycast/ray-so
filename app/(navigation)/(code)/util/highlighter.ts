import { getHighlighterCore, type Highlighter } from "shiki";
import getWasm from "shiki/wasm";
import { shikiTheme } from "../store/themes";
import { LANGUAGES } from "./languages";
import tailwindLight from "../assets/tailwind/light.json";
import tailwindDark from "../assets/tailwind/dark.json";

let highlighterPromise: Promise<Highlighter> | undefined;

export function getCodeHighlighter() {
  highlighterPromise ??= getHighlighterCore({
    themes: [shikiTheme, tailwindLight, tailwindDark],
    langs: [LANGUAGES.javascript.src(), LANGUAGES.tsx.src(), LANGUAGES.swift.src(), LANGUAGES.python.src()],
    loadWasm: getWasm,
  }).then(
    (highlighter) => highlighter as Highlighter,
    (error) => {
      highlighterPromise = undefined;
      throw error;
    },
  );

  return highlighterPromise;
}
