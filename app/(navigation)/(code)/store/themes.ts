import { atom } from "jotai";
import { atomWithHash } from "jotai-location";
import { atomWithStorage } from "jotai/utils";
import { CSSProperties } from "react";
import { Font } from "./font";
import VercelLogo from "../assets/vercel.svg";
import VercelLogoUrl from "../assets/vercel.svg?url";
import RabbitLogo from "../assets/rabbit.svg";
import RabbitLogoUrl from "../assets/rabbit.svg?url";
import SupabaseLogo from "../assets/supabase.svg";
import SupabaseLogoUrl from "../assets/supabase.svg?url";
import TailwindLogo from "../assets/tailwind.svg";
import TailwindLogoUrl from "../assets/tailwind.svg?url";
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
  highlight?: string;
  highlightBorder?: string;
  highlightHover?: string;
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
  syntax: {
    light: CSSProperties;
    dark: CSSProperties;
  };
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
    font: "ibm-plex-mono",
    syntax: {
      light: convertToShikiTheme({
        foreground: "#171717",
        constant: "#009a55",
        string: "#ededed",
        comment: "#a6a6a6",
        keyword: "#a0a0a0",
        parameter: "#ededed",
        function: "#009a55",
        stringExpression: "#009a55",
        punctuation: "#a0a0a0",
        link: "#171717",
        number: "#171717",
        property: "#009a55",
        highlight: "oklch(0.88 0.22 153.28 / 0.12)",
        highlightHover: "oklch(0.88 0.22 153.28 / 0.06)",
        highlightBorder: "#009a55",
      }),
      dark: convertToShikiTheme({
        foreground: "#ededed",
        constant: "#3ecf8e",
        string: "#ededed",
        comment: "#707070",
        keyword: "#a0a0a0",
        parameter: "#ededed",
        function: "#3ecf8e",
        stringExpression: "#3ecf8e",
        punctuation: "#ededed",
        link: "#ededed",
        number: "#ededed",
        property: "#3ecf8e",
        highlight: "#232323",
        highlightHover: "#1D1D1D",
        highlightBorder: "#383838",
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
      }),
    },
  },
};

const themeAtom = atomWithHash<Theme>("theme", THEMES.candy, {
  serialize(value) {
    return Object.keys(THEMES).find((key) => THEMES[key].name.toLowerCase() === value.name.toLowerCase()) || "";
  },
  deserialize(key) {
    if (key) {
      return THEMES[key];
    } else {
      return THEMES.candy;
    }
  },
});

const darkModeAtom = atomWithHash<boolean>("darkMode", true);

const themeCSSAtom = atom<CSSProperties>((get) => get(themeAtom).syntax[get(darkModeAtom) ? "dark" : "light"]);

const themeBackgroundAtom = atom<string>((get) => {
  const { from, to } = get(themeAtom).background;
  return `linear-gradient(140deg, ${from}, ${to})`;
});

const themeFontAtom = atom<Font | null>((get) => get(themeAtom)?.font || "jetbrains-mono");

const themeLineNumbersAtom = atom<boolean>((get) => {
  return get(showLineNumbersAtom) ?? (get(themeAtom).lineNumbers || false);
});

const unlockedThemesAtom = atomWithStorage<Theme["id"][]>("unlockedThemes", []);

export {
  themeAtom,
  darkModeAtom,
  themeCSSAtom,
  themeBackgroundAtom,
  themeFontAtom,
  unlockedThemesAtom,
  themeLineNumbersAtom,
};
