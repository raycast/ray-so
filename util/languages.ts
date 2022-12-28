export type Language = {
  name: string;
  scopeName: string;
};

export const LANGUAGES: { [index: string]: Language } = {
  c: {
    name: "C",
    scopeName: "source.c",
  },
  cpp: {
    name: "C++",
    scopeName: "source.c++",
  },
  cs: {
    name: "C#",
    scopeName: "source.cs",
  },
  css: {
    name: "CSS",
    scopeName: "source.css",
  },
  scss: {
    name: "CSS (Sass)",
    scopeName: "source.css.scss",
  },
  less: {
    name: "CSS (Less)",
    scopeName: "source.css.less",
  },
  go: {
    name: "Go",
    scopeName: "source.go",
  },
  graphql: {
    name: "GraphQL",
    scopeName: "source.graphql",
  },
  java: {
    name: "Java",
    scopeName: "source.java",
  },
  kotlin: {
    name: "Kotlin",
    scopeName: "source.kotlin",
  },
  javascript: {
    name: "JavaScript",
    scopeName: "source.js",
  },
  lua: {
    name: "Lua",
    scopeName: "source.lua",
  },
  objc: {
    name: "Objective C",
    scopeName: "source.objc",
  },
  python: {
    name: "Python",
    scopeName: "source.python",
  },
  ruby: {
    name: "Ruby",
    scopeName: "source.ruby",
  },
  rust: {
    name: "Rust",
    scopeName: "source.rust",
  },
  sql: {
    name: "SQL",
    scopeName: "source.sql",
  },
  swift: {
    name: "Swift",
    scopeName: "source.swift",
  },
  typescript: {
    name: "TypeScript",
    scopeName: "source.ts",
  },
  yaml: {
    name: "YAML",
    scopeName: "source.yaml",
  },
};
