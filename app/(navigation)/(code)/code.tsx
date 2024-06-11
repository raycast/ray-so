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
import ExportButton from "./components/ExportButton";
import { SpeechBubbleIcon } from "@raycast/icons";
import { Button } from "@/components/button";

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
    <>
      <FrameContextStore>
        <div className="h-[50px] flex items-center justify-end fixed top-0 right-4 gap-2">
          <Button variant="transparent" asChild>
            <a href="mailto:feedback+rayso@raycast.com">
              <SpeechBubbleIcon className="w-4 h-4" /> Send Feedback
            </a>
          </Button>
          <ExportButton />
        </div>
        <div className={styles.app}>
          {/* <KeyboardShortcutsPanel /> */}

          <NoSSR>
            {highlighter && <Frame />}
            <Controls />
          </NoSSR>
        </div>
      </FrameContextStore>
    </>
  );
}
