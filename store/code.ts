import { atom } from "jotai";
import { Base64 } from "js-base64";
import { highlightAuto } from "highlightjs";
import { LANGUAGES, Language } from "../util/languages";

type CodeSample = {
  language: Language;
  code: string;
};

const CODE_SAMPLES: CodeSample[] = [
  {
    language: LANGUAGES.javascript,
    code: `module.exports = leftpad;

function leftpad(str, len, ch) {
  str = String(str);
  var i = -1;

  if (!ch && ch !== 0) ch = ' ';

  len = len - str.length;

  while (i++ < len) {
    str = ch + str;
  }
  return str;
}`,
  },
  {
    language: LANGUAGES.swift,
    code: `import SwiftUI

struct CircleImage: View {
  var body: some View {
    Image("turtlerock")
      .clipShape(Circle())
  }
}`,
  },
  {
    language: LANGUAGES.tsx,
    code: `import { Detail } from "@raycast/api";

export default function Command() {
  return <Detail markdown="Hello World" />;
}`,
  },
];

const detectLanguage: (input: string) => Promise<string> = async (input) => {
  return new Promise((resolve) => {
    resolve(highlightAuto(input, Object.keys(LANGUAGES)).language);
  });
};

export const autoDetectLanguageAtom = atom<boolean>((get) => {
  return get(userInputtedLanguageAtom) === null;
});

const detectedLanguageAtom = atom<Language | null>(null);
const userInputtedLanguageAtom = atom<Language | null>(null);

export const selectedLanguageAtom = atom<Language | null, Language | null>(
  (get) => {
    if (get(userInputtedLanguageAtom) === null) {
      const codeSampleValue = get(codeExampleAtom);
      if (get(userInputtedCodeAtom) === null && codeSampleValue) {
        return codeSampleValue.language;
      } else {
        return get(detectedLanguageAtom);
      }
    } else {
      return get(userInputtedLanguageAtom);
    }
  },
  (get, set, newLanguage) => {
    set(userInputtedLanguageAtom, newLanguage);
  }
);
selectedLanguageAtom.onMount = (setValue) => {
  const searchParams = new URLSearchParams(location.search);

  const searchParamsLanguage = searchParams.get("language");

  if (searchParamsLanguage && searchParamsLanguage in LANGUAGES) {
    setValue(LANGUAGES[searchParamsLanguage]);
  }
};

export const codeExampleAtom = atom<CodeSample | null>(null);
codeExampleAtom.onMount = (setAtom) => {
  setAtom(CODE_SAMPLES[Math.floor(Math.random() * CODE_SAMPLES.length)]);
};

export const userInputtedCodeAtom = atom<string | null>(null);

export const codeAtom = atom<string, string>(
  (get) => get(userInputtedCodeAtom) ?? get(codeExampleAtom)?.code ?? "",
  (get, set, newCode) => {
    set(userInputtedCodeAtom, newCode);
    detectLanguage(newCode).then((language) => {
      if (LANGUAGES[language] && get(userInputtedLanguageAtom) === null) {
        set(detectedLanguageAtom, LANGUAGES[language]);
      }
    });
  }
);

codeAtom.onMount = (setValue) => {
  const searchParams = new URLSearchParams(location.search);

  const searchParamsCode = searchParams.get("code");

  if (searchParamsCode) {
    try {
      const code = Base64.decode(searchParamsCode);
      setValue(code);
    } catch (e) {
      console.error("decoding code query parameter failed");
      console.error(e);
    }
  }
};
