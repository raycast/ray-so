"use client";
import { useEffect } from "react";
import getWasm from "shiki/wasm";
import { highlighterAtom } from "./store";
import { useAtom } from "jotai";

import { shikiTheme } from "./store/themes";

import Frame from "./components/Frame";
import Controls from "./components/Controls";
import FrameContextStore from "./store/FrameContextStore";
import KeyboardShortcutsPanel from "./components/KeyboardShortcutsPanel";

import styles from "./code.module.css";
import NoSSR from "./components/NoSSR";

import { Highlighter, getHighlighterCore } from "shiki";
import { LANGUAGES } from "./util/languages";

import tailwindLight from "./assets/tailwind/light.json";
import tailwindDark from "./assets/tailwind/dark.json";
import ExportButton from "./components/ExportButton";
import { SpeechBubbleIcon } from "@raycast/icons";
import { Button } from "@/components/button";
import { NavigationActions } from "@/components/navigation";

export function Code() {
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
        <NavigationActions>
          <div className="hidden md:flex gap-2">
            <Button variant="transparent" asChild>
              <a href="mailto:feedback+rayso@raycast.com">
                <SpeechBubbleIcon className="w-4 h-4" /> Send Feedback
              </a>
            </Button>
            <KeyboardShortcutsPanel />
          </div>
          <ExportButton />
        </NavigationActions>
        <div className={styles.app}>
          <NoSSR>
            {highlighter && <Frame />}
            <Controls />
          </NoSSR>
        </div>
      </FrameContextStore>
    </>
  );
}
