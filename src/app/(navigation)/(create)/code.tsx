"use client";
import { useEffect } from "react";
import { highlighterAtom } from "./store";
import { useAtom } from "jotai";

import { shikiTheme } from "./store/themes";

import Frame from "./components/Frame";
import Controls from "./components/Controls";

import styles from "./code.module.css";
import NoSSR from "./components/NoSSR";

import { Highlighter, createHighlighterCore, createOnigurumaEngine } from "shiki";
import { LANGUAGES } from "./util/languages";

import tailwindLight from "./assets/tailwind/light.json";
import tailwindDark from "./assets/tailwind/dark.json";
import { cn } from "@/lib/utils";

export function Code() {
  const [highlighter, setHighlighter] = useAtom(highlighterAtom);

  useEffect(() => {
    createHighlighterCore({
      themes: [shikiTheme, tailwindLight, tailwindDark],
      langs: [LANGUAGES.javascript.src(), LANGUAGES.tsx.src(), LANGUAGES.swift.src(), LANGUAGES.python.src()],
      engine: createOnigurumaEngine(() => import("shiki/wasm")),
    }).then((highlighter) => {
      setHighlighter(highlighter as Highlighter);
    });
  }, []);

  return (
    <NoSSR>
      <div className={cn(styles.app, "layout-scroll")}>
        <Frame />
        <Controls />
      </div>
    </NoSSR>
  );
}
