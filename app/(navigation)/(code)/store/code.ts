import { atom } from "jotai";
import { Base64 } from "js-base64";
import hljs from "highlight.js";
import { atomWithHash } from "jotai-location";
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
    const highlightResult = hljs.highlightAuto(input, Object.keys(LANGUAGES));

    if (highlightResult.language) {
      resolve(highlightResult.language);
    } else {
      resolve(LANGUAGES.plaintext.className);
    }
  });
};

export const autoDetectLanguageAtom = atom<boolean>((get) => {
  return get(userInputtedLanguageAtom) === null;
});

const detectedLanguageAtom = atom<Language | null>(null);
const userInputtedLanguageAtom = atomWithHash<Language | null>("language", null, {
  serialize(language) {
    const key = Object.keys(LANGUAGES).find((key) => LANGUAGES[key] === language);

    if (key) {
      return key;
    } else {
      return "";
    }
  },
  deserialize(key) {
    if (key && LANGUAGES[key]) {
      return LANGUAGES[key];
    } else {
      return null;
    }
  },
});

export const selectedLanguageAtom = atom(
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
  (get, set, newLanguage: Language | null) => {
    set(userInputtedLanguageAtom, newLanguage);
  }
);

export const codeExampleAtom = atom<CodeSample | null>(CODE_SAMPLES[Math.floor(Math.random() * CODE_SAMPLES.length)]);

export const isCodeExampleAtom = atom<boolean>(
  (get) => !!CODE_SAMPLES.find((codeSample) => codeSample.code === get(codeAtom))
);

const isSSR = () => typeof window === "undefined";

function getUserInputtedCodeFromHash() {
  const searchParams = new URLSearchParams(location.hash.slice(1));
  const searchParamsCode = searchParams.get("code");

  if (typeof searchParamsCode === "string") {
    try {
      const code = Base64.decode(searchParamsCode);
      return code;
    } catch (e) {
      console.error("decoding code query parameter failed");
      console.error(e);
    }
  }

  return null;
}

function getInitialUserInputtedCode() {
  if (isSSR()) {
    return null;
  } else {
    return getUserInputtedCodeFromHash();
  }
}

export const userInputtedCodeAtom = atom<string | null>(getInitialUserInputtedCode());

export const codeAtom = atom(
  (get) => get(userInputtedCodeAtom) ?? get(codeExampleAtom)?.code ?? "",
  (get, set, newCode: string) => {
    const searchParams = new URLSearchParams(location.hash.slice(1));
    set(userInputtedCodeAtom, newCode);

    searchParams.set("code", Base64.encodeURI(newCode));
    window.location.hash = `#${searchParams.toString()}`;

    detectLanguage(newCode).then((language) => {
      if (LANGUAGES[language]) {
        set(detectedLanguageAtom, LANGUAGES[language]);
      }
    });
  }
);

codeAtom.onMount = (setValue) => {
  const code = getUserInputtedCodeFromHash();

  if (code) setValue(code);
};
