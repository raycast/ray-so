import { Fira_Code, IBM_Plex_Mono, JetBrains_Mono, Roboto_Mono } from "next/font/google";
import cn from "classnames";
import { Navigation } from "@/components/navigation";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
import React from "react";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: "500",
  display: "swap",
  variable: "--font-jetbrainsmono",
});
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "500",
  display: "swap",
  variable: "--font-ibmplexmono",
});
const firaCode = Fira_Code({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-firacode" });
const soehneMono = localFont({
  src: "../assets/soehne-mono-buch.woff2",
  variable: "--font-soehne-mono",
});
const commitMono = localFont({
  src: "../assets/commit-mono-regular.woff2",
  variable: "--font-commitmono",
});
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-roboto-mono",
});

/**
 * We can't adjust the fallback stack of the font so instead we just extract the
 * font name and create our own CSS variable using it so that we can configure the
 * font stack to include emoji fonts.
 */
const geistMonoFontName = GeistMono.style.fontFamily.split(",")[0];

export default function NavigationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "h-full",
        jetBrainsMono.variable,
        ibmPlexMono.variable,
        firaCode.variable,
        soehneMono.variable,
        commitMono.variable,
        robotoMono.variable,
      )}
      style={
        {
          "--font-geist-mono": geistMonoFontName,
        } as React.CSSProperties
      }
    >
      <Navigation />
      <main className="flex flex-col min-h-full pt-[50px]">{children}</main>
    </div>
  );
}
