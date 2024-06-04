"use client";
import { useEffect } from "react";
import getWasm from "shiki/wasm";
import { highlighterAtom } from "./store";
import { useAtom } from "jotai";

import { darkModeAtom, shikiTheme } from "./store/themes";

import Frame from "./components/Frame";
import Controls from "./components/Controls";
import FrameContextStore from "./store/FrameContextStore";
import KeyboardShortcutsPanel from "./components/KeyboardShortcutsPanel";

import FullLogoSVG from "./assets/full-logo.svg";
import ArrowNeIcon from "./assets/icons/arrow-ne-16.svg";

import styles from "./code.module.css";
import NoSSR from "./components/NoSSR";

import { Highlighter, getHighlighterCore } from "shiki";
import { LANGUAGES } from "./util/languages";

import tailwindLight from "./assets/tailwind/light.json";
import tailwindDark from "./assets/tailwind/dark.json";

export function Code() {
  const [darkMode] = useAtom(darkModeAtom);
  const [highlighter, setHighlighter] = useAtom(highlighterAtom);

  useEffect(() => {
    getHighlighterCore({
      themes: [shikiTheme, tailwindLight, tailwindDark],
      langs: [LANGUAGES.javascript.src(), LANGUAGES.tsx.src(), LANGUAGES.swift.src(), LANGUAGES.python.src()],
      loadWasm: getWasm,
    }).then((highlighter) => {
      setHighlighter(highlighter as Highlighter);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div data-theme={darkMode ? "dark" : "light"} className={styles.app}>
      <KeyboardShortcutsPanel />

      <NoSSR>
        <FrameContextStore>
          {highlighter && <Frame />}
          <Controls />
        </FrameContextStore>
      </NoSSR>

      <div className={styles.footer}>
        <a href="mailto:feedback+rayso@raycast.com" className={styles.footerLink}>
          Send Feedback
          <ArrowNeIcon />
        </a>
        <span className={styles.madeBy}>
          Made by{" "}
          <a href="https://www.raycast.com" target="_blank" rel="noreferrer" className={styles.logoLink}>
            <FullLogoSVG />
          </a>
        </span>
        <a href="https://www.raycast.com/garrett/ray-so" target="_blank" className={styles.footerLink} rel="noreferrer">
          Get Raycast Extension
          <ArrowNeIcon />
        </a>
      </div>
    </div>
  );
}
