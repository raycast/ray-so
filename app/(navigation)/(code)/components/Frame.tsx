import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";
import React, { useContext } from "react";

import { fileNameAtom, showBackgroundAtom } from "../store";
import { FrameContext } from "../store/FrameContextStore";
import { paddingAtom } from "../store/padding";
import { THEMES, Theme, darkModeAtom, themeAtom, themeBackgroundAtom } from "../store/themes";
import useIsSafari from "../util/useIsSafari";

import Editor from "./Editor";
import FlashMessage from "./FlashMessage";
import ResizableFrame from "./ResizableFrame";

import styles from "./Frame.module.css";
import { selectedLanguageAtom } from "../store/code";
import Image from "next/image";

import beams from "../assets/tailwind/beams.png";
import beamsLight from "../assets/tailwind/beams-light.jpg";
import beamsDark from "../assets/tailwind/beams-dark.jpg";

const VercelFrame = ({ theme }: { theme?: Theme }) => {
  const [darkMode] = useAtom(darkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);

  return (
    <div
      className={classNames(
        styles.frame,
        showBackground && styles.vercelFrame,
        showBackground && !darkMode && styles.vercelFrameLightMode,
        !showBackground && styles.noBackground
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      <div className={styles.vercelWindow}>
        <span className={styles.vercelGridlinesHorizontal} data-grid></span>
        <span className={styles.vercelGridlinesVertical} data-grid></span>
        <span className={styles.vercelBracketLeft} data-grid></span>
        <span className={styles.vercelBracketRight} data-grid></span>
        <Editor theme={theme} />
      </div>
    </div>
  );
};

const SupabaseFrame = () => {
  const [darkMode] = useAtom(darkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);
  const [selectedLanguage, setSelectedLanguage] = useAtom(selectedLanguageAtom);

  return (
    <div
      className={classNames(
        styles.frame,
        showBackground && styles.supabaseFrame,
        !darkMode && styles.supabaseFrameLightMode,
        !showBackground && styles.noBackground
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      <div className={styles.supabaseWindow}>
        <div className={styles.supabaseHeader}>
          <div className={classNames(styles.fileName, styles.supabaseFileName)} data-value={fileName}>
            <input
              type="text"
              value={fileName}
              onChange={(event) => setFileName(event.target.value)}
              spellCheck={false}
              tabIndex={-1}
              size={1}
            />
            {fileName.length === 0 ? <span>Untitled-1</span> : null}
          </div>
          <span className={styles.supabaseLanguage}>{selectedLanguage?.name}</span>
        </div>
        <Editor theme={THEMES["supabase"]} />
      </div>
    </div>
  );
};

const TailwindFrame = () => {
  const [darkMode] = useAtom(darkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);
  const isSafari = useIsSafari();

  return (
    <div
      className={classNames(
        styles.frame,
        showBackground && styles.tailwindFrame,
        !darkMode && styles.tailwindFrameLightMode,
        !showBackground && styles.noBackground,
        isSafari && styles.isSafari
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      {showBackground && <img src={beams.src} alt="beams" className={styles.tailwindBeams} />}
      <div className={styles.beams} />
      <div className={styles.tailwindWindow}>
        {showBackground && (
          <>
            <span className={styles.tailwindGridlinesHorizontal} data-grid></span>
            <span className={styles.tailwindGridlinesVertical} data-grid></span>
            <div className={styles.tailwindGradient}>
              <div>
                <div className={styles.tailwindGradient1}></div>
                <div className={styles.tailwindGradient2}></div>
              </div>
            </div>
          </>
        )}
        <div className={styles.tailwindHeader}>
          <div className={styles.controls}>
            <div className={styles.control}></div>
            <div className={styles.control}></div>
            <div className={styles.control}></div>
          </div>
        </div>
        <Editor theme={THEMES["tailwind"]} />
      </div>
    </div>
  );
};

const DefaultFrame = ({ theme: forcedTheme }: { theme?: Theme }) => {
  const [padding] = useAtom(paddingAtom);
  const isSafari = useIsSafari();
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);
  const [selectedTheme] = useAtom(themeAtom);
  const theme = forcedTheme || selectedTheme;
  const themeBackground = `linear-gradient(140deg, ${theme.background.from}, ${theme.background.to})`;
  const darkMode = useAtomValue(darkModeAtom);

  return (
    <div
      className={classNames(
        styles.frame,
        styles[theme.id],
        darkMode && styles.darkMode,
        showBackground && styles.withBackground
      )}
      style={{ padding, backgroundImage: showBackground ? themeBackground : `` }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      <div
        className={classNames(styles.window, {
          [styles.withBorder]: !isSafari,
          [styles.withShadow]: !isSafari && showBackground,
        })}
      >
        <div className={styles.header}>
          <div className={styles.controls}>
            <div className={styles.control}></div>
            <div className={styles.control}></div>
            <div className={styles.control}></div>
          </div>
          <div className={styles.fileName}>
            <input
              type="text"
              value={fileName}
              onChange={(event) => setFileName(event.target.value)}
              spellCheck={false}
              tabIndex={-1}
            />
            {fileName.length === 0 ? <span data-ignore-in-export>Untitled-1</span> : null}
          </div>
        </div>
        <Editor theme={theme} />
      </div>
    </div>
  );
};

const Frame = ({ resize = true, theme: forcedTheme }: { resize?: boolean; theme?: Theme }) => {
  const frameContext = useContext(FrameContext);
  const [selectedTheme] = useAtom(themeAtom);
  const theme = forcedTheme || selectedTheme;
  const darkMode = useAtomValue(darkModeAtom);

  if (!resize) {
    return (
      <div className={styles.frameContainer}>
        <div className={styles.outerFrame} ref={frameContext} id="frame">
          {[THEMES.vercel.id, THEMES.rabbit.id].includes(theme.id) ? (
            <VercelFrame theme={theme} />
          ) : THEMES.supabase.id === theme.id ? (
            <SupabaseFrame />
          ) : THEMES.tailwind.id === theme.id ? (
            <TailwindFrame />
          ) : (
            <DefaultFrame theme={theme} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.frameContainer} data-theme={darkMode ? "dark" : "light"}>
      <ResizableFrame>
        <FlashMessage />
        <div className={styles.outerFrame} ref={frameContext} id="frame">
          {[THEMES.vercel.id, THEMES.rabbit.id].includes(theme.id) ? (
            <VercelFrame theme={theme} />
          ) : THEMES.supabase.id === theme.id ? (
            <SupabaseFrame />
          ) : THEMES.tailwind.id === theme.id ? (
            <TailwindFrame />
          ) : (
            <DefaultFrame theme={theme} />
          )}
        </div>
      </ResizableFrame>
    </div>
  );
};

export default Frame;
