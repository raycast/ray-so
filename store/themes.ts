import { atom } from "jotai";
import { atomWithHash } from "jotai-location";
import { CSSProperties } from "react";

type SyntaxObject = {
  background: string;
  text: string;
  variable: string;
  variable2: string;
  variable3: string;
  attribute: string;
  definition: string;
  keyword: string;
  operator: string;
  property: string;
  number: string;
  string: string;
  comment: string;
  meta: string;
  tag: string;
};

function convertToHljsTheme(syntaxObject: SyntaxObject): CSSProperties {
  if (!syntaxObject) {
    return {};
  }

  return {
    "--syntax-text": syntaxObject.text,
    "--syntax-background": syntaxObject.background,
    "--syntax-string": syntaxObject.string,
    "--syntax-comment": syntaxObject.comment,
    "--syntax-variable": syntaxObject.variable,
    "--syntax-variable-2": syntaxObject.variable2 || syntaxObject.variable,
    "--syntax-variable-3": syntaxObject.variable3 || syntaxObject.variable,
    "--syntax-number": syntaxObject.number,
    "--syntax-atom": syntaxObject.number,
    "--syntax-keyword": syntaxObject.keyword,
    "--syntax-property": syntaxObject.property,
    "--syntax-definition": syntaxObject.definition,
    "--syntax-meta": syntaxObject.meta,
    "--syntax-operator": syntaxObject.operator,
    "--syntax-attribute": syntaxObject.attribute,
    "--syntax-tag": syntaxObject.tag,
  } as CSSProperties;
}

export type Theme = {
  name: string;
  background: {
    from: string;
    to: string;
  };
  syntax: {
    light: CSSProperties;
    dark: CSSProperties;
  };
};

export const THEMES: { [index: string]: Theme } = {
  breeze: {
    name: "Breeze",
    background: {
      from: "rgba(207,47,152,1)",
      to: "rgba(106,61,236,1)",
    },
    syntax: {
      light: convertToHljsTheme({
        background: "rgba 0,0,100,0.75",
        text: "#434447",
        variable: "#F8518D",
        variable2: "#BF3F6D",
        variable3: "#238600",
        attribute: "#C44170",
        definition: "#C44170",
        keyword: "#496EB8",
        operator: "#496EB8",
        property: "#0B7880",
        number: "#24805E",
        string: "#886594",
        comment: "#8C828B",
        meta: "#625B6B",
        tag: "#4B71BD",
      }),
      dark: convertToHljsTheme({
        background: "rgba 0,0,0,0.75",
        text: "#FFFFFF",
        variable: "#F8518D",
        variable2: "#FFFFFF",
        variable3: "#9AEC7D",
        attribute: "#F8518D",
        definition: "#F8518D",
        keyword: "#6599FF",
        operator: "#6599FF",
        property: "#49E8F2",
        number: "#55E7B2",
        string: "#E9AEFE",
        comment: "#8A757D",
        meta: "#ECFEEF",
        tag: "#6599FF",
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
      light: convertToHljsTheme({
        background: "rgba 0,0,100,0.75",
        text: "#434447",
        variable: "#009033",
        variable2: "#63676A",
        variable3: "#D35A35",
        attribute: "#009033",
        definition: "#009033",
        keyword: "#DC155E",
        operator: "#d15a8b",
        property: "#2286A6",
        number: "#676DFF",
        string: "#B2762E",
        comment: "#8D949B",
        meta: "#6A6367",
        tag: "#d15a8b",
      }),
      dark: convertToHljsTheme({
        background: "rgba 0,0,0,0.75",
        text: "#FFFFFF",
        variable: "#73DFA5",
        variable2: "#FFFFFF",
        variable3: "#E08569",
        attribute: "#73DFA5",
        definition: "#73DFA5",
        keyword: "#FF659C",
        operator: "#FF659C",
        property: "#1AC8FF",
        number: "#7A7FFD",
        string: "#DFD473",
        comment: "#807796",
        meta: "#F1ECFE",
        tag: "#FF659C",
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
      light: convertToHljsTheme({
        background: "rgba 0,0,100,0.75",
        text: "#685B5B",
        variable: "#9E7070",
        variable2: "#B22D2D",
        variable3: "#D46184",
        attribute: "#9E7070",
        definition: "#9E7070",
        keyword: "#BE3B3B",
        operator: "#BE3B3B",
        property: "#D15510",
        number: "#C94F0A",
        string: "#836250",
        comment: "#978A8A",
        meta: "#8B5F5C",
        tag: "#BE3B3B",
      }),
      dark: convertToHljsTheme({
        background: "rgba 0,0,0,0.75",
        text: "#FEFDFD",
        variable: "#C88E8E",
        variable2: "#FFE4E4",
        variable3: "#E97598",
        attribute: "#C88E8E",
        definition: "#C88E8E",
        keyword: "#EB6F6F",
        operator: "#EB6F6F",
        property: "#D15510",
        number: "#FDA97A",
        string: "#EBB99D",
        comment: "#895E60",
        meta: "#FFE4E4",
        tag: "#EB6F6F",
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
      light: convertToHljsTheme({
        background: "rgba 0,0,100,0.75",
        text: "#464C65",
        variable: "#6A7C9F",
        variable2: "#354BA7",
        variable3: "#46615D",
        attribute: "#6A7C9F",
        definition: "#6A7C9F",
        keyword: "#5C827D",
        operator: "#5C827D",
        property: "#839AA7",
        number: "#AE6A65",
        string: "#506483",
        comment: "#9DA4AD",
        meta: "#425295",
        tag: "#5C827D",
      }),
      dark: convertToHljsTheme({
        background: "rgba 0,0,0,0.75",
        text: "#FFFFFF",
        variable: "#6D88BB",
        variable2: "#E4F2FF",
        variable3: "#789083",
        attribute: "#6D88BB",
        definition: "#6D88BB",
        keyword: "#9AB6B2",
        operator: "#9AB6B2",
        property: "#799DB1",
        number: "#BD9C9C",
        string: "#6A8697",
        comment: "#6D7E88",
        meta: "#E4F2FF",
        tag: "#9AB6B2",
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
      light: convertToHljsTheme({
        background: "rgba 0,0,100,0.75",
        text: "#54594D",
        variable: "#798B52",
        variable2: "#6E967E",
        variable3: "#99A607",
        attribute: "#798B52",
        definition: "#798B52",
        keyword: "#049649",
        operator: "#049649",
        property: "#B6781B",
        number: "#2C8801",
        string: "#837E50",
        comment: "#72806E",
        meta: "#5C8B6F",
        tag: "#049649",
      }),
      dark: convertToHljsTheme({
        background: "rgba 0,0,0,0.75",
        text: "#FFFFFF",
        variable: "#B3D767",
        variable2: "#E5FFE4",
        variable3: "#2EFFB4",
        attribute: "#B3D767",
        definition: "#B3D767",
        keyword: "#6DD79F",
        operator: "#6DD79F",
        property: "#E4B165",
        number: "#46B114",
        string: "#E9EB9D",
        comment: "#708B6C",
        meta: "#E5FFE4",
        tag: "#6DD79F",
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
      light: convertToHljsTheme({
        background: "rgba 0,0,100,0.75",
        text: "#434447",
        variable: "#2F788F",
        variable2: "#63676A",
        variable3: "#5D70B5",
        attribute: "#2F788F",
        definition: "#2F788F",
        keyword: "#587678",
        operator: "#587678",
        property: "#766599",
        number: "#2D8264",
        string: "#5F758F",
        comment: "#78808C",
        meta: "#5B636B",
        tag: "#5A797A",
      }),
      dark: convertToHljsTheme({
        background: "rgba 0,0,0,0.75",
        text: "#FFFFFF",
        variable: "#51D0F8",
        variable2: "#FFFFFF",
        variable3: "#626B8B",
        attribute: "#51D0F8",
        definition: "#51D0F8",
        keyword: "#7DA9AB",
        operator: "#7DA9AB",
        property: "#9681C2",
        number: "#75D2B1",
        string: "#6D86A4",
        comment: "#4A4C56",
        meta: "#F2F7F7",
        tag: "#7DA9AB",
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
      light: convertToHljsTheme({
        background: "rgba 0,0,100,0.75",
        text: "#687077",
        variable: "#4F9488",
        variable2: "#687077",
        variable3: "#2E81FF",
        attribute: "#4F9488",
        definition: "#4F9488",
        keyword: "#008DAC",
        operator: "#008DAC",
        property: "#007BA1",
        number: "#7459E1",
        string: "#507683",
        comment: "#6E7780",
        meta: "#5C838B",
        tag: "#008DAC",
      }),
      dark: convertToHljsTheme({
        background: "rgba 0,0,0,0.75",
        text: "#E4F2FF",
        variable: "#1AD6B5",
        variable2: "#E4F2FF",
        variable3: "#2E81FF",
        attribute: "#1AD6B5",
        definition: "#1AD6B5",
        keyword: "#2ED9FF",
        operator: "#2ED9FF",
        property: "#008BB7",
        number: "#9984EE",
        string: "#9DD8EB",
        comment: "#6C808B",
        meta: "#ECFBFE",
        tag: "#2ED9FF",
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
      light: convertToHljsTheme({
        background: "rgba 0,0,100,0.75",
        text: "#737568",
        variable: "#807410",
        variable2: "#717365",
        variable3: "#8C6A29",
        attribute: "#807410",
        definition: "#807410",
        keyword: "#A1642C",
        operator: "#A1642C",
        property: "#AD5A78",
        number: "#856F00",
        string: "#8C703C",
        comment: "#7A7055",
        meta: "#6B625B",
        tag: "#A1642C",
      }),
      dark: convertToHljsTheme({
        background: "rgba 0,0,0,0.75",
        text: "#FFFFFF",
        variable: "#E2D66B",
        variable2: "#FFFFFF",
        variable3: "#E7B555",
        attribute: "#E2D66B",
        definition: "#E2D66B",
        keyword: "#FFAF65",
        operator: "#FFAF65",
        property: "#E978A1",
        number: "#E7CF55",
        string: "#F9D38C",
        comment: "#878572",
        meta: "#FFFDED",
        tag: "#FFAF65",
      }),
    },
  },
};

const themeAtom = atomWithHash<Theme>("theme", THEMES.candy, {
  delayInit: true,
  serialize(value) {
    return value.name.toLowerCase();
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

export { themeAtom, darkModeAtom, themeCSSAtom, themeBackgroundAtom };
