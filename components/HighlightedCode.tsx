import classNames from "classnames";
import React, { useEffect, useMemo, useState } from "react";
import { Language, LANGUAGES } from "../util/languages";

import styles from "../styles/Editor.module.css";
import { Highlighter } from "shiki";
import { loadingLanguageAtom } from "../store";
import { useAtom } from "jotai";

const languageMap: { [key: string]: () => Promise<any> } = {
  python: () => import("shiki/langs/python.mjs"),
  bash: () => import("shiki/langs/bash.mjs"),
  cpp: () => import("shiki/langs/cpp.mjs"),
  csharp: () => import("shiki/langs/csharp.mjs"),
  clojure: () => import("shiki/langs/clojure.mjs"),
  crystal: () => import("shiki/langs/crystal.mjs"),
  css: () => import("shiki/langs/css.mjs"),
  diff: () => import("shiki/langs/diff.mjs"),
  dockerfile: () => import("shiki/langs/dockerfile.mjs"),
  elm: () => import("shiki/langs/elm.mjs"),
  elixir: () => import("shiki/langs/elixir.mjs"),
  erlang: () => import("shiki/langs/erlang.mjs"),
  graphql: () => import("shiki/langs/graphql.mjs"),
  go: () => import("shiki/langs/go.mjs"),
  haskell: () => import("shiki/langs/haskell.mjs"),
  html: () => import("shiki/langs/html.mjs"),
  java: () => import("shiki/langs/java.mjs"),
  json: () => import("shiki/langs/json.mjs"),
  julia: () => import("shiki/langs/julia.mjs"),
  jsx: () => import("shiki/langs/jsx.mjs"),
  kotlin: () => import("shiki/langs/kotlin.mjs"),
  lisp: () => import("shiki/langs/lisp.mjs"),
  lua: () => import("shiki/langs/lua.mjs"),
  markdown: () => import("shiki/langs/markdown.mjs"),
  matlab: () => import("shiki/langs/matlab.mjs"),
  powershell: () => import("shiki/langs/powershell.mjs"),
  objectivec: () => import("shiki/langs/objc.mjs"),
  php: () => import("shiki/langs/php.mjs"),
  r: () => import("shiki/langs/r.mjs"),
  ruby: () => import("shiki/langs/ruby.mjs"),
  rust: () => import("shiki/langs/rust.mjs"),
  scala: () => import("shiki/langs/scala.mjs"),
  scss: () => import("shiki/langs/scss.mjs"),
  sql: () => import("shiki/langs/sql.mjs"),
  toml: () => import("shiki/langs/toml.mjs"),
  typescript: () => import("shiki/langs/typescript.mjs"),
  xml: () => import("shiki/langs/xml.mjs"),
  yaml: () => import("shiki/langs/yaml.mjs"),
};

type PropTypes = {
  selectedLanguage: Language | null;
  code: string;
  highlighter: Highlighter | null;
};

const HighlightedCode: React.FC<PropTypes> = ({ selectedLanguage, code, highlighter }) => {
  console.log("code", code);
  const [highlightedHtml, setHighlightedHtml] = useState("");
  const [isLoadingLanguage, setIsLoadingLanguage] = useAtom(loadingLanguageAtom);

  useEffect(() => {
    const generateHighlightedHtml = async () => {
      if (!highlighter || !selectedLanguage || selectedLanguage === LANGUAGES.plaintext) {
        return code.replace(/[\u00A0-\u9999<>\&]/g, (i) => `&#${i.charCodeAt(0)};`);
      }

      const loadedLanguages = highlighter.getLoadedLanguages() || [];
      const hasLoadedLanguage = loadedLanguages.includes(selectedLanguage.name.toLowerCase());

      if (!hasLoadedLanguage) {
        setIsLoadingLanguage(true);
        await highlighter.loadLanguage(languageMap[selectedLanguage.name.toLowerCase()]);
        setIsLoadingLanguage(false);
      }

      return highlighter.codeToHtml(code, {
        lang: selectedLanguage.name.toLowerCase(),
        theme: "css-variables",
      });
    };

    generateHighlightedHtml().then((newHtml) => {
      if (newHtml) {
        setHighlightedHtml(newHtml);
      }
    });
  }, [code, selectedLanguage, highlighter]);

  return (
    <pre
      className={classNames(styles.formatted, "hljs")}
      dangerouslySetInnerHTML={{
        __html: highlightedHtml,
      }}
    />
  );
};

export default HighlightedCode;
