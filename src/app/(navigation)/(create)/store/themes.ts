import { atom } from "jotai";
import { atomWithHash } from "jotai-location";
import { atomWithStorage } from "jotai/utils";
import { CSSProperties } from "react";
import { showLineNumbersAtom } from ".";
import { createCssVariablesTheme } from "../util/theme-css-variables";
import { Theme } from "@/typings/editor";
import { THEMES } from "../constants/themes";

export const shikiTheme = createCssVariablesTheme({
  name: "css-variables",
  variablePrefix: "--ray-",
  variableDefaults: {},
  fontStyle: true,
});

const themeAtom = atomWithHash<Theme>(
  "theme",
  (() => {
    if (typeof window !== "undefined") {
      try {
        // Check if theme is stored in localStorage
        const codeTheme = localStorage.getItem("codeTheme");
        if (codeTheme && codeTheme in THEMES) {
          return THEMES[codeTheme as keyof typeof THEMES];
        }
      } catch (error) {
        console.log("Could not get theme from localStorage", error);
      }
    }
    return THEMES.candy; // Fallback to default theme
  })(),
  {
    serialize(value) {
      return Object.keys(THEMES).find((key) => THEMES[key].name.toLowerCase() === value.name.toLowerCase()) || "";
    },
    deserialize(key) {
      if (key && key in THEMES) {
        try {
          localStorage.setItem("codeTheme", key);
        } catch (error) {
          console.log("Could not set theme in localStorage", error);
        }
        return THEMES[key as keyof typeof THEMES];
      } else {
        return THEMES.candy;
      }
    },
  },
);

const darkModeAtom = atomWithHash<boolean>("darkMode", true);

const themeDarkModeAtom = atom<boolean>((get) => {
  const theme = get(themeAtom);
  const hasLight = !!theme.syntax.light;
  const hasDark = !!theme.syntax.dark;

  // If theme only has dark mode, force dark
  if (hasDark && !hasLight) return true;

  // If theme only has light mode, force light
  if (hasLight && !hasDark) return false;

  // If theme has both, use user preference
  return get(darkModeAtom);
});

const themeCSSAtom = atom<CSSProperties>((get) => {
  const isDark = get(themeDarkModeAtom);
  const syntax = get(themeAtom).syntax;
  return (isDark ? syntax.dark : syntax.light) || syntax.light || syntax.dark || {};
});

const themeBackgroundAtom = atom<string>((get) => {
  const { from, to } = get(themeAtom).background;
  return `linear-gradient(140deg, ${from}, ${to})`;
});

const themeFontAtom = atom<string | null>((get) => get(themeAtom)?.font || "jetbrains-mono");

const themeLineNumbersAtom = atom<boolean>((get) => {
  const theme = get(themeAtom);
  if (theme.partner) {
    if (theme.lineNumbersToggleable) {
      return get(showLineNumbersAtom) ?? theme.lineNumbers ?? false;
    }
    return theme.lineNumbers || false;
  }
  return get(showLineNumbersAtom) ?? false;
});

const unlockedThemesAtom = atomWithStorage<Theme["id"][]>("unlockedThemes", []);

export {
  darkModeAtom,
  themeAtom,
  themeBackgroundAtom,
  themeCSSAtom,
  themeDarkModeAtom,
  themeFontAtom,
  themeLineNumbersAtom,
  unlockedThemesAtom,
};
