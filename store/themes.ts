import { atom } from "jotai";
import { atomWithHash } from "jotai-location";
import { CSSProperties } from "react";
import { Font } from "./font";
import { createCssVariablesTheme } from "shiki/theme-css-variables";

export const shikiTheme = createCssVariablesTheme({
  name: "css-variables",
  variablePrefix: "--ray-",
  variableDefaults: {},
  fontStyle: true,
});

type ShikiSyntaxObject = {
  foreground: string;
  constant: string;
  string: string;
  comment: string;
  keyword: string;
  parameter: string;
  function: string;
  stringExpression: string;
  punctuation: string;
  link: string;
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
  } as CSSProperties;
}

export type Theme = {
  name: string;
  background: {
    from: string;
    to: string;
  };
  font?: Font;
  partner?: boolean;
  hidden?: boolean;
  syntax: {
    light: CSSProperties;
    dark: CSSProperties;
  };
};

export const THEMES: { [index: string]: Theme } = {
  vercel: {
    name: "Vercel",
    background: {
      from: "#232323",
      to: "#1F1F1F",
    },
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
      }),
    },
  },
  rabbit: {
    name: "Evil Rabbit",
    background: {
      from: "#000000",
      to: "#000000",
    },
    font: "geist-mono",
    partner: true,
    hidden: true,
    syntax: {
      light: convertToShikiTheme({
        foreground: "#111111",
        constant: "#111111",
        parameter: "#666666",
        stringExpression: "#111111",
        keyword: "#666666",
        function: "#111111",
        punctuation: "#666666",
        string: "#666666",
        comment: "#999999",
        link: "#666666",
      }),
      dark: convertToShikiTheme({
        foreground: "#ffffff",
        constant: "#ffffff",
        parameter: "#a7a7a7",
        stringExpression: "#ffffff",
        keyword: "#a7a7a7",
        function: "#ffffff",
        punctuation: "#a7a7a7",
        string: "#a7a7a7",
        comment: "#666666",
        link: "#a7a7a7",
      }),
    },
  },
  mono: {
    name: "Mono",
    background: {
      from: "#333",
      to: "#181818",
    },
    syntax: {
      light: convertToShikiTheme({
        foreground: "#111111",
        constant: "#111111",
        parameter: "#666666",
        stringExpression: "#111111",
        keyword: "#666666",
        function: "#111111",
        punctuation: "#666666",
        string: "#666666",
        comment: "#999999",
        link: "#666666",
      }),
      dark: convertToShikiTheme({
        foreground: "#ffffff",
        constant: "#ffffff",
        parameter: "#a7a7a7",
        stringExpression: "#ffffff",
        keyword: "#a7a7a7",
        function: "#ffffff",
        punctuation: "#a7a7a7",
        string: "#a7a7a7",
        comment: "#666666",
        link: "#a7a7a7",
      }),
    },
  },
  breeze: {
    name: "Breeze",
    background: {
      from: "rgba(207,47,152,1)",
      to: "rgba(106,61,236,1)",
    },
    syntax: {
      light: convertToShikiTheme({
        foreground: "#434447",
        constant: "#F8518D",
        parameter: "#C44170",
        function: "#C44170",
        keyword: "#496EB8",
        stringExpression: "#24805E",
        punctuation: "#C44170",
        string: "#886594",
        comment: "#8C828B",
        link: "#625B6B",
      }),
      dark: convertToShikiTheme({
        foreground: "#FFFFFF",
        constant: "#F8518D",
        parameter: "#F8518D",
        function: "#F8518D",
        keyword: "#6599FF",
        stringExpression: "#E9AEFE",
        punctuation: "#F8518D",
        string: "#E9AEFE",
        comment: "#8A757D",
        link: "#ECFEEF",
      }),
    },
  },
  candy: {
    name: "Candy",
    background: {
      from: "rgba(165,142,251,1)",
      to: "rgba(233,191,248,1)",
    },
    syntax: {
      light: convertToShikiTheme({
        foreground: "#434447",
        constant: "#676DFF",
        string: "#B2762E",
        comment: "#8D949B",
        keyword: "#DC155E",
        parameter: "#009033",
        function: "#2286A6",
        stringExpression: "#D35A35",
        punctuation: "#d15a8b",
        link: "#d15a8b",
      }),
      dark: convertToShikiTheme({
        foreground: "#FFFFFF",
        constant: "#7A7FFD",
        string: "#DFD473",
        comment: "#807796",
        keyword: "#FF659C",
        parameter: "#1AC8FF",
        function: "#73DFA5",
        stringExpression: "#DFD473",
        punctuation: "#FF659C",
        link: "#FF659C",
      }),
    },
  },
  crimson: {
    name: "Crimson",
    background: {
      from: "rgba(255,99,99,1)",
      to: "rgba(115,52,52,1)",
    },
    syntax: {
      light: convertToShikiTheme({
        foreground: "#685B5B",
        constant: "#C94F0A",
        string: "#836250",
        comment: "#978A8A",
        keyword: "#BE3B3B",
        parameter: "#9E7070",
        function: "#D15510",
        stringExpression: "#D46184",
        punctuation: "#BE3B3B",
        link: "#BE3B3B",
      }),
      dark: convertToShikiTheme({
        foreground: "#FEFDFD",
        constant: "#FDA97A",
        string: "#EBB99D",
        comment: "#895E60",
        keyword: "#EB6F6F",
        parameter: "#C88E8E",
        function: "#D15510",
        stringExpression: "#E97598",
        punctuation: "#EB6F6F",
        link: "#EB6F6F",
      }),
    },
  },
  falcon: {
    name: "Falcon",
    background: {
      from: "rgba(189,227,236,1)",
      to: "rgba(54,54,84,1)",
    },
    syntax: {
      light: convertToShikiTheme({
        foreground: "#464C65",
        constant: "#AE6A65",
        string: "#506483",
        comment: "#9DA4AD",
        keyword: "#5C827D",
        parameter: "#6A7C9F",
        function: "#839AA7",
        stringExpression: "#46615D",
        punctuation: "#5C827D",
        link: "#5C827D",
      }),
      dark: convertToShikiTheme({
        foreground: "#FFFFFF",
        constant: "#BD9C9C",
        string: "#6A8697",
        comment: "#6D7E88",
        keyword: "#9AB6B2",
        parameter: "#6D88BB",
        function: "#799DB1",
        stringExpression: "#789083",
        punctuation: "#9AB6B2",
        link: "#9AB6B2",
      }),
    },
  },
  meadow: {
    name: "Meadow",
    background: {
      from: "rgba(89,212,153,1)",
      to: "rgba(160,135,45,1)",
    },
    syntax: {
      light: convertToShikiTheme({
        foreground: "#54594D",
        constant: "#2C8801",
        string: "#837E50",
        comment: "#72806E",
        keyword: "#049649",
        parameter: "#798B52",
        function: "#B6781B",
        stringExpression: "#99A607",
        punctuation: "#049649",
        link: "#049649",
      }),
      dark: convertToShikiTheme({
        foreground: "#FFFFFF",
        constant: "#46B114",
        string: "#E9EB9D",
        comment: "#708B6C",
        keyword: "#6DD79F",
        parameter: "#B3D767",
        function: "#E4B165",
        stringExpression: "#2EFFB4",
        punctuation: "#6DD79F",
        link: "#6DD79F",
      }),
    },
  },
  midnight: {
    name: "Midnight",
    background: {
      from: "rgba(76,200,200,1)",
      to: "rgba(32,32,51,1)",
    },
    syntax: {
      light: convertToShikiTheme({
        foreground: "#434447",
        constant: "#2D8264",
        string: "#5F758F",
        comment: "#78808C",
        keyword: "#587678",
        parameter: "#2F788F",
        function: "#766599",
        stringExpression: "#5D70B5",
        punctuation: "#587678",
        link: "#5A797A",
      }),
      dark: convertToShikiTheme({
        foreground: "#FFFFFF",
        constant: "#75D2B1",
        string: "#6D86A4",
        comment: "#4A4C56",
        keyword: "#7DA9AB",
        parameter: "#51D0F8",
        function: "#9681C2",
        stringExpression: "#626B8B",
        punctuation: "#7DA9AB",
        link: "#7DA9AB",
      }),
    },
  },
  raindrop: {
    name: "Raindrop",
    background: {
      from: "rgba(142,199,251,1)",
      to: "rgba(28,85,170,1)",
    },
    syntax: {
      light: convertToShikiTheme({
        foreground: "#687077",
        constant: "#7459E1",
        string: "#507683",
        comment: "#6E7780",
        keyword: "#008DAC",
        parameter: "#4F9488",
        function: "#007BA1",
        stringExpression: "#2E81FF",
        punctuation: "#008DAC",
        link: "#008DAC",
      }),
      dark: convertToShikiTheme({
        foreground: "#E4F2FF",
        constant: "#9984EE",
        string: "#9DD8EB",
        comment: "#6C808B",
        keyword: "#2ED9FF",
        parameter: "#1AD6B5",
        function: "#008BB7",
        stringExpression: "#2E81FF",
        punctuation: "#2ED9FF",
        link: "#2ED9FF",
      }),
    },
  },
  sunset: {
    name: "Sunset",
    background: {
      from: "rgba(255,207,115,1)",
      to: "rgba(255,122,47,1)",
    },
    syntax: {
      light: convertToShikiTheme({
        foreground: "#737568",
        constant: "#856F00",
        string: "#8C703C",
        comment: "#7A7055",
        keyword: "#A1642C",
        parameter: "#807410",
        function: "#AD5A78",
        stringExpression: "#8C6A29",
        punctuation: "#A1642C",
        link: "#A1642C",
      }),
      dark: convertToShikiTheme({
        foreground: "#FFFFFF",
        constant: "#E7CF55",
        string: "#F9D38C",
        comment: "#878572",
        keyword: "#FFAF65",
        parameter: "#E2D66B",
        function: "#E978A1",
        stringExpression: "#E7B555",
        punctuation: "#FFAF65",
        link: "#FFAF65",
      }),
    },
  },
};

const themeAtom = atomWithHash<Theme>("theme", THEMES.candy, {
  delayInit: true,
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

const darkModeAtom = atomWithHash<boolean>("darkMode", true, {
  delayInit: true,
});

const themeCSSAtom = atom<CSSProperties>((get) => get(themeAtom).syntax[get(darkModeAtom) ? "dark" : "light"]);

const themeBackgroundAtom = atom<string>((get) => {
  const { from, to } = get(themeAtom).background;
  return `linear-gradient(140deg, ${from}, ${to})`;
});

const themeFontAtom = atom<Font | null>((get) => get(themeAtom)?.font || "jetbrains-mono");

export { themeAtom, darkModeAtom, themeCSSAtom, themeBackgroundAtom, themeFontAtom };
