"use client";
import React from "react";
import { Theme } from "@themes/lib/theme";
import { useRaycastTheme } from "@themes/components/raycast-theme-provider";
import { ChevronLeftIcon, ChevronRightIcon } from "@raycast/icons";

export function ThemeNavigation({ themes }: { themes: Theme[] }) {
  const { activeTheme, setActiveTheme } = useRaycastTheme();

  const lightThemes = themes.filter((theme) => theme.appearance === "light");
  const activeLightThemeIndex = lightThemes.findIndex((theme) => theme.slug === activeTheme?.slug);
  const previousLightTheme = lightThemes[activeLightThemeIndex - 1];
  const nextLightTheme = lightThemes[activeLightThemeIndex + 1];

  const darkThemes = themes.filter((theme) => theme.appearance === "dark");

  const isDarkThemeActive = activeTheme?.appearance === "dark";

  const activeDarkThemeIndex = darkThemes.findIndex((theme) => theme.slug === activeTheme?.slug);
  const previousDarkTheme = darkThemes[activeDarkThemeIndex - 1];
  const nextDarkTheme = darkThemes[activeDarkThemeIndex + 1];

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        document.activeElement?.closest('[role="menubar"]') ||
        document.activeElement?.closest("[data-radix-menubar-content]")
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        setActiveTheme(isDarkThemeActive ? previousDarkTheme || darkThemes[0] : previousLightTheme || lightThemes[0]);
      } else if (event.key === "ArrowRight") {
        setActiveTheme(
          isDarkThemeActive
            ? nextDarkTheme || darkThemes[darkThemes.length - 1]
            : nextLightTheme || lightThemes[lightThemes.length - 1]
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    isDarkThemeActive,
    setActiveTheme,
    previousDarkTheme,
    darkThemes,
    previousLightTheme,
    lightThemes,
    nextDarkTheme,
    nextLightTheme,
  ]);

  return (
    <span className="inline-flex items-center text-base font-medium shadow-[0px_0px_29px_10px_rgba(0,0,0,0.06)] dark:shadow-[0px_0px_29px_10px_rgba(255,255,255,.06)] rounded-md">
      <Button
        disabled={isDarkThemeActive ? !previousDarkTheme : !previousLightTheme}
        className={`rounded-tl-md rounded-bl-md`}
        onClick={() => {
          if (activeTheme?.appearance === "dark") {
            setActiveTheme(previousDarkTheme || darkThemes[0]);
          } else {
            setActiveTheme(previousLightTheme || lightThemes[0]);
          }
        }}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        disabled={isDarkThemeActive ? !nextDarkTheme : !nextLightTheme}
        className="ml-[-1px] rounded-tr-md rounded-br-md"
        onClick={() => {
          if (activeTheme?.appearance === "dark") {
            setActiveTheme(nextDarkTheme || darkThemes[darkThemes.length - 1]);
          } else {
            setActiveTheme(nextLightTheme || lightThemes[lightThemes.length - 1]);
          }
        }}
      >
        <ChevronRightIcon />
      </Button>
    </span>
  );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ children, className, ...props }, ref) => (
  <button
    {...props}
    ref={ref}
    className={`h-[30px] flex items-center gap-2 px-4 outline-none relative
      bg-white/10
      hover:bg-white/50 
      
      disabled:text-black/40
      disabled:dark:text-white/40
      
      dark:bg-black/10
      dark:hover:bg-black/50 

      disabled:pointer-events-none

        shadow-[inset_0px_0px_0px_1px_#737373] 
        disabled:shadow-[inset_0px_0px_0px_1px_rgba(0,0,0,0.2)] 
        focus:shadow-[inset_0px_0px_0px_1px_#737373,0px_0px_0px_1px_#737373] 

        dark:shadow-[inset_0px_0px_0px_1px_#484848] 
        disabled:dark:shadow-[inset_0px_0px_0px_1px_rgba(255,255,255,0.1)] 
        dark:focus:shadow-[inset_0px_0px_0px_1px_#484848,0px_0px_0px_1px_#484848] 
        ${className}`}
  >
    {children}
  </button>
));

Button.displayName = "Button";
