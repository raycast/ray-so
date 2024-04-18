import type { NextPage } from "next";
import Head from "next/head";
import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import getWasm from "shiki/wasm";
import { highlighterAtom } from "../store";

import { darkModeAtom, shikiTheme } from "../store/themes";

import Frame from "../components/Frame";
import Controls from "../components/Controls";
import FrameContextStore from "../store/FrameContextStore";
import KeyboardShortcutsPanel from "../components/KeyboardShortcutsPanel";

import FullLogoSVG from "../assets/full-logo.svg";
import ArrowNeIcon from "../assets/icons/arrow-ne-16.svg";
import CoverPhoto from "../assets/cover-photo.png";

import styles from "../styles/Home.module.css";
import NoSSR from "../components/NoSSR";

import { Highlighter, getHighlighterCore } from "shiki";

const coverPhotoUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}${CoverPhoto.src}`;

const Home: NextPage = () => {
  const [darkMode] = useAtom(darkModeAtom);
  const [highlighter, setHighlighter] = useAtom(highlighterAtom);

  useEffect(() => {
    getHighlighterCore({
      themes: [shikiTheme],
      langs: [
        import("shiki/langs/javascript.mjs"),
        import("shiki/langs/tsx.mjs"),
        import("shiki/langs/swift.mjs"),
        import("shiki/langs/python.mjs"),
      ],
      loadWasm: getWasm,
    }).then((highlighter) => {
      setHighlighter(highlighter as Highlighter);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Head>
        <title>Create beautiful images of your code</title>
        <link rel="shortcut icon" href="/favicon.png" />
        <meta name="title" content="Create beautiful images of your code" />
        <meta
          name="description"
          content="Turn your code into beautiful images. Choose from a range of syntax colors, hide or show the background, and toggle between a dark and light window."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ray.so/" />
        <meta property="og:title" content="Ray.so - Create beautiful images of your code" />
        <meta
          property="og:description"
          content="Turn your code into beautiful images. Choose from a range of syntax colors, hide or show the background, and toggle between a dark and light window."
        />
        <meta property="og:image" content={coverPhotoUrl} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://ray.so/" />
        <meta property="twitter:title" content="Ray.so - Create beautiful images of your code" />
        <meta
          property="twitter:description"
          content="Turn your code into beautiful images. Choose from a range of syntax colors, hide or show the background, and toggle between a dark and light window."
        />
        <meta property="twitter:image" content={coverPhotoUrl} />
        <meta
          name="keywords"
          content="generate, create, convert, source, code, snippet, image, picture, share, export"
        />
      </Head>
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
    </>
  );
};

export default Home;
