"use client";

import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { showBackgroundAtom, fileNameAtom, windowWidthAtom, highlighterAtom } from "@code/store";
import { darkModeAtom, shikiTheme, themeBackgroundAtom } from "@code/store/themes";

import styles from "../components/Frame.module.css";
import resizableFrameStyles from "../components/ResizableFrame.module.css";
import classNames from "classnames";
import Editor from "@code/components/Editor";
import { bundledLanguages, getHighlighter } from "shiki";
import { paddingAtom } from "@code/store/padding";
import Frame from "@code/components/Frame";
import tailwindLight from "@code/assets/tailwind/light.json";
import tailwindDark from "@code/assets/tailwind/dark.json";

const Image = () => {
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);
  const [themeBackground] = useAtom(themeBackgroundAtom);
  const [windowWidth] = useAtom(windowWidthAtom);
  const [darkMode] = useAtom(darkModeAtom);
  const [highlighter, setHighlighter] = useAtom(highlighterAtom);

  useEffect(() => {
    getHighlighter({
      themes: [shikiTheme, tailwindLight, tailwindDark],
      langs: Object.keys(bundledLanguages),
    }).then((highlighter) => {
      setHighlighter(highlighter);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if (!highlighter) {
    return null;
  }

  return (
    <div data-theme={darkMode ? "dark" : "light"}>
      <Frame resize={false} />
    </div>
  );
};

export default Image;
