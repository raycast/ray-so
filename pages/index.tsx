import type { NextPage } from "next";
import Frame from "../components/Frame";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Controls from "../components/Controls";
import FrameContextStore from "../store/FrameContextStore";
import { useAtom } from "jotai";
import { darkModeAtom } from "../store/themes";
import KeyboardShortcutsPanel from "../components/KeyboardShortcutsPanel";

const Home: NextPage = () => {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  useEffect(() => {
    const defaultDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(defaultDark);
  }, [setDarkMode]);

  return (
    <div className={styles.app} data-theme={darkMode ? "dark" : "light"}>
      <KeyboardShortcutsPanel />

      <FrameContextStore>
        <Frame />
        <Controls />
      </FrameContextStore>
    </div>
  );
};

export default Home;
