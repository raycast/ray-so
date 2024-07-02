"use client";
import React from "react";
import { Theme } from "@themes/lib/theme";
import { useLastVisitedTheme } from "@themes/components/navigation-history";
import { useRaycastTheme } from "@themes/components/raycast-theme-provider";
import { MoonIcon, SunIcon } from "@raycast/icons";

export function ThemeFilter({ themes }: { themes: Theme[] }) {
  const { activeTheme, setActiveTheme } = useRaycastTheme();
  const { previousActiveTheme, setPreviousActiveTheme } = useLastVisitedTheme();

  const lightThemes = themes.filter((rayTheme) => rayTheme.appearance === "light");
  const darkThemes = themes.filter((rayTheme) => rayTheme.appearance === "dark");

  const handleActivateDarkTheme = React.useCallback(() => {
    if (activeTheme?.appearance === "dark") {
      return;
    }
    setPreviousActiveTheme(activeTheme);
    setActiveTheme(previousActiveTheme || darkThemes[0]);
  }, [activeTheme, previousActiveTheme, setActiveTheme, setPreviousActiveTheme, darkThemes]);

  const handleActivateLightTheme = React.useCallback(() => {
    if (activeTheme?.appearance === "light") {
      return;
    }
    setPreviousActiveTheme(activeTheme);
    setActiveTheme(previousActiveTheme || lightThemes[0]);
  }, [activeTheme, previousActiveTheme, setActiveTheme, setPreviousActiveTheme, lightThemes]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === "d" && event.shiftKey) {
        handleActivateDarkTheme();
        handleActivateLightTheme();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleActivateDarkTheme, handleActivateLightTheme]);

  return (
    <span className="inline-flex items-center gap-1">
      <ModeLink
        href={`/${(previousActiveTheme || darkThemes[0])?.slug}`}
        data-active={activeTheme?.appearance === "dark" ? true : undefined}
        onClick={(event) => {
          event.preventDefault();
          handleActivateDarkTheme();
        }}
      >
        <MoonIcon /> Dark
      </ModeLink>
      <ModeLink
        href={`/${(previousActiveTheme || lightThemes[0])?.slug}`}
        data-active={activeTheme?.appearance === "light" ? true : undefined}
        onClick={(event) => {
          event.preventDefault();
          handleActivateLightTheme();
        }}
      >
        <SunIcon /> Light
      </ModeLink>
    </span>
  );
}

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: React.ReactNode;
  className?: string;
};

const ModeLink = React.forwardRef<HTMLAnchorElement, LinkProps>(({ children, className, ...props }, ref) => (
  <a
    {...props}
    ref={ref}
    className={`h-[30px] flex items-center gap-2 px-4 outline-none text-sm font-medium ring-1 ring-inset ring-transparent rounded-full

      text-black/60
      data-[active]:text-black
      
      dark:text-white/60
      dark:data-[active]:text-white

      data-[active]:ring-[#737373]
      focus:ring-[#737373]
      data-[active]:bg-[rgba(0,0,0,0.1)]
      data-[active]:shadow-[0px_0px_29px_10px_rgba(0,_0,_0,_0.06)]
      

      dark:data-[active]:bg-[rgba(255,255,255,0.1)]
      dark:data-[active]:shadow-[0px_0px_29px_10px_rgba(255,_255,_255,_0.06)]
      
      `}
  >
    {children}
  </a>
));

ModeLink.displayName = "ModeLink";
