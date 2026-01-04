import { atom } from "jotai";
import { atomWithHash } from "jotai-location";
import { atomWithStorage } from "jotai/utils";
import { CSSProperties } from "react";
import { Font } from "./font";
import CloudflareLogo from "../assets/cloudflare.svg";
import CloudflareLogoUrl from "../assets/cloudflare.svg?url";
import VercelLogo from "../assets/vercel.svg";
import VercelLogoUrl from "../assets/vercel.svg?url";
import RabbitLogo from "../assets/rabbit.svg";
import RabbitLogoUrl from "../assets/rabbit.svg?url";
import SupabaseLogo from "../assets/supabase.svg";
import SupabaseLogoUrl from "../assets/supabase.svg?url";
import TailwindLogo from "../assets/tailwind.svg";
import TailwindLogoUrl from "../assets/tailwind.svg?url";
import TriggerLogo from "../assets/triggerdev.svg";
import TriggerLogoUrl from "../assets/triggerdev.svg?url";
import GeminiLogo from "../assets/gemini.svg";
import GeminiLogoUrl from "../assets/gemini.svg?url";
import OpenAiLogo from "../assets/openai.svg";
import OpenAiLogoUrl from "../assets/openai.svg?url";
import ClerkLogo from "../assets/clerk.svg";
import ClerkLogoUrl from "../assets/clerk.svg?url";
import PrismaLogo from "../assets/prisma.svg";
import PrismaLogoUrl from "../assets/prisma.svg?url";
import MintlifyLogo from "../assets/mintlify.svg";
import MintlifyLogoUrl from "../assets/mintlify.svg?url";
import ElevenLabsLogo from "../assets/elevenlabs.svg";
import ElevenLabsLogoUrl from "../assets/elevenlabs.svg?url";
import ResendLogo from "../assets/resend.svg";
import ResendLogoUrl from "../assets/resend.svg?url";
import BrowserbaseLogo from "../assets/browserbase.svg";
import BrowserbaseLogoUrl from "../assets/browserbase.svg?url";
import NuxtLogo from "../assets/nuxt.svg";
import NuxtLogoUrl from "../assets/nuxt.svg?url";
import StripeLogo from "../assets/stripe/logo.svg";
import StripeLogoUrl from "../assets/stripe/logo.svg?url";
import SecondLogo from "../assets/second.svg";
import SecondLogoUrl from "../assets/second.svg?url";
import { showLineNumbersAtom } from ".";
import { createCssVariablesTheme } from "../util/theme-css-variables";
import { BASE_URL } from "@/utils/common";

export const shikiTheme = createCssVariablesTheme({
  name: "css-variables",
  variablePrefix: "--ray-",
  variableDefaults: {},
  fontStyle: true,
});

type ShikiSyntaxObject = {
  /* foreground is also used as caret color */
  foreground: string;
  /* rest is optional as syntax might come from a textmate source */
  constant?: string;
  string?: string;
  comment?: string;
  keyword?: string;
  parameter?: string;
  function?: string;
  stringExpression?: string;
  punctuation?: string;
  link?: string;
  number?: string;
  property?: string;
  objectLiteral?: string;
  highlight?: string;
  highlightBorder?: string;
  highlightHover?: string;
  diffDeleted?: string;
  diffInserted?: string;
};

function convertToShikiTheme(syntaxObject: ShikiSyntaxObject): CSSProperties {
  if (!syntaxObject) {
    return {};
  }

  return {
    "--ray-foreground": syntaxObject.foreground,
    "--ray-token-constant": syntaxObject.constant,
    "--ray-token-string": syntaxObject.string,
    "--ray-token-comment": syntaxObject.comment,
    "--ray-token-keyword": syntaxObject.keyword,
    "--ray-token-parameter": syntaxObject.parameter,
    "--ray-token-function": syntaxObject.function,
    "--ray-token-string-expression": syntaxObject.stringExpression,
    "--ray-token-punctuation": syntaxObject.punctuation,
    "--ray-token-link": syntaxObject.link,
    "--ray-token-number": syntaxObject.number,
    "--ray-token-property": syntaxObject.property,
    "--ray-highlight": syntaxObject.highlight,
    "--ray-highlight-border": syntaxObject.highlightBorder,
    "--ray-highlight-hover": syntaxObject.highlightHover,
    "--ray-token-diff-deleted": syntaxObject.diffDeleted,
    "--ray-token-diff-inserted": syntaxObject.diffInserted,
    "--ray-token-object-literal": syntaxObject.objectLiteral,
  } as CSSProperties;
}

export type Theme = {
  id: string;
  name: string;
  background: {
    from: string;
    to: string;
  };
  icon?: string;
  iconUrl?: string;
  font?: Font;
  partner?: boolean;
  hidden?: boolean;
  lineNumbers?: boolean;
  syntax: { light: CSSProperties; dark?: CSSProperties } | { light?: CSSProperties; dark: CSSProperties };
};

export const THEMES: { [index: string]: Theme } = {
  vercel: {
    id: "vercel",
    name: "Vercel",
    background: {
      from: "#232323",
      to: "#1F1F1F",
    },
    icon: VercelLogo,
    iconUrl: `${BASE_URL}${VercelLogoUrl.src}`,
    font: "geist-mono",
    partner: true,
    syntax: {
      light: convertToShikiTheme({
        foreground: "hsla(0, 0%, 9%,1)",
        constant: "oklch(53.18% 0.2399 256.9900584162342)",
        string: "oklch(51.75% 0.1453 147.65)",
        comment: "hsla(0, 0%, 40%,1)",
        keyword: "oklch(53.5% 0.2058 2.84)",
        parameter: "oklch(52.79% 0.1496 54.65)",
        function: "oklch(47.18% 0.2579 304)",
        stringExpression: "oklch(51.75% 0.1453 147.65)",
        punctuation: "hsla(0, 0%, 9%,1)",
        link: "oklch(51.75% 0.1453 147.65)",
        number: "#111111",
        property: "oklch(53.18% 0.2399 256.9900584162342)",
        highlight: "oklch(94.58% 0.0293 249.84870859673202)",
        highlightHover: "oklch(94.58% 0.0293 249.84870859673202 / 30%)",
        highlightBorder: "oklch(53.18% 0.2399 256.9900584162342)",
        diffDeleted: "oklch(58.01% 0.227 25.12)",
        diffInserted: "oklch(57.81% 0.1776 147.5)",
      }),
      dark: convertToShikiTheme({
        foreground: "hsla(0, 0%, 93%,1)",
        constant: "oklch(71.7% 0.1648 250.79360374054167)",
        string: "oklch(73.1% 0.2158 148.29)",
        comment: "hsla(0, 0%, 63%,1)",
        keyword: "oklch(69.36% 0.2223 3.91)",
        parameter: "oklch(77.21% 0.1991 64.28)",
        function: "oklch(69.87% 0.2037 309.51)",
        stringExpression: "oklch(73.1% 0.2158 148.29)",
        punctuation: "hsla(0, 0%, 93%,1)",
        link: "oklch(73.1% 0.2158 148.29)",
        number: "#ffffff",
        property: "oklch(71.7% 0.1648 250.79360374054167)",
        highlight: "oklch(30.86% 0.1022 255.21)",
        highlightHover: "oklch(30.86% 0.1022 255.21 / 30%)",
        highlightBorder: "oklch(71.7% 0.1648 250.79360374054167)",
        diffDeleted: "oklch(62.56% 0.2277 23.03)",
        diffInserted: "oklch(58.11% 0.1815 146.55)",
      }),
    },
  },
  rabbit: {
    id: "rabbit",
    name: "Evil Rabbit",
    background: {
      from: "#000000",
      to: "#000000",
    },
    icon: RabbitLogo,
    iconUrl: `${BASE_URL}${RabbitLogoUrl.src}`,
    font: "geist-mono",
    partner: true,
    hidden: true,
    syntax: {
      light: convertToShikiTheme({
        foreground: "#111111",
        constant: "#666666",
        parameter: "#666666",
        stringExpression: "#666666",
        keyword: "#666666",
        function: "#111111",
        punctuation: "#666666",
        string: "#666666",
        comment: "#999999",
        link: "#666666",
        number: "#111111",
        property: "#666666",
        diffInserted: "#666666",
        diffDeleted: "#666666",
      }),
      dark: convertToShikiTheme({
        foreground: "#ffffff",
        constant: "#a7a7a7",
        parameter: "#a7a7a7",
        stringExpression: "#a7a7a7",
        keyword: "#a7a7a7",
        function: "#ffffff",
        punctuation: "#a7a7a7",
        string: "#a7a7a7",
        comment: "#666666",
        link: "#a7a7a7",
        number: "#ffffff",
        property: "#a7a7a7",
        diffInserted: "#a7a7a7",
        diffDeleted: "#a7a7a7",
      }),
    },
  },
  supabase: {
    id: "supabase",
    name: "Supabase",
    background: {
      from: "#121212",
      to: "#121212",
    },
    icon: SupabaseLogo,
    iconUrl: `${BASE_URL}${SupabaseLogoUrl.src}`,
    partner: true,
    lineNumbers: true,
    font: "jetbrains-mono",
    syntax: {
      light: convertToShikiTheme({
        foreground: "#525252",
        constant: "#15593b",
        string: "#f1a10d",
        comment: "#7e7e7e",
        keyword: "#6b35dc",
        parameter: "#525252",
        function: "#15593b",
        stringExpression: "#f1a10d",
        punctuation: "#a0a0a0",
        link: "#525252",
        number: "#525252",
        property: "#15593b",
        highlight: "oklch(0.88 0.22 153.28 / 0.12)",
        highlightHover: "oklch(0.88 0.22 153.28 / 0.06)",
        highlightBorder: "#009a55",
      }),
      dark: convertToShikiTheme({
        foreground: "#ffffff",
        constant: "#3ecf8e",
        string: "#ffcda1",
        comment: "#7e7e7e",
        keyword: "#bda4ff",
        parameter: "#ffffff",
        function: "#3ecf8e",
        stringExpression: "#ffcda1",
        punctuation: "#ffffff",
        link: "#ffffff",
        number: "#ededed",
        property: "#3ecf8e",
        highlight: "#232323",
        highlightHover: "#1D1D1D",
        highlightBorder: "#383838",
        diffInserted: "#3ecf8e",
        diffDeleted: "#F06A50",
      }),
    },
  },
  /**
   * Second Theme
   *
   * Brand colors:
   * - Primary: Red #fa1336, Blue #3d8afb, Yellow #f6d032
   * - Tertiary: Green #43b929, Purple #6f2dbd, Orange #f4931b
   * - Text: #242424 (light), #ffffff (dark)
   * - Neutral greys: #080808, #141414, #1f1f1f, #737373, #eeeeee
   *
   * Note: lineNumbers is intentionally omitted to allow user toggle
   * (explicitly set lineNumbers: true/false to lock the control)
   */
  second: {
    id: "second",
    name: "Second",
    background: {
      from: "#ffffff",
      to: "#ffffff",
    },
    icon: SecondLogo,
    iconUrl: `${BASE_URL}${SecondLogoUrl.src}`,
    partner: true,
    font: "source-code-pro",
    syntax: {
      light: convertToShikiTheme({
        foreground: "#242424",
        constant: "#6f2dbd", // Purple (tertiary)
        string: "#f4931b", // Orange (tertiary)
        comment: "#8c8c8c",
        keyword: "#fa1336", // Red (primary)
        parameter: "#242424",
        function: "#3d8afb", // Blue (primary)
        stringExpression: "#f4931b", // Orange (tertiary)
        punctuation: "#242424",
        link: "#3d8afb", // Blue (primary)
        number: "#f4931b", // Orange (tertiary)
        property: "#3d8afb", // Blue (primary)
        highlight: "rgba(246, 208, 50, 0.12)", // Yellow (primary)
        highlightHover: "rgba(246, 208, 50, 0.06)",
        highlightBorder: "#f6d032", // Yellow (primary)
        diffInserted: "#43b929", // Green (tertiary)
        diffDeleted: "#fa1336", // Red (primary)
      }),
      dark: convertToShikiTheme({
        foreground: "#ffffff",
        constant: "#9257db", // Purple (tertiary) - brightened for contrast on dark
        string: "#f6d032", // Yellow (primary) - better contrast on dark
        comment: "#737373", // Neutral grey
        keyword: "#fa1336", // Red (primary)
        parameter: "#ffffff",
        function: "#3d8afb", // Blue (primary)
        stringExpression: "#f6d032", // Yellow (primary)
        punctuation: "#ffffff",
        link: "#3d8afb", // Blue (primary)
        number: "#f6d032", // Yellow (primary)
        property: "#3d8afb", // Blue (primary)
        highlight: "rgba(246, 208, 50, 0.12)",
        highlightHover: "rgba(246, 208, 50, 0.06)",
        highlightBorder: "#f6d032",
        diffInserted: "#43b929", // Green (tertiary)
        diffDeleted: "#fa1336", // Red (primary)
      }),
    },
  },
  tailwind: {
    id: "tailwind",
    name: "Tailwind",
    background: {
      from: "#36B6F0",
      to: "#36B6F0",
    },
    icon: TailwindLogo,
    iconUrl: `${BASE_URL}${TailwindLogoUrl.src}`,
    partner: true,
    lineNumbers: true,
    font: "fira-code",
    syntax: {
      light: convertToShikiTheme({
        foreground: "#000",
        highlightBorder: "#0484C7",
        highlight: "rgba(25,147,211,0.10)",
        highlightHover: "rgba(25,147,211,0.06)",
      }),
      dark: convertToShikiTheme({
        foreground: "#fff",
        highlightBorder: "#C1B2F9",
        highlight: "rgba(193,178,249,0.12)",
        highlightHover: "rgba(193,178,249,0.07)",
      }),
    },
  },
  openai: {
    id: "openai",
    name: "OpenAI",
    background: {
      from: "#000",
      to: "#000",
    },
    icon: OpenAiLogo,
    iconUrl: `${BASE_URL}${OpenAiLogoUrl.src}`,
    partner: true,
    font: "soehne-mono",
    lineNumbers: true,
    syntax: {
      light: convertToShikiTheme({
        foreground: "#171717",
        constant: "#DF3079",
        string: "#171717",
        comment: "hsla(240, 12%, 71%, 1)",
        keyword: "#2E95D3",
        parameter: "#ededed",
        function: "#00A67D",
        stringExpression: "#00a67d",
        punctuation: "#171717",
        link: "#F22C3D",
        number: "#e9950c",
        property: "#F22C3D",
        highlight: "rgba(0,0,0,0.02)",
        highlightHover: "rgba(0,0,0,0.015)",
        diffInserted: "#00A67D",
        diffDeleted: "#F22C3D",
      }),
      dark: convertToShikiTheme({
        foreground: "#fff",
        constant: "#df3079",
        string: "#fff",
        comment: "rgba(255,255,255,0.4)",
        keyword: "#2E95D3",
        parameter: "#fff",
        function: "#00A67D",
        stringExpression: "#00A67D",
        punctuation: "#fff",
        link: "#F22C3D",
        number: " #e9950c",
        property: "#F22C3D",
        highlight: "rgba(255, 255, 255, 0.05)",
        highlightHover: "rgba(255, 255, 255, 0.03)",
        diffInserted: "#00A67D",
        diffDeleted: "#F22C3D",
      }),
    },
  },
  mintlify: {
    id: "mintlify",
    name: "Mintlify",
    background: {
      from: "#000",
      to: "#000",
    },
    icon: MintlifyLogo,
    iconUrl: `${BASE_URL}${MintlifyLogoUrl.src}`,
    partner: true,
    syntax: {
      light: convertToShikiTheme({
        foreground: "#171717",
        constant: "#0d9373",
        string: "#171717",
        comment: "#707070",
        keyword: "#0d548f",
        parameter: "#0576b7",
        function: "#0576b7",
        stringExpression: "#d55d2e",
        punctuation: "#808080",
        link: "#4aab15",
        number: "#4aab15",
        property: "#4aab15",
        highlight: "#dfbe5b3a",
        highlightHover: "#dfbe5b1b",
        highlightBorder: "#e8bc39",
        diffInserted: "#0d9373",
        diffDeleted: "#DC2625",
      }),
      dark: convertToShikiTheme({
        foreground: "#F3F7F6",
        constant: "#4ec9b0",
        string: "#F3F7F6",
        comment: "#707070",
        keyword: "#569cd6",
        parameter: "#9cdcfe",
        function: "#9cdcfe",
        stringExpression: "#ce9178",
        punctuation: "#808080",
        link: "#b5cea8",
        number: "#b5cea8",
        property: "#b5cea8",
        highlight: "rgb(131 114 55 / 30%)",
        highlightHover: "rgb(131 114 55 / 15%)",
        highlightBorder: "#f7d87c",
        diffInserted: "#4ec9b0",
        diffDeleted: "#E17271",
      }),
    },
  },
  prisma: {
    id: "prisma",
    name: "Prisma",
    background: {
      from: "#000",
      to: "#000",
    },
    icon: PrismaLogo,
    iconUrl: `${BASE_URL}${PrismaLogoUrl.src}`,
    partner: true,
    lineNumbers: false,
    syntax: {
      light: convertToShikiTheme({
        foreground: "#1A202C",
        constant: "#5A67D8",
        string: "#16A394",
        comment: "#718096",
        keyword: "#16A394",
        parameter: "#805AD5",
        function: "#5A67D8",
        stringExpression: "#16A394",
        punctuation: "#1A202C",
        link: "#5A67D8",
        number: "#16A394",
        property: "#16A394",
        highlight: "#16a39528",
        highlightHover: "#16a3950e",
        highlightBorder: "#16A394",
        diffInserted: "#16A394",
        diffDeleted: "#FF605E",
      }),
      dark: convertToShikiTheme({
        foreground: "#ffffff",
        constant: "#7F9CF5",
        string: "#71E8DF",
        comment: "#718096",
        keyword: "#71E8DF",
        parameter: "#71E8DF",
        function: "#7F9CF5",
        stringExpression: "#71E8DF",
        punctuation: "#FFFFFF",
        link: "#7F9CF5",
        number: "#71E8DF",
        property: "#71E8DF",
        highlight: "#71e8de2e",
        highlightHover: "#71e8de1b",
        highlightBorder: "#71E8DF",
        diffInserted: "#16A394",
        diffDeleted: "#FC8280",
      }),
    },
  },
  clerk: {
    id: "clerk",
    name: "Clerk",
    background: {
      from: "#000000",
      to: "#000000",
    },
    icon: ClerkLogo,
    iconUrl: `${BASE_URL}${ClerkLogoUrl.src}`,
    partner: true,
    lineNumbers: true,
    font: "geist-mono",
    syntax: {
      light: convertToShikiTheme({
        foreground: "#131316",
        constant: "#22c543",
        string: "#00aee3",
        comment: "#9394a1",
        keyword: "#6c47ff",
        parameter: "#22c543",
        function: "#6c47ff",
        stringExpression: "#00aee3",
        punctuation: "#747686",
        link: "#22c543",
        number: "#22c543",
        property: "#22c543",
        highlight: "#00aee313",
        highlightHover: "#00aee306",
        highlightBorder: "#00000000",
        diffInserted: "#22c543",
        diffDeleted: "#FF605E",
      }),
      dark: convertToShikiTheme({
        foreground: "#ffffff",
        constant: "#86ef9b",
        string: "#5de3ff",
        comment: "#9394a1",
        keyword: "#bab1ff",
        parameter: "#86ef9b",
        function: "#bab1ff",
        stringExpression: "#5de3ff",
        punctuation: "#b7b8c2",
        link: "#86ef9b",
        number: "#86ef9b",
        property: "#86ef9b",
        highlight: "#5de3ff1a",
        highlightHover: "#5de3ff0d",
        highlightBorder: "#00000000",
        diffInserted: "#86ef9b",
        diffDeleted: "#E17271",
      }),
    },
  },
  elevenlabs: {
    id: "elevenlabs",
    name: "ElevenLabs",
    background: {
      from: "#000",
      to: "#000",
    },
    icon: ElevenLabsLogo,
    iconUrl: `${BASE_URL}${ElevenLabsLogoUrl.src}`,
    font: "roboto-mono",
    partner: true,
    syntax: {
      light: convertToShikiTheme({
        foreground: "#1c1c1c",
        constant: "#4c3fff",
        string: "#00a890",
        comment: "hsla(0, 0%, 40%,1)",
        keyword: "#1c1c1c",
        parameter: "#4c3fff",
        function: "#e85c5c",
        stringExpression: "#00a890",
        punctuation: "#1c1c1c",
        link: "#4c3fff",
        number: "#4c3fff",
        property: "#4c3fff",
        highlight: "hsla(244, 100%, 62%, 0.09)",
        highlightHover: "hsla(244, 100%, 62%, 0.05)",
        highlightBorder: "hsla(244, 100%, 62%, 0.45)",
        diffInserted: "#00a890",
        diffDeleted: "#FF605E",
      }),
      dark: convertToShikiTheme({
        foreground: "#fff",
        constant: "#8F8FFF",
        string: "#a1ffe0",
        comment: "hsla(0, 0%, 63%,1)",
        keyword: "#fff9b2",
        parameter: "#8F8FFF",
        function: "#ff8080",
        stringExpression: "#A1FFE0",
        punctuation: "#fff",
        link: "#8F8FFF",
        number: "#8F8FFF",
        property: "#8F8FFF",
        highlight: "hsla(240, 100%, 78%, 0.09)",
        highlightHover: "hsla(240, 100%, 78%, 0.05)",
        highlightBorder: "hsla(240, 100%, 78%, 0.45)",
        diffInserted: "#a1ffe0",
        diffDeleted: "#ff8080",
      }),
    },
  },
  resend: {
    id: "resend",
    name: "Resend",
    background: {
      from: "#B1B1B1",
      to: "#181818",
    },
    icon: ResendLogo,
    iconUrl: `${BASE_URL}${ResendLogoUrl.src}`,
    font: "commit-mono",
    partner: true,
    syntax: {
      light: convertToShikiTheme({
        foreground: "#111111",
        constant: "#666666",
        parameter: "#666666",
        stringExpression: "#666666",
        keyword: "#666666",
        function: "#111111",
        punctuation: "#666666",
        string: "#666666",
        comment: "#999999",
        link: "#666666",
        number: "#111111",
        property: "#666666",
        diffInserted: "#666666",
        diffDeleted: "#666666",
      }),
      dark: convertToShikiTheme({
        foreground: "#ffffff",
        constant: "#a7a7a7",
        parameter: "#a7a7a7",
        stringExpression: "#a7a7a7",
        keyword: "#a7a7a7",
        function: "#ffffff",
        punctuation: "#a7a7a7",
        string: "#a7a7a7",
        comment: "#666666",
        link: "#a7a7a7",
        number: "#ffffff",
        property: "#a7a7a7",
        diffInserted: "#a7a7a7",
        diffDeleted: "#a7a7a7",
      }),
    },
  },
  triggerdev: {
    id: "triggerdev",
    name: "Trigger.dev",
    background: {
      from: "#121317",
      to: "#121317",
    },
    icon: TriggerLogo,
    iconUrl: `${BASE_URL}${TriggerLogoUrl.src}`,
    font: "geist-mono",
    partner: true,
    syntax: {
      light: convertToShikiTheme({
        foreground: "#2E2E4B",
        constant: "#1E1E1E",
        string: "#262626",
        comment: "#5F6570",
        keyword: "#B114D3",
        parameter: "#404040",
        function: "#5C40FF",
        stringExpression: "#0879E2",
        punctuation: "#333333",
        link: "#1A1A1A",
        number: "#262626",
        property: "#222222",
      }),
      dark: convertToShikiTheme({
        foreground: "#CCCBFF",
        constant: "#9C9AF2",
        string: "#AFEC73",
        comment: "#5F6570",
        keyword: "#E888F8",
        parameter: "#CCCBFF",
        function: "#9684FF",
        stringExpression: "#AFEC73",
        punctuation: "#878C99",
        link: "#826DFF",
        number: "#b5cea8",
        property: "#CCCBFF",
      }),
    },
  },
  nuxt: {
    id: "nuxt",
    name: "Nuxt",
    background: {
      from: "#292D3E",
      to: "#292D3E",
    },
    icon: NuxtLogo,
    iconUrl: `${BASE_URL}${NuxtLogoUrl.src}`,
    font: "geist-mono",
    partner: true,
    lineNumbers: true,
    syntax: {
      light: convertToShikiTheme({
        foreground: "#90A4AE",
        constant: "#39ADB5",
        string: "#91B859",
        comment: "#90A4AE",
        keyword: "#39ADB5",
        parameter: "#90A4AE",
        function: "#6182B8",
        stringExpression: "#E53935",
        punctuation: "#39ADB5",
        link: "#80CBC4",
        number: "#F76D47",
        property: "#E53935",
        highlight: "rgba(128, 203, 196, 0.25)",
        highlightHover: "rgba(128, 203, 196, 0.15)",
        highlightBorder: "#80CBC4",
        diffInserted: "#91B859",
        diffDeleted: "#E53935",
      }),
      dark: convertToShikiTheme({
        foreground: "#babed8",
        constant: "#BABED8",
        string: "#C3E88D",
        comment: "#676E95",
        keyword: "#C793EA",
        parameter: "#babed8",
        function: "#82AAFF",
        stringExpression: "#f07178",
        punctuation: "#89DDFF",
        link: "#80CBC4",
        number: "#F78C6C",
        property: "#f07178",
        highlight: "rgba(113, 124, 180, 0.31)",
        highlightHover: "rgba(113, 124, 180, 0.2)",
        highlightBorder: "#80CBC4",
        diffInserted: "#C3E88D",
        diffDeleted: "#f07178",
      }),
    },
  },
  browserbase: {
    id: "browserbase",
    name: "Browserbase",
    background: {
      from: "#FF4500",
      to: "#000000",
    },
    icon: BrowserbaseLogo,
    iconUrl: `${BASE_URL}${BrowserbaseLogoUrl.src}`,
    partner: true,
    font: "space-mono",
    lineNumbers: true,
    syntax: {
      light: convertToShikiTheme({
        foreground: "#000",
        constant: "#FF4500",
        string: "#FF6B35",
        comment: "#6B7280",
        keyword: "#FF4500",
        parameter: "#FF4500",
        function: "#000000",
        stringExpression: "hsla(42.948, 100%, 61.838%)",
        punctuation: "#374151",
        link: "#FF4500",
        number: "#FF4500",
        property: "#FF4500",
        highlight: "rgba(255, 69, 0, 0.1)",
        highlightBorder: "#FF4500",
        highlightHover: "rgba(255, 69, 0, 0.05)",
        diffInserted: "#10B981",
        diffDeleted: "#EF4444",
      }),
      dark: convertToShikiTheme({
        foreground: "#FFFFFF",
        constant: "#FF6B35",
        string: "#FFB800",
        comment: "#6B7280",
        keyword: "#FF4500",
        parameter: "#FF6B35",
        function: "#FFFFFF",
        stringExpression: "#FFB800",
        punctuation: "#D1D5DB",
        link: "#FF6B35",
        number: "#FF6B35",
        property: "#FF6B35",
        highlight: "rgba(255, 107, 53, 0.15)",
        highlightBorder: "#FF6B35",
        highlightHover: "rgba(255, 107, 53, 0.08)",
        diffInserted: "#34D399",
        diffDeleted: "#F87171",
      }),
    },
  },
  cloudflare: {
    id: "cloudflare",
    name: "Cloudflare",
    background: {
      from: "#0C0C0C",
      to: "#0C0C0C",
    },
    icon: CloudflareLogo,
    iconUrl: `${BASE_URL}${CloudflareLogoUrl.src}`,
    font: "ibm-plex-mono",
    partner: true,
    lineNumbers: true,
    syntax: {
      light: convertToShikiTheme({
        foreground: "#521000",
        constant: "#5a11cc",
        string: "#0876d9",
        comment: "#52100080",
        keyword: "#d94008",
        parameter: "#c77700",
        function: "#7612cc",
        stringExpression: "#0876d9",
        punctuation: "#52100080",
        link: "#0876d9",
        number: "#5a11cc",
        property: "#5a11cc",
        highlight: "rgba(255, 80, 10, 0.1)",
        highlightHover: "rgba(255, 80, 10, 0.05)",
        highlightBorder: "#FF500A",
        diffInserted: "#00C853",
        diffDeleted: "#d94008",
      }),
      dark: convertToShikiTheme({
        foreground: "#E8E8E8",
        constant: "#79b8ff",
        string: "#0A95FF",
        comment: "#888888",
        keyword: "#FF7F4D",
        parameter: "#FFB366",
        function: "#B084FF",
        stringExpression: "#0A95FF",
        punctuation: "#AAAAAA",
        link: "#0A95FF",
        number: "#79b8ff",
        property: "#79b8ff",
        highlight: "rgba(255, 80, 10, 0.15)",
        highlightHover: "rgba(255, 80, 10, 0.08)",
        highlightBorder: "#FF500A",
        diffInserted: "#00C853",
        diffDeleted: "#FF7F4D",
      }),
    },
  },
  gemini: {
    id: "gemini",
    name: "Gemini",
    background: {
      from: "#16181d",
      to: "#16181d",
    },
    icon: GeminiLogo,
    iconUrl: `${BASE_URL}${GeminiLogoUrl.src}`,
    font: "google-sans-code",
    partner: true,
    syntax: {
      light: convertToShikiTheme({
        foreground: "#37474f",
        constant: "#37474f",
        string: "#188038",
        comment: "hsla(0, 0%, 40%,1)",
        keyword: "#1967d2",
        parameter: "#37474f",
        function: "#37474f",
        stringExpression: "#188038",
        punctuation: "#37474f",
        link: "#4c3fff",
        number: "#4c3fff",
        property: "#4c3fff",
        highlight: "hsla(244, 100%, 62%, 0.09)",
        highlightHover: "hsla(244, 100%, 62%, 0.05)",
        highlightBorder: "hsla(244, 100%, 62%, 0.45)",
        diffInserted: "#188038",
        diffDeleted: "#FF605E",
      }),
      dark: convertToShikiTheme({
        foreground: "#abb2bf",
        constant: "#56b6c2",
        string: "#98c379",
        comment: "#5c6370",
        keyword: "#5c9dc7",
        parameter: "#d19a66",
        function: "#98c379",
        stringExpression: "#98c379",
        punctuation: "#abb2bf",
        link: "#5c9dc7",
        number: "#56b6c2",
        property: "#56b6c2",
        highlight: "rgba(92, 157, 199, 0.15)",
        highlightHover: "rgba(92, 157, 199, 0.1)",
        highlightBorder: "#5c9dc7",
        diffInserted: "#98c379",
        diffDeleted: "#e06c75",
      }),
    },
  },
  stripe: {
    id: "stripe",
    name: "Stripe",
    background: {
      from: "#0a2540",
      to: "#0a2540",
    },
    icon: StripeLogo,
    iconUrl: `${BASE_URL}${StripeLogoUrl.src}`,
    partner: true,
    font: "source-code-pro",
    lineNumbers: true,
    syntax: {
      dark: convertToShikiTheme({
        foreground: "#FFFFFF",
        constant: "#FFFFFF",
        string: "#ffa956",
        comment: "#a9bcce",
        keyword: "#8095ff",
        parameter: "#FF6B35",
        function: "#00d4ff",
        stringExpression: "#ffa956",
        punctuation: "#FFFFFF",
        link: "#ffa956",
        number: "#ffa956",
        property: "#1abdc0",
        objectLiteral: "#1abdc0",
        highlight: "rgba(255, 107, 53, 0.15)",
        highlightBorder: "#FF6B35",
        highlightHover: "rgba(255, 107, 53, 0.08)",
        diffInserted: "#34D399",
        diffDeleted: "#F87171",
      }),
    },
  },
  wrapped: {
    id: "wrapped",
    name: "Wrapped",
    background: {
      from: "#ea580c",
      to: "#f97316",
    },
    font: "jetbrains-mono",
    lineNumbers: false,
    syntax: {
      light: convertToShikiTheme({
        foreground: "#1a1a1a",
        constant: "#c2410c",
        string: "#c2410c",
        comment: "rgba(0, 0, 0, 0.6)",
        keyword: "#ea580c",
        parameter: "#ea580c",
        function: "#1a1a1a",
        stringExpression: "#ea580c",
        punctuation: "rgba(0, 0, 0, 0.6)",
        link: "#ea580c",
        number: "#ea580c",
        property: "#ea580c",
        highlight: "rgba(234, 88, 12, 0.1)",
        highlightBorder: "#ea580c",
        highlightHover: "rgba(234, 88, 12, 0.05)",
        diffInserted: "#16a34a",
        diffDeleted: "#dc2626",
      }),
      dark: convertToShikiTheme({
        foreground: "#e7e5e4",
        constant: "#fb923c",
        string: "#fdba74",
        comment: "rgba(255, 255, 255, 0.4)",
        keyword: "#f97316",
        parameter: "#fb923c",
        function: "#fafaf9",
        stringExpression: "#fed7aa",
        punctuation: "rgba(255, 255, 255, 0.4)",
        link: "#fb923c",
        number: "#fb923c",
        property: "#fb923c",
        highlight: "rgba(251, 146, 60, 0.15)",
        highlightBorder: "#fb923c",
        highlightHover: "rgba(251, 146, 60, 0.08)",
        diffInserted: "#4ade80",
        diffDeleted: "#f87171",
      }),
    },
  },
  bitmap: {
    id: "bitmap",
    name: "Bitmap",
    background: {
      from: "#881616",
      to: "#F1393F",
    },
    syntax: {
      light: convertToShikiTheme({
        foreground: "#685B5B",
        constant: "#C90028",
        string: "#836250",
        comment: "#B83737",
        keyword: "#D63838",
        parameter: "#5E4040",
        function: "#C90028",
        stringExpression: "#836250",
        punctuation: "#BE3B3B",
        link: "#BE3B3B",
        number: "#C94F0A",
        property: "#D15510",
        highlight: "hsla(348, 100%, 39%, 0.08)",
        highlightBorder: "#C90028",
        highlightHover: "hsla(348, 100%, 39%, 0.05)",
        diffInserted: "#00A67D",
        diffDeleted: "#FF605E",
      }),
      dark: convertToShikiTheme({
        foreground: "#FEFDFD",
        constant: "#E42B37",
        string: "#E42B37",
        comment: "#996B6D",
        keyword: "#EB6F6F",
        parameter: "#C88E8E",
        function: "#E42B37",
        stringExpression: "#EBB99D",
        punctuation: "#EB6F6F",
        link: "#EB6F6F",
        number: "#E42B37",
        property: "#E42B37",
        highlight: "hsla(355, 76%, 63%, 0.25)",
        highlightBorder: "#E42B37",
        highlightHover: "hsla(355, 76%, 63%, 0.16)",
        diffInserted: "#00DE55",
        diffDeleted: "#FF605E",
      }),
    },
  },
  noir: {
    id: "noir",
    name: "Noir",
    background: {
      from: "#B1B1B1",
      to: "#181818",
    },
    syntax: {
      light: convertToShikiTheme({
        foreground: "#111111",
        constant: "#666666",
        parameter: "#666666",
        stringExpression: "#666666",
        keyword: "#666666",
        function: "#111111",
        punctuation: "#666666",
        string: "#666666",
        comment: "#999999",
        link: "#666666",
        number: "#111111",
        property: "#666666",
        diffInserted: "#666666",
        diffDeleted: "#666666",
      }),
      dark: convertToShikiTheme({
        foreground: "#ffffff",
        constant: "#a7a7a7",
        parameter: "#a7a7a7",
        stringExpression: "#a7a7a7",
        keyword: "#a7a7a7",
        function: "#ffffff",
        punctuation: "#a7a7a7",
        string: "#a7a7a7",
        comment: "#666666",
        link: "#a7a7a7",
        number: "#ffffff",
        property: "#a7a7a7",
        diffInserted: "#a7a7a7",
        diffDeleted: "#a7a7a7",
      }),
    },
  },
  ice: {
    id: "ice",
    name: "Ice",
    background: {
      from: "#fff",
      to: "#80deea",
    },
    syntax: {
      light: convertToShikiTheme({
        foreground: "#1C1B29",
        constant: "#00B0E9",
        string: "#6ABAD8",
        comment: "#BDC0C1",
        keyword: "#81909D",
        parameter: "#1E3C78",
        function: "#1E3C78",
        stringExpression: "#7BBCD8",
        punctuation: "#1E3C78",
        link: "#1E3C78",
        number: "#00B0E9",
        property: "#00B0E9",
        highlight: "rgba(0,167,219,0.1)",
        highlightBorder: "#00B0E9",
        highlightHover: "rgba(0,167,219,0.05)",
        diffInserted: "#00B0E9",
        diffDeleted: "#FF605E",
      }),
      dark: convertToShikiTheme({
        foreground: "#FFFFFF",
        constant: "#92DEF6",
        string: "#92DEF6",
        comment: "#5C6A70",
        keyword: "#BFC4C9",
        parameter: "#778CB6",
        function: "#778CB6",
        stringExpression: "#89C3DC",
        punctuation: "#778CB6",
        link: "#778CB6",
        number: "#00B0E9",
        property: "#00B0E9",
        highlight: "rgba(146,222,246,0.14)",
        highlightBorder: "#92DEF6",
        highlightHover: "rgba(146,222,246,0.09)",
        diffInserted: "#00B0E9",
        diffDeleted: "#FF605E",
      }),
    },
  },
  sand: {
    id: "sand",
    name: "Sand",
    background: {
      from: "#EED5B6",
      to: "#AF8856",
    },
    syntax: {
      light: convertToShikiTheme({
        foreground: "#262217",
        constant: "#A28C4E",
        string: "#A28C4E",
        comment: "#C4B39C",
        keyword: "#906937",
        parameter: "#DA8744",
        function: "#DA8744",
        stringExpression: "#C57416",
        punctuation: "#DA8744",
        link: "#DA8744",
        number: "#A28C4E",
        property: "#A28C4E",
        highlight: "rgba(218,135,68,0.1)",
        highlightBorder: "#DA8744",
        highlightHover: "rgba(218,135,68,0.05)",
        diffInserted: "#A28C4E",
        diffDeleted: "#FF605E",
      }),
      dark: convertToShikiTheme({
        foreground: "#FFFFFF",
        constant: "#C2B181",
        string: "#C2B181",
        comment: "#837E77",
        keyword: "#D3B48C",
        parameter: "#F4A361",
        function: "#F4A361",
        stringExpression: "#EED5B8",
        punctuation: "#F4A361",
        link: "#F4A361",
        number: "#C2B181",
        property: "#C2B181",
        highlight: "rgba(244,163,97,0.14)",
        highlightBorder: "#F4A361",
        highlightHover: "rgba(244,163,97,0.09)",
        diffInserted: "#A28C4E",
        diffDeleted: "#FF605E",
      }),
    },
  },
  forest: {
    id: "forest",
    name: "Forest",
    background: {
      from: "#506853",
      to: "#213223",
    },
    syntax: {
      light: convertToShikiTheme({
        foreground: "#262217",
        constant: "#55725A",
        string: "#828069",
        comment: "#869288",
        keyword: "#6A8458",
        parameter: "#6B8F71",
        function: "#4B8042",
        stringExpression: "#9D891C",
        punctuation: "#78876E",
        link: "#78876E",
        number: "#78876E",
        property: "#2E382F",
        highlight: "rgba(75,148,66,0.12)",
        highlightBorder: "#4B9442",
        highlightHover: "rgba(75,148,66,0.07)",
        diffInserted: "#4B9442",
        diffDeleted: "#FF605E",
      }),
      dark: convertToShikiTheme({
        foreground: "#FFFFFF",
        constant: "#6B8F71",
        string: "#C9C8BC",
        comment: "#555E56",
        keyword: "#AAB4A3",
        parameter: "#6B8F71",
        function: "#87B882",
        stringExpression: "#CCBD6E",
        punctuation: "#AAB4A3",
        link: "#AAB4A3",
        number: "#AAB4A3",
        property: "#C9C7BC",
        highlight: "rgba(170,180,163,0.14)",
        highlightBorder: "#6B8F71",
        highlightHover: "rgba(170,180,163,0.09)",
        diffInserted: "#6B8F71",
        diffDeleted: "#FF605E",
      }),
    },
  },
  mono: {
    id: "mono",
    name: "Mono",
    background: {
      from: "#333",
      to: "#181818",
    },
    syntax: {
      light: convertToShikiTheme({
        foreground: "#111111",
        constant: "#666666",
        parameter: "#666666",
        stringExpression: "#666666",
        keyword: "#666666",
        function: "#111111",
        punctuation: "#666666",
        string: "#666666",
        comment: "#999999",
        link: "#666666",
        number: "#111111",
        property: "#666666",
        diffInserted: "#666666",
        diffDeleted: "#666666",
      }),
      dark: convertToShikiTheme({
        foreground: "#ffffff",
        constant: "#a7a7a7",
        parameter: "#a7a7a7",
        stringExpression: "#a7a7a7",
        keyword: "#a7a7a7",
        function: "#ffffff",
        punctuation: "#a7a7a7",
        string: "#a7a7a7",
        comment: "#666666",
        link: "#a7a7a7",
        number: "#ffffff",
        property: "#a7a7a7",
        diffInserted: "#a7a7a7",
        diffDeleted: "#a7a7a7",
      }),
    },
  },
  breeze: {
    id: "breeze",
    name: "Breeze",
    background: {
      from: "#CF2F98",
      to: "#6A3DEC",
    },
    syntax: {
      light: convertToShikiTheme({
        foreground: "#434447",
        constant: "#0B7880",
        parameter: "#C44170",
        function: "#C44170",
        keyword: "#496EB8",
        stringExpression: "#886594",
        punctuation: "#C44170",
        string: "#886594",
        comment: "#8C828B",
        link: "#625B6B",
        number: "#24805E",
        property: "#0B7880",
        diffInserted: "#00A67D",
        diffDeleted: "#C44170",
      }),
      dark: convertToShikiTheme({
        foreground: "#FFFFFF",
        constant: "#49E8F2",
        parameter: "#F8518D",
        function: "#F8518D",
        keyword: "#6599FF",
        stringExpression: "#E9AEFE",
        punctuation: "#F8518D",
        string: "#E9AEFE",
        comment: "#8A757D",
        link: "#ECFEEF",
        number: "#55E7B2",
        property: "#49E8F2",
        diffInserted: "#00A67D",
        diffDeleted: "#F8518D",
      }),
    },
  },
  candy: {
    id: "candy",
    name: "Candy",
    background: {
      from: "#A58EFB",
      to: "#E9BFF8",
    },
    syntax: {
      light: convertToShikiTheme({
        foreground: "#434447",
        constant: "#2286A6",
        string: "#B2762E",
        comment: "#8D949B",
        keyword: "#DC155E",
        parameter: "#009033",
        function: "#009033",
        stringExpression: "#B2762E",
        punctuation: "#d15a8b",
        link: "#d15a8b",
        number: "#676DFF",
        property: "#2286A6",
        diffInserted: "#009033",
        diffDeleted: "#FF605E",
      }),
      dark: convertToShikiTheme({
        foreground: "#FFFFFF",
        constant: "#1AC8FF",
        string: "#DFD473",
        comment: "#807796",
        keyword: "#FF659C",
        parameter: "#1AC8FF",
        function: "#73DFA5",
        stringExpression: "#DFD473",
        punctuation: "#FF659C",
        link: "#FF659C",
        number: "#7A7FFD",
        property: "#1AC8FF",
        diffInserted: "#73DFA5",
        diffDeleted: "#FF605E",
      }),
    },
  },
  crimson: {
    id: "crimson",
    name: "Crimson",
    background: {
      from: "#FF6363",
      to: "#733434",
    },
    syntax: {
      light: convertToShikiTheme({
        foreground: "#685B5B",
        constant: "#C94F0A",
        string: "#836250",
        comment: "#978A8A",
        keyword: "#BE3B3B",
        parameter: "#9E7070",
        function: "#9E7070",
        stringExpression: "#836250",
        punctuation: "#BE3B3B",
        link: "#BE3B3B",
        number: "#C94F0A",
        property: "#D15510",
        diffInserted: "#00A67D",
        diffDeleted: "#BE3B3B",
      }),
      dark: convertToShikiTheme({
        foreground: "#FEFDFD",
        constant: "#D15510",
        string: "#EBB99D",
        comment: "#895E60",
        keyword: "#EB6F6F",
        parameter: "#C88E8E",
        function: "#C88E8E",
        stringExpression: "#EBB99D",
        punctuation: "#EB6F6F",
        link: "#EB6F6F",
        number: "#FDA97A",
        property: "#D15510",
        diffInserted: "#6FEB71",
        diffDeleted: "#EB6F6F",
      }),
    },
  },
  falcon: {
    id: "falcon",
    name: "Falcon",
    background: {
      from: "#BDE3EC",
      to: "#363654",
    },
    syntax: {
      light: convertToShikiTheme({
        foreground: "#464C65",
        constant: "#839AA7",
        string: "#506483",
        comment: "#9DA4AD",
        keyword: "#5C827D",
        parameter: "#6A7C9F",
        function: "#6A7C9F",
        stringExpression: "#46615D",
        punctuation: "#5C827D",
        link: "#5C827D",
        number: "#AE6A65",
        property: "#839AA7",
        diffInserted: "#5C827D",
        diffDeleted: "#AE6A65",
      }),
      dark: convertToShikiTheme({
        foreground: "#FFFFFF",
        constant: "#799DB1",
        string: "#6A8697",
        comment: "#6D7E88",
        keyword: "#9AB6B2",
        parameter: "#6D88BB",
        function: "#6D88BB",
        stringExpression: "#789083",
        punctuation: "#9AB6B2",
        link: "#9AB6B2",
        number: "#BD9C9C",
        property: "#799DB1",
        diffInserted: "#9AB6B2",
        diffDeleted: "#BD9C9C",
      }),
    },
  },
  meadow: {
    id: "meadow",
    name: "Meadow",
    background: {
      from: "#59D499",
      to: "#A0872D",
    },
    syntax: {
      light: convertToShikiTheme({
        foreground: "#54594D",
        constant: "#B6781B",
        string: "#837E50",
        comment: "#72806E",
        keyword: "#049649",
        parameter: "#798B52",
        function: "#798B52",
        stringExpression: "#837E50",
        punctuation: "#049649",
        link: "#049649",
        number: "#2C8801",
        property: "#B6781B",
        diffInserted: "#049649",
        diffDeleted: "#B6781B",
      }),
      dark: convertToShikiTheme({
        foreground: "#FFFFFF",
        constant: "#E4B165",
        string: "#E9EB9D",
        comment: "#708B6C",
        keyword: "#6DD79F",
        parameter: "#B3D767",
        function: "#B3D767",
        stringExpression: "#E9EB9D",
        punctuation: "#6DD79F",
        link: "#6DD79F",
        number: "#46B114",
        property: "#E4B165",
        diffInserted: "#B3D767",
        diffDeleted: "#E4B165",
      }),
    },
  },
  midnight: {
    id: "midnight",
    name: "Midnight",
    background: {
      from: "#4CC8C8",
      to: "#202033",
    },
    syntax: {
      light: convertToShikiTheme({
        foreground: "#434447",
        constant: "#766599",
        string: "#5F758F",
        comment: "#78808C",
        keyword: "#587678",
        parameter: "#2F788F",
        function: "#2F788F",
        stringExpression: "#5F758F",
        punctuation: "#587678",
        link: "#5A797A",
        number: "#2D8264",
        property: "#766599",
        diffInserted: "#2D8264",
        diffDeleted: "#766599",
      }),
      dark: convertToShikiTheme({
        foreground: "#FFFFFF",
        constant: "#9681C2",
        string: "#6D86A4",
        comment: "#4A4C56",
        keyword: "#7DA9AB",
        parameter: "#51D0F8",
        function: "#51D0F8",
        stringExpression: "#6D86A4",
        punctuation: "#7DA9AB",
        link: "#7DA9AB",
        number: "#75D2B1",
        property: "#9681C2",
        diffInserted: "#75D2B1",
        diffDeleted: "#9681C2",
      }),
    },
  },
  raindrop: {
    id: "raindrop",
    name: "Raindrop",
    background: {
      from: "#8EC7FB",
      to: "#1C55AA",
    },
    syntax: {
      light: convertToShikiTheme({
        foreground: "#687077",
        constant: "#007BA1",
        string: "#507683",
        comment: "#6E7780",
        keyword: "#008DAC",
        parameter: "#4F9488",
        function: "#4F9488",
        stringExpression: "#507683",
        punctuation: "#008DAC",
        link: "#008DAC",
        number: "#7459E1",
        property: "#007BA1",
        diffInserted: "#008DAC",
        diffDeleted: "#7459E1",
      }),
      dark: convertToShikiTheme({
        foreground: "#E4F2FF",
        constant: "#008BB7",
        string: "#9DD8EB",
        comment: "#6C808B",
        keyword: "#2ED9FF",
        parameter: "#1AD6B5",
        function: "#1AD6B5",
        stringExpression: "#9DD8EB",
        punctuation: "#2ED9FF",
        link: "#2ED9FF",
        number: "#9984EE",
        property: "#008BB7",
        diffInserted: "#2ED9FF",
        diffDeleted: "#9984EE",
      }),
    },
  },
  sunset: {
    id: "sunset",
    name: "Sunset",
    background: {
      from: "#FFCF73",
      to: "#FF7A2F",
    },
    syntax: {
      light: convertToShikiTheme({
        foreground: "#737568",
        constant: "#AD5A78",
        string: "#8C703C",
        comment: "#7A7055",
        keyword: "#A1642C",
        parameter: "#807410",
        function: "#807410",
        stringExpression: "#8C703C",
        punctuation: "#A1642C",
        link: "#A1642C",
        number: "#856F00",
        property: "#AD5A78",
        diffInserted: "#856F00",
        diffDeleted: "#AD5A78",
      }),
      dark: convertToShikiTheme({
        foreground: "#FFFFFF",
        constant: "#E978A1",
        string: "#F9D38C",
        comment: "#878572",
        keyword: "#FFAF65",
        parameter: "#E2D66B",
        function: "#E2D66B",
        stringExpression: "#F9D38C",
        punctuation: "#FFAF65",
        link: "#FFAF65",
        number: "#E7CF55",
        property: "#E978A1",
        diffInserted: "#E7CF55",
        diffDeleted: "#E978A1",
      }),
    },
  },
};

const themeAtom = atomWithHash<Theme>(
  "theme",
  (() => {
    if (typeof window !== "undefined") {
      try {
        // Check if theme is stored in localStorage
        const codeTheme = localStorage.getItem("codeTheme");
        if (codeTheme && codeTheme in THEMES) {
          return THEMES[codeTheme as keyof typeof THEMES];
        }
      } catch (error) {
        console.log("Could not get theme from localStorage", error);
      }
    }
    return THEMES.second; // Fallback to default theme
  })(),
  {
    serialize(value) {
      return Object.keys(THEMES).find((key) => THEMES[key].name.toLowerCase() === value.name.toLowerCase()) || "";
    },
    deserialize(key) {
      if (key && key in THEMES) {
        try {
          localStorage.setItem("codeTheme", key);
        } catch (error) {
          console.log("Could not set theme in localStorage", error);
        }
        return THEMES[key as keyof typeof THEMES];
      } else {
        return THEMES.second;
      }
    },
  },
);

const darkModeAtom = atomWithHash<boolean>("darkMode", false);

const themeDarkModeAtom = atom<boolean>((get) => {
  const theme = get(themeAtom);
  const hasLight = !!theme.syntax.light;
  const hasDark = !!theme.syntax.dark;

  // If theme only has dark mode, force dark
  if (hasDark && !hasLight) return true;

  // If theme only has light mode, force light
  if (hasLight && !hasDark) return false;

  // If theme has both, use user preference
  return get(darkModeAtom);
});

const themeCSSAtom = atom<CSSProperties>((get) => {
  const isDark = get(themeDarkModeAtom);
  const syntax = get(themeAtom).syntax;
  return (isDark ? syntax.dark : syntax.light) || syntax.light || syntax.dark || {};
});

const themeBackgroundAtom = atom<string>((get) => {
  const { from, to } = get(themeAtom).background;
  return `linear-gradient(140deg, ${from}, ${to})`;
});

const themeFontAtom = atom<Font | null>((get) => get(themeAtom)?.font || "jetbrains-mono");

const themeLineNumbersAtom = atom<boolean>((get) => {
  const theme = get(themeAtom);
  // If theme explicitly sets lineNumbers, use that value; otherwise use user preference
  if (theme.lineNumbers !== undefined) {
    return theme.lineNumbers;
  }
  return get(showLineNumbersAtom) ?? false;
});

const unlockedThemesAtom = atomWithStorage<Theme["id"][]>("unlockedThemes", []);

export {
  darkModeAtom,
  themeAtom,
  themeBackgroundAtom,
  themeCSSAtom,
  themeDarkModeAtom,
  themeFontAtom,
  themeLineNumbersAtom,
  unlockedThemesAtom,
};
