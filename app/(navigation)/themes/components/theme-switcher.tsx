"use client";
import React from "react";
import { ThemeCard } from "@themes/components/raycast/theme-card";
import { Theme } from "@themes/lib/theme";
import { useRaycastTheme } from "@themes/components/raycast-theme-provider";

export function ThemeSwitcher({ themes }: { themes: Theme[] }) {
  const { activeTheme } = useRaycastTheme();

  return (
    <div className="flex items-center shrink-0 py-8 gap-8 box-content overflow-x-auto snap-x snap-mandatory h-[200px] w-full">
      <div aria-hidden className="shrink-0" />
      {!activeTheme?.slug && <ThemeCard theme={activeTheme} />}
      {themes
        .filter((rayTheme) => rayTheme.appearance === activeTheme?.appearance)
        .map((rayTheme) => (
          <ThemeCard key={rayTheme.slug} theme={rayTheme} />
        ))}
      <div aria-hidden className="shrink-0" />
    </div>
  );
}
