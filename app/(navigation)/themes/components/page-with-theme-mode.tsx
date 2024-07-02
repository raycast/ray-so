"use client";
import { useRaycastTheme } from "@themes/components/raycast-theme-provider";
import { Theme } from "@themes/lib/theme";
import React from "react";
import { Loader } from "./loader";

export function PageWithThemeMode({ children, theme }: { children: React.ReactNode; theme: Theme }) {
  const { activeTheme, setActiveTheme } = useRaycastTheme();

  React.useEffect(() => {
    setActiveTheme(theme);
    return () => {
      // Remove light theme when navigating away
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!activeTheme && <Loader />}
      {children}
    </>
  );
}
