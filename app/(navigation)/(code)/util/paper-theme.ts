import type { ThemeRegistration } from "shiki";

// Paper's specimen palette, with separate operator and punctuation colors.
export const paperTheme: ThemeRegistration = {
  name: "paper",
  type: "light",
  colors: {
    "editor.foreground": "#222222",
    "editor.background": "#F7F7F5",
  },
  tokenColors: [
    {
      scope: ["keyword", "storage", "entity.name.function", "support.function", "entity.name.tag"],
      settings: { foreground: "#4570BC" },
    },
    {
      scope: ["keyword.operator", "storage.type.function.arrow"],
      settings: { foreground: "#909090" },
    },
    {
      scope: ["punctuation", "meta.brace", "keyword.operator.accessor"],
      settings: { foreground: "#B5AA8F" },
    },
    {
      scope: ["string", "punctuation.definition.string", "punctuation.definition.template-expression"],
      settings: { foreground: "#BC8700" },
    },
    {
      scope: ["meta.embedded", "variable", "constant.other", "meta.definition.variable entity.name.function"],
      settings: { foreground: "#222222" },
    },
    {
      scope: ["constant.numeric", "constant.language", "variable.other.property", "support.variable.property"],
      settings: { foreground: "#845CAD" },
    },
    {
      scope: "comment",
      settings: { foreground: "#8A8A84" },
    },
    {
      scope: ["markup.inserted", "punctuation.definition.inserted"],
      settings: { foreground: "#58805F" },
    },
    {
      scope: ["markup.deleted", "punctuation.definition.deleted"],
      settings: { foreground: "#B45E55" },
    },
  ],
};
