import { atom } from "jotai";

export const availableLanguages: Language[] = [
  { name: "JavaScript", className: "javascript" },
  { name: "Ruby", className: "ruby" },
];

export type Language = {
  name: string;
  className: string;
}

export const selectedLanguageAtom = atom<Language | null>(null);
