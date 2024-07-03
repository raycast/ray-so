import React, { useEffect, useState } from "react";

import styles from "./Controls.module.css";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { activeControlAtom, showBackgroundAtom } from "../store";
import { cn } from "@/utils/cn";
import { AnimatePresence, easeOut, motion } from "framer-motion";
import { THEMES, Theme, darkModeAtom, themeAtom, themeCSSAtom } from "../store/themes";
import {
  BrandBashIcon,
  BrandClojureIcon,
  BrandCplusplusIcon,
  BrandCsharpIcon,
  BrandCss3Icon,
  BrandDockerIcon,
  BrandGoIcon,
  BrandHtml5Icon,
  BrandJavaIcon,
  BrandJavascriptIcon,
  BrandKotlinIcon,
  BrandLatexIcon,
  BrandMarkdownIcon,
  BrandMatlabIcon,
  BrandMysqlIcon,
  BrandObjcIcon,
  BrandPhpIcon,
  BrandPythonIcon,
  BrandRIcon,
  BrandRubyIcon,
  BrandRustIcon,
  BrandScalaIcon,
  BrandSvelteIcon,
  BrandSwiftIcon,
  BrandTypescriptIcon,
  BrandVuejsIcon,
  MaximizeIcon,
  MoonIcon,
  SunIcon,
} from "@raycast/icons";
import { paddingAtom } from "../store/padding";
import { selectedLanguageAtom } from "../store/code";
import { LANGUAGES } from "../util/languages";
import { FONTS, fontAtom } from "../store/font";
import { Input } from "@/components/input";
import useHotkeys from "@/utils/useHotkeys";
import Frame from "./Frame";

const LanguageControl: React.FC = () => {
  const setActiveControl = useSetAtom(activeControlAtom);
  const setLanguage = useSetAtom(selectedLanguageAtom);
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const searchRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveControl(null);
      }
      if (e.key === "ArrowDown") {
        console.log("yp");
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % options.length);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + options.length) % options.length);
      }
      if (e.key === "Enter") {
        console.log("enter");
        e.preventDefault();
        e.stopPropagation();
        setLanguage(LANGUAGES[options[activeIndex].id]);
        setActiveControl(null);
      }
    };
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [activeIndex]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setActiveIndex(0);
  };

  const options = Object.values(LANGUAGES).map((language) => ({
    id: Object.keys(LANGUAGES).find((key) => LANGUAGES[key] === language) as string,
    name: language.name,
  }));

  const filteredOptions = options.filter((o) => o.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <AnimatePresence>
      <motion.div
        layout
        className="flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="w-[483px] h-[350px] flex flex-col pt-4 justify-start">
          <div className="flex flex-wrap overflow-auto -mx-2 pb-5 -mt-3 flex-1 px-4 items-start">
            {filteredOptions.map((option, index) => (
              <button
                key={option.id}
                onClick={() => {
                  setActiveControl(null);
                  return setLanguage(LANGUAGES[option.id]);
                }}
                data-option
                className={cn(
                  `flex py-2 w-full shrink-0 flex-col gap-1 mt-1 hover:bg-gray-a2 px-2 rounded`,
                  index === activeIndex ? "bg-gray-a4 text-white" : "text-gray-12"
                )}
              >
                <p className="text-xs text-gray-11 whitespace-nowrap overflow-hidden text-ellipsis">{option.name}</p>
              </button>
            ))}
            {filteredOptions.length === 0 && (
              <div className="flex justify-center items-center w-full h-full text-gray-11 text-xxs">
                No languages found for {search}
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between items-center gap-1 w-full">
            <Input
              ref={searchRef}
              type="search"
              placeholder="Search…"
              value={search}
              onChange={handleSearch}
              className="shrink-0 flex-1 w-full"
              size="large"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

function ThemePreview({ theme }: { theme: Theme }) {
  return (
    <div className="absolute inset-0 select-none cursor-default pointer-events-none text-left">
      <div className="scale-[30%] absolute -top-[17%] -left-[10%] origin-top-left">
        <Frame theme={theme} />
      </div>
    </div>
  );
}

const Control: React.FC = () => {
  const [activeControl, setActiveControl] = useAtom(activeControlAtom);
  const [theme, setTheme] = useAtom(themeAtom);
  const setPadding = useSetAtom(paddingAtom);
  const [language, setLanguage] = useAtom(selectedLanguageAtom);
  const [font, setFont] = useAtom(fontAtom);

  useEffect(() => {
    const firstOption = document.querySelector("[data-option]") as HTMLElement;
    firstOption?.focus();
  }, []);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveControl(null);
      }
    };
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [setActiveControl]);

  function getOptions() {
    if (activeControl === "theme") {
      return Object.values(THEMES).filter((theme) => !theme.hidden);
    }
    if (activeControl === "background") {
      return [
        { id: "on", name: "On" },
        { id: "off", name: "Off" },
      ];
    }
    if (activeControl === "mode") {
      return [
        { id: "on", name: "On" },
        { id: "off", name: "Off" },
      ];
    }
    if (activeControl === "padding") {
      return [
        { id: 8, name: "8" },
        { id: 16, name: "16" },
        { id: 32, name: "32" },
        { id: 64, name: "64" },
        { id: 128, name: "128" },
      ];
    }
    if (activeControl === "language") {
      return Object.values(LANGUAGES).map((language) => ({
        id: Object.keys(LANGUAGES).find((key) => LANGUAGES[key] === language),
        name: language.name,
      }));
    }
    if (activeControl === "font") {
      return FONTS.map((font) => ({
        id: font,
        name: font,
      }));
    }
    return [];
  }

  function setOption(option: any) {
    setActiveControl(null);
    if (activeControl === "theme") {
      setTheme(option);
    }
    if (activeControl === "padding") {
      setPadding(option.id);
    }
    if (activeControl === "language") {
      setLanguage(LANGUAGES[option.id]);
    }
    if (activeControl === "font") {
      setFont(option.id);
    }
  }
  const fontMap: {
    [key: string]: string;
  } = {
    "jetbrains-mono": "JetBrains Mono",
    "ibm-plex-mono": "IBM Plex Mono",
    "fira-code": "Fira Code",
    "geist-mono": "Geist Mono",
  };

  const paddingMap: {
    [key: string]: string;
  } = {
    8: "XS",
    16: "S",
    32: "M",
    64: "L",
    128: "XL",
  };

  return (
    <AnimatePresence>
      <motion.div layout className="flex" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="max-w-[580px] flex overflow-auto gap-4 scrollbar-hide -mx-4 pt-2">
          <div className="w-px" />
          {getOptions().map((option) => {
            const isActive =
              activeControl === "theme"
                ? option.id == theme.id
                : activeControl === "font"
                ? option.id === font
                : option.id === "on";

            return (
              <button
                key={option.id}
                onClick={() => {
                  setActiveControl(null);
                  return setOption(option);
                }}
                data-option
                className="flex items-center justify-center w-[85px] text-gray-12 shrink-0 flex-col gap-1 mt-1 outline-none group"
              >
                <span
                  className={cn(
                    `h-[58px] w-[85px] shrink-0 bg-gray-4 rounded flex items-center justify-center text-xs text-gray-11 
                    overflow-hidden
                    relative
                  hover:bg-gray-5
                  transition-colors
                  ring-1 ring-gray-a3 -ring-offset-1
                  group-hover:ring-gray-a4
                  group-focus-visible:bg-gray-5 group-focus-visible:ring-1 fovus-visible:ring-gray-a4  ring-offset-[#191919]
                  `,
                    option.id === "jetbrains-mono" && "jetBrainsMono",
                    option.id === "ibm-plex-mono" && "ibmPlexMono",
                    option.id === "fira-code" && "firaCode",
                    option.id === "geist-mono" && "geistMono",
                    isActive && "bg-gray-5  ring-2 !ring-white ring-offset-0 shadow-lg shadow-gray-a3 text-white",
                    (activeControl === "font" || activeControl === "padding") && "text-xl font-medium"
                  )}
                >
                  {activeControl === "theme" ? (
                    <ThemePreview theme={option as Theme} />
                  ) : activeControl === "font" ? (
                    "Aa"
                  ) : (
                    option.name
                  )}
                </span>
                <p
                  className={cn(
                    "text-xs text-gray-10 whitespace-nowrap overflow-hidden text-ellipsis font-medium group-hover:text-gray-12 transition-colors",
                    isActive && "text-gray-12"
                  )}
                >
                  {activeControl === "font"
                    ? fontMap[option.name]
                    : activeControl === "padding"
                    ? paddingMap[option.name]
                    : option.name}
                </p>
              </button>
            );
          })}
          <div className="w-px" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

function ControlButton({
  children,
  onClick,
  label,
  className,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <motion.button
      layout
      onClick={onClick}
      className="flex flex-col items-center gap-1 group disabled:cursor-not-allowed hover:bg-gray-a2 rounded p-2 min-w-[55px] focus-visible:bg-gray-a2 ring-gray-a4 outline-none focus-visible:ring-1 transition-colors"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      disabled={disabled}
    >
      <motion.span
        whileTap={{ scale: 0.95 }}
        animate={disabled ? { opacity: 0.5 } : { opacity: 1 }}
        transition={{
          duration: 0.1,
        }}
        className={cn("w-6 h-6 flex items-center justify-center text-center shrink-0 font-medium", className)}
        tabIndex={-1}
      >
        {children}
      </motion.span>
      <p className="text-xxs text-gray-11">{label}</p>
    </motion.button>
  );
}

const LanguageIconMap: {
  [key: string]: React.FC<React.SVGProps<SVGSVGElement>>;
} = {
  shell: BrandBashIcon,
  cpp: BrandCplusplusIcon,
  csharp: BrandCsharpIcon,
  clojure: BrandClojureIcon,
  css: BrandCss3Icon,
  docker: BrandDockerIcon,
  go: BrandGoIcon,
  html: BrandHtml5Icon,
  java: BrandJavaIcon,
  javascript: BrandJavascriptIcon,
  jsx: BrandJavascriptIcon,
  kotlin: BrandKotlinIcon,
  latex: BrandLatexIcon,
  markdown: BrandMarkdownIcon,
  matlab: BrandMatlabIcon,
  objectivec: BrandObjcIcon,
  php: BrandPhpIcon,
  python: BrandPythonIcon,
  r: BrandRIcon,
  ruby: BrandRubyIcon,
  rust: BrandRustIcon,
  scala: BrandScalaIcon,
  scss: BrandCss3Icon,
  sql: BrandMysqlIcon,
  swift: BrandSwiftIcon,
  svelte: BrandSvelteIcon,
  typescript: BrandTypescriptIcon,
  tsx: BrandTypescriptIcon,
  vue: BrandVuejsIcon,
};

const Controls: React.FC = () => {
  const [activeControl, setActiveControl] = useAtom(activeControlAtom);
  const theme = useAtomValue(themeAtom);
  const [showBackground, setShowBackground] = useAtom(showBackgroundAtom);
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const padding = useAtomValue(paddingAtom);
  const language = useAtomValue(selectedLanguageAtom);
  const font = useAtomValue(fontAtom);
  const [hideControls, setHideControls] = useState(false);

  const languageId = Object.keys(LANGUAGES).find((key) => LANGUAGES[key] === language) as string;
  const LanguageIconComponent = language && LanguageIconMap[languageId];

  useHotkeys("l", (event) => {
    event.preventDefault();
    setActiveControl("language");
  });

  useHotkeys("p", (event) => {
    event.preventDefault();
    setActiveControl("padding");
  });

  useHotkeys("p", (event) => {
    event.preventDefault();
    setDarkMode((prev) => !prev);
  });

  useHotkeys("b", (event) => {
    event.preventDefault();
    setShowBackground((prev) => !prev);
  });

  useHotkeys("t", (event) => {
    event.preventDefault();
    setActiveControl("font");
  });

  useHotkeys("c", (event) => {
    event.preventDefault();
    setActiveControl("theme");
  });

  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.controls}
        layout
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 40,
        }}
      >
        <motion.button
          initial={false}
          layout="preserve-aspect"
          transition={{
            duration: 0.1,
            ease: easeOut,
          }}
          animate={{ left: "calc(50% - 26px)", top: activeControl ? 0 : -4 }}
          className={cn(
            "flex group px-2 h-[24px] items-center absolute top-0 justify-center outline-none focus-visible:ring-2 ring-gray-a4 rounded"
          )}
          onClick={() => {
            if (activeControl) {
              setActiveControl(null);
            } else {
              setHideControls((prev) => !prev);
            }
          }}
        >
          <div
            className={cn(
              `w-[18px] h-[5px] rounded-full bg-gray-11 group-hover:bg-gray-12 relative origin-center transition-transform`,
              activeControl ? "rotate-[12deg] -translate-x-[2px] left-[4px]" : "left-[4px]"
            )}
          />
          <div
            className={cn(
              `w-[18px] h-[5px] rounded-full bg-gray-11 group-hover:bg-gray-12 relative origin-center transition-transform`,
              activeControl ? "-rotate-[12deg] translate-x-[2px] right-[4px]" : "right-[4px]"
            )}
          />
        </motion.button>
        {activeControl === "language" ? (
          <LanguageControl />
        ) : activeControl ? (
          <Control />
        ) : (
          <AnimatePresence>
            <ControlButton onClick={() => setActiveControl("theme")} label="Theme">
              <span className="grid grid-cols-2 grid-rows-2 gap-[3px]">
                <span
                  className="bg-red-300 block w-2 h-2 rounded-full"
                  style={{
                    boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.2)",
                    background: (theme.syntax.dark as any)["--ray-token-constant"],
                  }}
                ></span>
                <span
                  className="bg-red-300 block w-2 h-2 rounded-full"
                  style={{
                    boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.2)",
                    background: (theme.syntax.dark as any)["--ray-token-keyword"],
                  }}
                ></span>
                <span
                  className="bg-red-300 block w-2 h-2 rounded-full"
                  style={{
                    boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.2)",
                    background: (theme.syntax.dark as any)["--ray-token-function"],
                  }}
                ></span>
                <span
                  className="bg-red-300 block w-2 h-2 rounded-full"
                  style={{
                    boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.2)",
                    background: (theme.syntax.dark as any)["--ray-token-string"],
                  }}
                ></span>
              </span>
            </ControlButton>
            <ControlButton
              onClick={() => setActiveControl("font")}
              label="Font"
              className={cn(
                "text-xl",
                font === "jetbrains-mono" && "jetBrainsMono",
                font === "ibm-plex-mono" && "ibmPlexMono",
                font === "fira-code" && "firaCode",
                font === "geist-mono" && "geistMono"
              )}
              disabled={theme.partner}
            >
              Aa
            </ControlButton>
            <ControlButton onClick={() => setShowBackground(!showBackground)} label="Background" className="relative">
              <MaximizeIcon
                className={cn(
                  "absolute inset-0 transition-all origin-center w-6 h-6",
                  showBackground ? "scale-100 opacity-1" : "scale-50 opacity-0"
                )}
              />
              <span
                className={cn(
                  "rounded-sm transition-transform w-2.5 h-2.5 origin-center",
                  showBackground ? "scale-100" : "scale-[200%] transparentPattern"
                )}
                style={
                  showBackground
                    ? {
                        backgroundImage: `linear-gradient(140deg, ${theme.background.from}, ${theme.background.to})`,
                        boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.2)",
                      }
                    : {
                        boxShadow: "inset 0 0 0 0.5px rgba(255, 255, 255, 0.1)",
                      }
                }
              />
            </ControlButton>
            <ControlButton onClick={() => setDarkMode(!darkMode)} label="Mode" className="overflow-hidden relative">
              <AnimatePresence initial={false} mode="popLayout">
                {darkMode ? (
                  <motion.span
                    key="dark"
                    initial={{
                      rotate: -20,
                      scale: 0.7,
                      opacity: 0,
                    }}
                    animate={{
                      rotate: 0,
                      scale: 1,
                      opacity: 1,
                    }}
                    exit={{
                      rotate: 20,
                      scale: 0.7,
                      opacity: 0,
                    }}
                  >
                    <MoonIcon className="w-6 h-6" style={{ fill: "currentColor" }} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="light"
                    initial={{
                      rotate: -20,
                      scale: 0.7,
                      opacity: 0,
                    }}
                    animate={{
                      rotate: 0,
                      scale: 1,
                      opacity: 1,
                    }}
                    exit={{
                      rotate: 20,
                      scale: 0.7,
                      opacity: 0,
                    }}
                  >
                    <SunIcon className="w-6 h-6" />
                  </motion.span>
                )}
              </AnimatePresence>
            </ControlButton>
            <ControlButton
              onClick={() => setActiveControl("padding")}
              label="Padding"
              className="bg-white text-black font-mono text-xs font-semibold rounded-full"
            >
              {padding}
            </ControlButton>
            <ControlButton onClick={() => setActiveControl("language")} label="Language" className="text-xxs">
              {LanguageIconComponent ? <LanguageIconComponent className="w-6 h-6" /> : language?.name}
            </ControlButton>
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  );
};

export default Controls;
