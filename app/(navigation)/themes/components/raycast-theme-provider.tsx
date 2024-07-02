"use client";
import { Theme } from "@themes/lib/theme";
import React from "react";

type RaycastThemeContextType = {
  activeTheme: Theme | undefined;
  setActiveTheme: (theme: Theme) => void;
};

export const RaycastThemeContext = React.createContext<RaycastThemeContextType>({
  activeTheme: undefined,
  setActiveTheme: () => {},
});

export function RaycastThemeProvider({ children }: { children: React.ReactNode }) {
  const [activeTheme, setActiveTheme] = React.useState<Theme | undefined>(undefined);

  const handleSetActiveTheme = (theme: Theme) => {
    setActiveTheme(theme);
  };

  const handleTitleChange = (title: string) => {
    return (document.title = title);
  };

  const handleURLChange = (slug: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    window.history.replaceState({}, "", `/themes/${slug}${searchParams.size > 0 ? `?${searchParams.toString()}` : ""}`);
  };

  React.useEffect(() => {
    if (activeTheme) {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(activeTheme.appearance);
      document.documentElement.style.colorScheme = activeTheme.appearance;
      if (activeTheme.slug) {
        handleURLChange(activeTheme.slug);
      }
      handleTitleChange(`${activeTheme.name} by ${activeTheme.author}`);
    }
  }, [activeTheme]);

  return (
    <RaycastThemeContext.Provider
      value={{
        activeTheme,
        setActiveTheme: handleSetActiveTheme,
      }}
    >
      {children}
    </RaycastThemeContext.Provider>
  );
}

export function useRaycastTheme() {
  const { activeTheme, setActiveTheme } = React.useContext(RaycastThemeContext);
  return { activeTheme, setActiveTheme };
}
