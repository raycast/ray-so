/**
 * CFML TextMate grammar
 * Source: https://github.com/KamasamaK/vscode-cfml
 * License: MIT (c) 2017 KamasamaK
 */
import grammar from "./cfml.tmLanguage.json";

export default [
  {
    ...grammar,
    name: "cfml",
    displayName: "CFML",
  },
];
