import type { NextPage } from "next";
import { useAtom } from "jotai";

import Frame from "../components/Frame";
import Controls from "../components/Controls";
import FrameContextStore from "../store/FrameContextStore";
import { darkModeAtom } from "../store/themes";
import KeyboardShortcutsPanel from "../components/KeyboardShortcutsPanel";

import FullLogoSVG from "assets/full-logo.svg";
import ArrowNeIcon from "assets/icons/arrow-ne-16.svg";

import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [darkMode] = useAtom(darkModeAtom);

  return (
    <div className={styles.app} data-theme={darkMode ? "dark" : "light"}>
      <KeyboardShortcutsPanel />

      <FrameContextStore>
        <Frame />
        <Controls />
      </FrameContextStore>

      <div className={styles.footer}>
        <a
          href="mailto:feedback+rayso@raycast.com"
          className={styles.footerLink}
        >
          Send Feedback
          <ArrowNeIcon />
        </a>
        <span className={styles.madeBy}>
          Made by{" "}
          <a
            href="https://www.raycast.com"
            target="_blank"
            rel="noreferrer"
            className={styles.logoLink}
          >
            <FullLogoSVG />
          </a>
        </span>
        <a
          href="https://www.raycast.com/garrett/ray-so"
          target="_blank"
          className={styles.footerLink}
          rel="noreferrer"
        >
          Get Raycast Extension
          <ArrowNeIcon />
        </a>
      </div>
    </div>
  );
};

export default Home;
