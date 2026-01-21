import {
  Fira_Code,
  Geist_Mono,
  Google_Sans_Code,
  IBM_Plex_Mono,
  JetBrains_Mono,
  Roboto_Mono,
  Source_Code_Pro,
  Space_Mono,
} from "next/font/google";
import cn from "classnames";
import { Navigation } from "@/components/navigation";
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

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-space-mono",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-source-code-pro",
});

const googleSansCode = Google_Sans_Code({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-google-sans-code",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-geist-mono",
});

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
        spaceMono.variable,
        sourceCodePro.variable,
        googleSansCode.variable,
        geistMono.variable,
      )}
    >
      <Navigation />
      <main className="flex flex-col min-h-full pt-[50px]">{children}</main>
    </div>
  );
}
