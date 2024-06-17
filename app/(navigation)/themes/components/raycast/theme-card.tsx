"use client";
import { Dot } from "@themes/components/dot";
import { Raycast } from "@themes/components/raycast";
import { useRaycastTheme } from "@themes/components/raycast-theme-provider";
import { Theme } from "@themes/lib/theme";
import React from "react";

export function ThemeCard({ theme: raycastTheme }: { theme?: Theme }) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const { activeTheme, setActiveTheme } = useRaycastTheme();

  const isActiveTheme = activeTheme && activeTheme?.slug === raycastTheme?.slug;

  React.useEffect(() => {
    if (isActiveTheme) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [isActiveTheme, activeTheme]);

  return (
    <button
      ref={ref}
      className={`snap-always snap-center flex flex-col ring-1 ring-inset p-4 gap-3 rounded-2xl overflow-hidden h-full aspect-[1.58/1] shrink-0 outline-none transition-shadow ${
        isActiveTheme
          ? "ring-black/60 dark:ring-white/60 shadow-[0px_0px_29px_10px_rgba(0,0,0,0.06)] dark:shadow-[0px_0px_29px_10px_rgba(255,255,255,.06)]"
          : "ring-[rgba(0,0,0,0.2)] dark:ring-[rgba(255,255,255,0.2)] focus:ring-[rgba(0,0,0,0.4)] focus:dark:ring-[rgba(255,255,255,0.4)]"
      }`}
      onClick={() => {
        raycastTheme ? setActiveTheme(raycastTheme) : {};
      }}
    >
      <div className="overflow-hidden rounded-md flex-1 w-full">
        <div className="rounded-lg h-full w-full bg-black/10 dark:bg-white/10 relative">
          <div className="absolute left-3 top-3">
            <Raycast theme={raycastTheme} disableLoadingAnimation={!isActiveTheme} thumbnail />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between w-full gap-2">
        <div className="text-sm text-left truncate flex gap-1">
          <div className="font-semibold">{raycastTheme?.name} </div>
          {(activeTheme?.author || activeTheme?.authorUsername) && (
            <span className="opacity-50">by {raycastTheme?.author || raycastTheme?.authorUsername}</span>
          )}
        </div>
        <div
          style={{
            display: "flex",
            gap: 4,
          }}
        >
          <Dot color={raycastTheme?.colors.background} colorSecondary={raycastTheme?.colors.backgroundSecondary} />
          <Dot color={raycastTheme?.colors.text} />
          <Dot color={raycastTheme?.colors.selection} />
          <Dot color={raycastTheme?.colors.loader} />
        </div>
      </div>
    </button>
  );
}
