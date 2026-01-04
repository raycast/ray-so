import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";
import React, { useContext, useEffect, useRef, useState } from "react";

import { fileNameAtom, showBackgroundAtom, windowWidthAtom } from "../store";
import { FrameContext } from "../store/FrameContextStore";
import { paddingAtom } from "../store/padding";
import { THEMES, themeDarkModeAtom, themeAtom, themeBackgroundAtom, darkModeAtom } from "../store/themes";
import useIsSafari from "../util/useIsSafari";

import Editor from "./Editor";
import FlashMessage from "./FlashMessage";
import ResizableFrame from "./ResizableFrame";

import styles from "./Frame.module.css";
import { codeAtom, selectedLanguageAtom } from "../store/code";

import beams from "../assets/tailwind/beams.png";
import mintlifyPatternDark from "../assets/mintlify-pattern-dark.svg?url";
import mintlifyPatternLight from "../assets/mintlify-pattern-light.svg?url";
import clerkPattern from "../assets/clerk/pattern.svg?url";
import triggerPattern from "../assets/triggerdev/pattern.svg?url";
import { flashShownAtom } from "../store/flash";

const VercelFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);

  return (
    <div
      className={classNames(
        styles.frame,
        showBackground && styles.vercelFrame,
        showBackground && !darkMode && styles.vercelFrameLightMode,
        !showBackground && styles.noBackground,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      <div className={styles.vercelWindow}>
        <span className={styles.vercelGridlinesHorizontal} data-grid></span>
        <span className={styles.vercelGridlinesVertical} data-grid></span>
        <span className={styles.vercelBracketLeft} data-grid></span>
        <span className={styles.vercelBracketRight} data-grid></span>
        <Editor />
      </div>
    </div>
  );
};

const SupabaseFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);

  return (
    <div
      className={classNames(
        styles.frame,
        showBackground && styles.supabaseFrame,
        !darkMode && styles.supabaseFrameLightMode,
        !showBackground && styles.noBackground,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      <div className={styles.supabaseWindow}>
        <Editor />
      </div>
    </div>
  );
};

/**
 * SecondFrame - Clean, minimal code frame for Second brand
 *
 * Features:
 * - Header bar with editable filename and language display
 * - Ambient drop shadow (no directional offset)
 * - Light/dark mode with neutral grey palette
 * - Uses Source Code Pro font (weight 500)
 */
const SecondFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);
  const [selectedLanguage] = useAtom(selectedLanguageAtom);

  return (
    <div
      className={classNames(
        styles.frame,
        styles.secondFrame,
        darkMode && styles.secondFrameDarkMode,
        showBackground && styles.withBackground,
        !showBackground && styles.noBackground,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      <div className={styles.secondWindow}>
        <div className={styles.secondHeader}>
          <div className={classNames(styles.fileName, styles.secondFileName)} data-value={fileName}>
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
          <span className={styles.secondLanguage}>{selectedLanguage?.name}</span>
        </div>
        <Editor />
      </div>
    </div>
  );
};

const TailwindFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
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
        isSafari && styles.isSafari,
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
        <Editor />
      </div>
    </div>
  );
};

const TriggerdevFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const [themeBackground] = useAtom(themeBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const flashShown = useAtomValue(flashShownAtom);

  return (
    <div
      className={classNames(
        styles.frame,
        showBackground && styles.triggerFrame,
        !darkMode && styles.triggerFrameLightMode,
        !showBackground && styles.noBackground,
      )}
      style={{ padding, backgroundImage: showBackground && darkMode ? themeBackground : `` }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      {showBackground && (
        <>
          <div className={styles.triggerPatternTop} style={{ backgroundImage: `url(${triggerPattern.src})` }} />
          <div className={styles.triggerPatternBottom} style={{ backgroundImage: `url(${triggerPattern.src})` }} />
        </>
      )}
      <div className={styles.triggerWindow}>
        <span className={styles.triggerGridlinesHorizontal} data-grid></span>
        <span className={styles.triggerGridlinesVertical} data-grid></span>
        {fileName.length > 0 ? (
          <div className={styles.triggerHeader}>
            <div className={classNames(styles.fileName, styles.triggerFileName)} data-value={fileName}>
              <input
                type="text"
                value={fileName}
                onChange={(event) => setFileName(event.target.value)}
                spellCheck={false}
                tabIndex={-1}
                size={1}
              />
            </div>
            <span className={styles.triggerLanguage}>{selectedLanguage?.name}</span>
          </div>
        ) : flashShown ? null : (
          <div className={styles.triggerHeader} data-ignore-in-export>
            <div className={classNames(styles.fileName, styles.triggerFileName)} data-value={fileName}>
              <input
                type="text"
                value={fileName}
                onChange={(event) => setFileName(event.target.value)}
                spellCheck={false}
                tabIndex={-1}
                size={1}
              />
              <span>Untitled-1</span>
            </div>
            <span className={styles.triggerLanguage}>{selectedLanguage?.name}</span>
          </div>
        )}
        <Editor />
      </div>
    </div>
  );
};

const ClerkFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);

  return (
    <div
      className={classNames(
        styles.frame,
        showBackground && styles.clerkFrame,
        !darkMode && styles.clerkFrameLightMode,
        !showBackground && styles.noBackground,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      {showBackground && <img src={clerkPattern.src} alt="" className={styles.clerkPattern} />}
      <div className={styles.clerkWindow}>
        <div className={styles.clerkCode}>
          <Editor />
        </div>
      </div>
    </div>
  );
};

const MintlifyFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);

  return (
    <div
      className={classNames(
        styles.frame,
        showBackground && styles.mintlifyFrame,
        !darkMode && styles.mintlifyFrameLightMode,
        !showBackground && styles.noBackground,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      {showBackground && (
        <span className={styles.mintlifyPatternWrapper}>
          <img
            src={darkMode ? mintlifyPatternDark.src : mintlifyPatternLight.src}
            alt=""
            className={styles.mintlifyPattern}
          />
        </span>
      )}
      <div className={styles.mintlifyWindow}>
        <div className={styles.mintlifyHeader}>
          <div className={classNames(styles.fileName, styles.mintlifyFileName)} data-value={fileName}>
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
        </div>
        <Editor />
      </div>
    </div>
  );
};

const PrismaFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);
  const flashShown = useAtomValue(flashShownAtom);

  return (
    <div
      className={classNames(
        styles.frame,
        styles.prismaFrame,
        !darkMode && styles.prismaFrameLightMode,
        !showBackground && styles.noBackground,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      <div className={styles.prismaWindow}>
        <span data-frameborder />
        <span data-frameborder />
        <span data-frameborder />
        <span data-frameborder />
        {fileName.length > 0 ? (
          <div className={styles.prismaHeader}>
            <div className={classNames(styles.fileName, styles.prismaFileName)} data-value={fileName}>
              <input
                type="text"
                value={fileName}
                onChange={(event) => setFileName(event.target.value)}
                spellCheck={false}
                tabIndex={-1}
                size={1}
              />
            </div>
          </div>
        ) : flashShown ? null : (
          <div className={styles.prismaHeader} data-ignore-in-export>
            <div className={classNames(styles.fileName, styles.prismaFileName)} data-value={fileName}>
              <input
                type="text"
                value={fileName}
                onChange={(event) => setFileName(event.target.value)}
                spellCheck={false}
                tabIndex={-1}
                size={1}
              />
              <span>Untitled-1</span>
            </div>
          </div>
        )}
        <Editor />
      </div>
    </div>
  );
};

const OpenAIFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  return (
    <div
      className={classNames(
        styles.openAIFrame,
        !darkMode && styles.openAIFrameLightMode,
        !showBackground && styles.noBackground,
      )}
      style={{ padding, "--padding": `${padding}px` } as React.CSSProperties}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      <div className={styles.openAIWindow}>
        <Editor />
      </div>
    </div>
  );
};

const ElevenLabsFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const padding = useAtomValue(paddingAtom);
  const showBackground = useAtomValue(showBackgroundAtom);
  const windowWidth = useAtomValue(windowWidthAtom);
  const code = useAtomValue(codeAtom);

  const windowRef = useRef<HTMLDivElement>(null);
  const [circleDiameter, setCircleDiameter] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const numberOfLines = Math.max(1, (code.match(/\n/g) || []).length + 1);

  useEffect(() => {
    const updateCircleSize = () => {
      if (windowRef.current) {
        const boxWidth = windowRef.current.offsetWidth;
        const boxHeight = windowRef.current.offsetHeight;
        const diagonal = Math.sqrt(Math.pow(boxWidth, 2) + Math.pow(boxHeight, 2));
        setCircleDiameter(diagonal);
      }
    };

    updateCircleSize();

    const timeoutId = setTimeout(updateCircleSize, 0);

    window.addEventListener("resize", updateCircleSize);
    return () => {
      window.removeEventListener("resize", updateCircleSize);
      clearTimeout(timeoutId);
    };
  }, [windowWidth, numberOfLines, padding, isTransitioning]);

  // Handle re-trigger when padding has finished changing
  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 200);
    return () => clearTimeout(timer);
  }, [padding]);

  return (
    <div
      className={classNames(
        styles.frame,
        showBackground && styles.elevenLabsFrame,
        showBackground && !darkMode && styles.elevenLabsFrameLightMode,
        !showBackground && styles.noBackground,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      <div className={styles.elevenLabsWindow} ref={windowRef}>
        <span
          className={classNames(styles.elevenLabsCircle, isTransitioning && styles.isTransitioning)}
          style={{
            width: `${circleDiameter}px`,
            height: `${circleDiameter}px`,
          }}
        ></span>

        <span className={styles.elevenLabsGridlineHorizontalTop} data-grid></span>
        <span className={styles.elevenLabsGridlineHorizontalCenter} data-grid></span>
        <span className={styles.elevenLabsGridlineHorizontalBottom} data-grid></span>

        <span className={styles.elevenLabsGridlineVerticalLeft} data-grid></span>
        <span className={styles.elevenLabsGridlineVerticalCenter} data-grid></span>
        <span className={styles.elevenLabsGridlineVerticalRight} data-grid></span>

        <span className={styles.elevenLabsDotTopLeft} data-dot></span>
        <span className={styles.elevenLabsDotTopRight} data-dot></span>
        <span className={styles.elevenLabsDotBottomLeft} data-dot></span>
        <span className={styles.elevenLabsDotBottomRight} data-dot></span>

        <span className={styles.elevenLabsGridlineCornerTopLeft} data-grid></span>
        <span className={styles.elevenLabsGridlineCornerTopRight} data-grid></span>
        <span className={styles.elevenLabsGridlineCornerBottomRight} data-grid></span>
        <span className={styles.elevenLabsGridlineCornerBottomLeft} data-grid></span>

        <div className={styles.elevenLabsEditor}>
          <Editor />
        </div>
      </div>
    </div>
  );
};

const ResendFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);
  const [selectedLanguage, setSelectedLanguage] = useAtom(selectedLanguageAtom);

  return (
    <div
      className={classNames(
        styles.frame,
        styles.resend,
        darkMode && styles.darkMode,
        showBackground && styles.withBackground,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      <div className={styles.resendWindow}>
        <div className={styles.resendHeader}>
          <div className={classNames(styles.fileName, styles.resendFileName)} data-value={fileName}>
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
          <span className={styles.resendLanguage}>{selectedLanguage?.name}</span>
        </div>
        <Editor />
      </div>
    </div>
  );
};

const NuxtFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);

  return (
    <div
      className={classNames(
        styles.frame,
        styles.nuxtFrame,
        !darkMode && styles.nuxtFrameLightMode,
        !showBackground && styles.noBackground,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      <img src="/stars.svg" alt="stars" className={styles.nuxtStars} />
      <div className={styles.nuxtWindow}>
        <span data-frameborder />
        <span data-frameborder />
        <span data-frameborder />
        <Editor />
      </div>
    </div>
  );
};

const GeminiFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);
  const isSafari = useIsSafari();
  const flashShown = useAtomValue(flashShownAtom);
  return (
    <div
      className={classNames(
        styles.frame,
        styles.geminiFrame,
        !darkMode && styles.geminiFrameLightMode,
        !showBackground && styles.noBackground,
        isSafari && styles.isSafari,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      {showBackground && <img src="/stars.svg" alt="stars" className={styles.geminiStars} />}
      <div className={styles.geminiWindow}>
        {fileName.length > 0 ? (
          <div className={styles.geminiHeader}>
            <div className={classNames(styles.fileName, styles.geminiFileName)} data-value={fileName}>
              <input
                type="text"
                value={fileName}
                onChange={(event) => setFileName(event.target.value)}
                spellCheck={false}
                tabIndex={-1}
                size={1}
              />
            </div>
          </div>
        ) : flashShown ? null : (
          <div className={styles.geminiHeader} data-ignore-in-export>
            <div className={classNames(styles.fileName, styles.geminiFileName)} data-value={fileName}>
              <input
                type="text"
                value={fileName}
                onChange={(event) => setFileName(event.target.value)}
                spellCheck={false}
                tabIndex={-1}
                size={1}
              />
              <span>Untitled-1</span>
            </div>
          </div>
        )}

        {/* <div className={styles.header}>
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
        </div> */}
        <div className={styles.geminiEditor}>
          <Editor />
        </div>
      </div>
    </div>
  );
};

const BrowserbaseFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);

  return (
    <div
      className={classNames(
        styles.frame,
        showBackground && styles.browserbaseFrame,
        !darkMode && styles.browserbaseFrameLightMode,
        !showBackground && styles.noBackground,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      {showBackground && (
        <div className={styles.browserbaseBackground}>
          <div className={styles.browserbaseBackgroundGridline}></div>
          <div className={styles.browserbaseBackgroundGridline}></div>
          <div className={styles.browserbaseBackgroundGridline}></div>
          <div className={styles.browserbaseBackgroundGridline}></div>
          <div className={styles.browserbaseBackgroundGridline}></div>
          <div className={styles.browserbaseBackgroundGridline}></div>
          <div className={styles.browserbaseBackgroundGridline}></div>
        </div>
      )}
      <div className={styles.browserbaseWindow}>
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
          <div />
        </div>
        <Editor />
      </div>
      <div className={styles.browserbaseOutline} style={{ "--padding": `${padding}px` } as React.CSSProperties}></div>
    </div>
  );
};

const WrappedFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);

  return (
    <div
      className={classNames(
        styles.frame,
        showBackground && styles.wrappedFrame,
        !darkMode && styles.wrappedFrameLightMode,
        !showBackground && styles.noBackground,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      {showBackground && (
        <>
          <span className={styles.wrappedBottomGlow}></span>
          <span className={styles.wrappedBorder}></span>
          <span className={styles.wrappedFade}></span>
          <span className={styles.wrappedGlowLeft}></span>
          <span className={styles.wrappedGlowRight}></span>
          <span className={styles.wrappedGlowBottom}></span>
        </>
      )}
      <div className={styles.wrappedWindow}>
        <Editor />
      </div>
    </div>
  );
};

const CloudflareFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const flashShown = useAtomValue(flashShownAtom);

  return (
    <div
      className={classNames(
        styles.frame,
        showBackground && styles.cloudflareFrame,
        !darkMode && styles.cloudflareFrameLightMode,
        !showBackground && styles.noBackground,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      <div className={styles.cloudflareWindow}>
        <span className={styles.cloudflareGridlinesHorizontal} data-grid></span>
        <span className={styles.cloudflareGridlinesVertical} data-grid></span>
        {fileName.length > 0 ? (
          <div className={styles.cloudflareHeader}>
            <div className={classNames(styles.fileName, styles.cloudflareFileName)} data-value={fileName}>
              <input
                type="text"
                value={fileName}
                onChange={(event) => setFileName(event.target.value)}
                spellCheck={false}
                tabIndex={-1}
                size={1}
              />
            </div>
            <span className={styles.cloudflareLanguage}>{selectedLanguage?.name}</span>
          </div>
        ) : flashShown ? null : (
          <div className={styles.cloudflareHeader} data-ignore-in-export>
            <div className={classNames(styles.fileName, styles.cloudflareFileName)} data-value={fileName}>
              <input
                type="text"
                value={fileName}
                onChange={(event) => setFileName(event.target.value)}
                spellCheck={false}
                tabIndex={-1}
                size={1}
              />
              <span>Untitled-1</span>
            </div>
            <span className={styles.cloudflareLanguage}>{selectedLanguage?.name}</span>
          </div>
        )}
        <Editor />
      </div>
    </div>
  );
};

const StripeFrame = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const code = useAtomValue(codeAtom);
  const windowWidth = useAtomValue(windowWidthAtom);
  const isSafari = useIsSafari();

  const windowRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [innerWindowWidth, setInnerWindowWidth] = useState(0);
  const [frameHeight, setFrameHeight] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const numberOfLines = Math.max(1, (code.match(/\n/g) || []).length + 1);

  useEffect(() => {
    const updateDimensions = () => {
      if (windowRef.current) {
        setInnerWindowWidth(windowRef.current.offsetWidth);
      }
      if (frameRef.current) {
        setFrameHeight(frameRef.current.offsetHeight);
      }
    };

    updateDimensions();

    const timeoutId = setTimeout(updateDimensions, 0);

    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(timeoutId);
    };
  }, [windowWidth, numberOfLines, padding, isTransitioning]);

  // Handle re-trigger when padding has finished changing
  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 200);
    return () => clearTimeout(timer);
  }, [padding]);

  return (
    <div
      className={classNames(
        styles.frame,
        showBackground && styles.stripeFrame,
        !darkMode && styles.stripeFrameLightMode,
        !showBackground && styles.noBackground,
      )}
      style={{ padding }}
      ref={frameRef}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      {showBackground && (
        <div className={styles.stripeBackground}>
          <div
            className={styles.stripeBackgroundGridlineContainer}
            style={{ "--window-width": `${innerWindowWidth}px` } as React.CSSProperties}
          >
            <div className={styles.stripeBackgroundGridline}></div>
            <div className={styles.stripeBackgroundGridline}></div>
            <div className={styles.stripeBackgroundGridline}></div>
            <div className={styles.stripeBackgroundGridline}></div>
            <div className={styles.stripeBackgroundGridline}></div>
          </div>

          <div className={classNames(styles.stripeStripe)}>
            <div
              className={styles.stripeBackgroundGridlineContainer}
              style={{ "--window-width": `${innerWindowWidth}px` } as React.CSSProperties}
            >
              <div className={styles.stripeBackgroundGridline}></div>
              <div className={styles.stripeBackgroundGridline}></div>
              <div className={styles.stripeBackgroundGridline}></div>
              <div className={styles.stripeBackgroundGridline}></div>
              <div className={styles.stripeBackgroundGridline}></div>

              <div className={classNames(styles.stripeSet, frameHeight < 240 && styles.isSmall)}>
                <div className={styles.stripe1} />
                <div className={styles.stripe2} />
                <div className={styles.intersection} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={classNames(styles.stripeWindow, isSafari && styles.isSafari)} ref={windowRef}>
        <Editor />
      </div>
    </div>
  );
};

const DefaultFrame = () => {
  const [padding] = useAtom(paddingAtom);
  const isSafari = useIsSafari();
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);
  const [themeBackground] = useAtom(themeBackgroundAtom);
  const [theme] = useAtom(themeAtom);
  const darkMode = useAtomValue(themeDarkModeAtom);

  return (
    <div
      className={classNames(
        styles.frame,
        styles[theme.id],
        darkMode && styles.darkMode,
        showBackground && styles.withBackground,
      )}
      style={{
        padding,
        backgroundImage: showBackground ? themeBackground : ``,
      }}
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
        <Editor />
      </div>
    </div>
  );
};

const Frame = ({ resize = true }: { resize?: boolean }) => {
  const frameContext = useContext(FrameContext);
  const [theme] = useAtom(themeAtom);
  const darkMode = useAtomValue(themeDarkModeAtom);

  function renderFrame() {
    switch (theme.id) {
      case THEMES.vercel.id:
      case THEMES.rabbit.id:
        return <VercelFrame />;
      case THEMES.supabase.id:
        return <SupabaseFrame />;
      case THEMES.second.id:
        return <SecondFrame />;
      case THEMES.tailwind.id:
        return <TailwindFrame />;
      case THEMES.clerk.id:
        return <ClerkFrame />;
      case THEMES.mintlify.id:
        return <MintlifyFrame />;
      case THEMES.openai.id:
        return <OpenAIFrame />;
      case THEMES.triggerdev.id:
        return <TriggerdevFrame />;
      case THEMES.prisma.id:
        return <PrismaFrame />;
      case THEMES.elevenlabs.id:
        return <ElevenLabsFrame />;
      case THEMES.resend.id:
        return <ResendFrame />;
      case THEMES.browserbase.id:
        return <BrowserbaseFrame />;
      case THEMES.nuxt.id:
        return <NuxtFrame />;
      case THEMES.gemini.id:
        return <GeminiFrame />;
      case THEMES.wrapped.id:
        return <WrappedFrame />;
      case THEMES.cloudflare.id:
        return <CloudflareFrame />;
      case THEMES.stripe.id:
        return <StripeFrame />;
      default:
        return <DefaultFrame />;
    }
  }

  if (!resize) {
    return (
      <div className={styles.frameContainer}>
        <div className={styles.outerFrame} ref={frameContext} id="frame">
          {renderFrame()}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.frameContainer} data-theme={darkMode ? "dark" : "light"}>
      <ResizableFrame>
        <FlashMessage />
        <div className={styles.outerFrame} ref={frameContext} id="frame">
          {renderFrame()}
        </div>
      </ResizableFrame>
    </div>
  );
};

export default Frame;
