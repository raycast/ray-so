import type { ThemeRegistration } from "@shikijs/core";
import { Theme } from "../store/themes";
import Color from "color";

export interface VsCodeThemeOptions {
  /**
   * Theme name.
   *
   */
  name: string;
  type: "dark" | "light";
  theme: Theme;
}

export function createVsCodeTheme(options: VsCodeThemeOptions): ThemeRegistration {
  const variable = (name: string) => {
    return Color((options.theme.syntax[options.type] as any)[name]).hex();
  };

  const isDark = options.type === "dark";

  const vsCodeTheme: ThemeRegistration = {
    name: options.name,
    type: options.type,
    colors: {
      "editor.foreground": variable("--ray-foreground"),
      "editor.background": variable("--ray-background"),
      "editorGroupHeader.tabsBackground": Color(variable("--ray-background")).darken(0.2).hex(),
      "editorGroupHeader.tabsBorder": Color(variable("--ray-background")).lighten(0.1).hex(),
      "tab.border": Color(variable("--ray-background")).lighten(0.1).hex(),
      "tab.inactiveBackground": Color(variable("--ray-background")).darken(0.2).hex(),
      "editor.selectionBackground": isDark
        ? Color(variable("--ray-background")).lighten(1.5).hex()
        : Color(variable("--ray-background")).darken(0.2).hex(),
      "sideBar.background": Color(variable("--ray-background")).darken(0.2).hex(),
      "statusBar.background": Color(variable("--ray-token-constant")).darken(0.2).hex(),
      "statusBarItem.remoteBackground": Color(variable("--ray-token-constant")).darken(0.5).hex(),
      "activityBar.background": Color(variable("--ray-background")).darken(0.5).hex(),
      "activityBarBadge.background": Color(variable("--ray-token-constant")).darken(0.2).hex(),
      "list.inactiveSelectionBackground": Color(variable("--ray-background")).lighten(0.2).hex(),
      "list.activeSelectionBackground": Color(variable("--ray-background")).lighten(0.2).hex(),
      "list.activeSelectionForeground": variable("--ray-foreground"),
      "list.activeSelectionStroke": "#000000",
      "list.focusBackground": isDark
        ? Color(variable("--ray-background")).lighten(0.2).hex()
        : Color(variable("--ray-background")).darken(0.2).hex(),
      "list.hoverBackground": Color(variable("--ray-background")).lighten(0.05).hex(),
      "editor.lineHighlightBorder": isDark
        ? Color(variable("--ray-background")).lighten(0.6).hex()
        : Color(variable("--ray-background")).darken(0.1).hex(),
      "editor.lineHighlightBackground": isDark
        ? Color(variable("--ray-background")).lighten(0.6).hex()
        : Color(variable("--ray-background")).darken(0.1).hex(),
      "editorCursor.foreground": variable("--ray-token-keyword"),
      focusBorder: Color(variable("--ray-background")).lighten(1).hex(),
      "editorWidget.background": Color(variable("--ray-background")).darken(0.2).hex(),
      "button.background": Color(variable("--ray-token-constant")).darken(0.2).hex(),
      "checkbox.background": Color(variable("--ray-token-constant")).darken(0.2).hex(),
      "dropdown.background": Color(variable("--ray-background")).darken(0.2).hex(),
      "dropdown.listBackground": Color(variable("--ray-background")).darken(0.2).hex(),
      "progressBar.background": Color(variable("--ray-token-constant")).darken(0.2).hex(),
      "minimap.background": Color(variable("--ray-background")).darken(0.1).hex(),
    },
    tokenColors: [
      {
        scope: [
          "keyword.operator.accessor",
          "meta.group.braces.round.function.arguments",
          "meta.template.expression",
          "markup.fenced_code meta.embedded.block",
        ],
        settings: {
          foreground: variable("--ray-foreground"),
        },
      },
      {
        scope: "emphasis",
        settings: {
          fontStyle: "italic",
        },
      },
      {
        scope: ["strong", "markup.heading.markdown", "markup.bold.markdown"],
        settings: {
          fontStyle: "bold",
        },
      },
      {
        scope: ["markup.italic.markdown"],
        settings: {
          fontStyle: "italic",
        },
      },
      {
        scope: "meta.link.inline.markdown",
        settings: {
          fontStyle: "underline",
          foreground: variable("--ray-token-link"),
        },
      },
      {
        scope: ["string", "markup.fenced_code", "markup.inline", "string.quoted.docstring.multi.python"],
        settings: {
          foreground: variable("--ray-token-string"),
        },
      },
      {
        scope: ["comment", "string.quoted.docstring.multi"],
        settings: {
          foreground: variable("--ray-token-comment"),
        },
      },
      {
        scope: [
          "constant.numeric",
          "constant.language",
          "constant.other.placeholder",
          "constant.character.format.placeholder",
          "variable.language.this",
          "variable.other.object",
          "variable.other.class",
          "variable.other.constant",
          "meta.property-name",
          "meta.property-value",
          "support",
        ],
        settings: {
          foreground: variable("--ray-token-constant"),
        },
      },
      {
        scope: [
          "keyword",
          "storage.modifier",
          "storage.type",
          "storage.control.clojure",
          "entity.name.function.clojure",
          "entity.name.tag.yaml",
          "support.function.node",
          "support.type.property-name.json",
          "punctuation.separator.key-value",
          "punctuation.definition.template-expression",
        ],
        settings: {
          foreground: variable("--ray-token-keyword"),
        },
      },
      {
        scope: "variable.parameter.function",
        settings: {
          foreground: variable("--ray-token-parameter"),
        },
      },
      {
        scope: [
          "support.function",
          "entity.name.type",
          "entity.other.inherited-class",
          "meta.function-call",
          "meta.instance.constructor",
          "entity.other.attribute-name",
          "entity.name.function",
          "constant.keyword.clojure",
        ],
        settings: {
          foreground: variable("--ray-token-function"),
        },
      },
      {
        scope: [
          "entity.name.tag",
          "string.quoted",
          "string.regexp",
          "string.interpolated",
          "string.template",
          "string.unquoted.plain.out.yaml",
          "keyword.other.template",
        ],
        settings: {
          foreground: variable("--ray-token-string-expression"),
        },
      },
      {
        scope: [
          "punctuation.definition.arguments",
          "punctuation.definition.dict",
          "punctuation.separator",
          "meta.function-call.arguments",
        ],
        settings: {
          foreground: variable("--ray-token-punctuation"),
        },
      },
      {
        // [Custom] Markdown links
        scope: ["markup.underline.link", "punctuation.definition.metadata.markdown"],
        settings: {
          foreground: variable("--ray-token-link"),
        },
      },
      {
        // [Custom] Markdown list
        scope: ["beginning.punctuation.definition.list.markdown"],
        settings: {
          foreground: variable("--ray-token-string"),
        },
      },
      {
        // [Custom] Markdown punctuation definition brackets
        scope: [
          "punctuation.definition.string.begin.markdown",
          "punctuation.definition.string.end.markdown",
          "string.other.link.title.markdown",
          "string.other.link.description.markdown",
        ],
        settings: {
          foreground: variable("--ray-token-keyword"),
        },
      },
      {
        scope: ["constant.numeric.decimal", "constant.language.boolean", "meta.var.exp.ts"],
        settings: { foreground: variable("--ray-token-number") },
      },
      {
        scope: ["support.variable.property"],
        settings: { foreground: variable("--ray-token-property") },
      },
    ],
  };

  return vsCodeTheme;
}
