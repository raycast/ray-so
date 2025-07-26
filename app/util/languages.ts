export type Language = {
  name: string;
  src: () => Promise<any>;
};

export const LANGUAGES: { [index: string]: Language } = {
  shell: {
    name: "Bash",
    src: () => import("shiki/langs/bash.mjs"),
  },
  astro: {
    name: "Astro",
    src: () => import("shiki/langs/astro.mjs"),
  },
  cpp: {
    name: "C++",
    src: () => import("shiki/langs/cpp.mjs"),
  },
  csharp: {
    name: "C#",
    src: () => import("shiki/langs/csharp.mjs"),
  },
  clojure: {
    name: "Clojure",
    src: () => import("shiki/langs/clojure.mjs"),
  },
  console: {
    name: "Console",
    src: () => import("shiki/langs/console.mjs"),
  },
  crystal: {
    name: "Crystal",
    src: () => import("shiki/langs/crystal.mjs"),
  },
  css: {
    name: "CSS",
    src: () => import("shiki/langs/css.mjs"),
  },
  cypher: {
    name: "Cypher",
    src: () => import("shiki/langs/cypher.mjs"),
  },
  dart: {
    name: "Dart",
    src: () => import("shiki/langs/dart.mjs"),
  },
  diff: {
    name: "Diff",
    src: () => import("shiki/langs/diff.mjs"),
  },
  dockerfile: {
    name: "Docker",
    src: () => import("shiki/langs/dockerfile.mjs"),
  },
  elm: {
    name: "Elm",
    src: () => import("shiki/langs/elm.mjs"),
  },
  erb: {
    name: "ERB",
    src: () => import("shiki/langs/erb.mjs"),
  },
  elixir: {
    name: "Elixir",
    src: () => import("shiki/langs/elixir.mjs"),
  },
  erlang: {
    name: "Erlang",
    src: () => import("shiki/langs/erlang.mjs"),
  },
  gleam: {
    name: "Gleam",
    src: () => import("shiki/langs/gleam.mjs"),
  },
  graphql: {
    name: "GraphQL",
    src: () => import("shiki/langs/graphql.mjs"),
  },
  go: {
    name: "Go",
    src: () => import("shiki/langs/go.mjs"),
  },
  hcl: {
    name: "HCL",
    src: () => import("shiki/langs/hcl.mjs"),
  },
  haskell: {
    name: "Haskell",
    src: () => import("shiki/langs/haskell.mjs"),
  },
  html: {
    name: "HTML",
    src: () => import("shiki/langs/html.mjs"),
  },
  java: {
    name: "Java",
    src: () => import("shiki/langs/java.mjs"),
  },
  javascript: {
    name: "JavaScript",
    src: () => import("shiki/langs/javascript.mjs"),
  },
  julia: {
    name: "Julia",
    src: () => import("shiki/langs/julia.mjs"),
  },
  json: {
    name: "JSON",
    src: () => import("shiki/langs/json.mjs"),
  },
  jsx: {
    name: "JSX",
    src: () => import("shiki/langs/jsx.mjs"),
  },
  kotlin: {
    name: "Kotlin",
    src: () => import("shiki/langs/kotlin.mjs"),
  },
  latex: {
    name: "LaTeX",
    src: () => import("shiki/langs/latex.mjs"),
  },
  lisp: {
    name: "Lisp",
    src: () => import("shiki/langs/lisp.mjs"),
  },
  lua: {
    name: "Lua",
    src: () => import("shiki/langs/lua.mjs"),
  },
  markdown: {
    name: "Markdown",
    src: () => import("shiki/langs/markdown.mjs"),
  },
  matlab: {
    name: "MATLAB",
    src: () => import("shiki/langs/matlab.mjs"),
  },
  move: {
    name: "Move",
    src: () => import("shiki/langs/move.mjs"),
  },
  plaintext: {
    name: "Plaintext",
    src: () => import("shiki/langs/javascript.mjs"),
  },
  powershell: {
    name: "Powershell",
    src: () => import("shiki/langs/powershell.mjs"),
  },
  objectivec: {
    name: "Objective-C",
    src: () => import("shiki/langs/objc.mjs"),
  },
  ocaml: {
    name: "OCaml",
    src: () => import("shiki/langs/ocaml.mjs"),
  },
  php: {
    name: "PHP",
    src: () => import("shiki/langs/php.mjs"),
  },
  prisma: {
    name: "Prisma",
    src: () => import("shiki/langs/prisma.mjs"),
  },
  python: {
    name: "Python",
    src: () => import("shiki/langs/python.mjs"),
  },
  r: {
    name: "R",
    src: () => import("shiki/langs/r.mjs"),
  },
  ruby: {
    name: "Ruby",
    src: () => import("shiki/langs/ruby.mjs"),
  },
  rust: {
    name: "Rust",
    src: () => import("shiki/langs/rust.mjs"),
  },
  scala: {
    name: "Scala",
    src: () => import("shiki/langs/scala.mjs"),
  },
  scss: {
    name: "SCSS",
    src: () => import("shiki/langs/scss.mjs"),
  },
  solidity: {
    name: "Solidity",
    src: () => import("shiki/langs/solidity.mjs"),
  },
  sql: {
    name: "SQL",
    src: () => import("shiki/langs/sql.mjs"),
  },
  swift: {
    name: "Swift",
    src: () => import("shiki/langs/swift.mjs"),
  },
  svelte: {
    name: "Svelte",
    src: () => import("shiki/langs/svelte.mjs"),
  },
  toml: {
    name: "TOML",
    src: () => import("shiki/langs/toml.mjs"),
  },
  typescript: {
    name: "TypeScript",
    src: () => import("shiki/langs/typescript.mjs"),
  },
  tsx: {
    name: "TSX",
    src: () => import("shiki/langs/tsx.mjs"),
  },
  v: {
    name: "V",
    src: () => import("shiki/langs/v.mjs"),
  },
  vue: {
    name: "Vue",
    src: () => import("shiki/langs/vue.mjs"),
  },
  xml: {
    name: "XML",
    src: () => import("shiki/langs/xml.mjs"),
  },
  yaml: {
    name: "YAML",
    src: () => import("shiki/langs/yaml.mjs"),
  },
  zig: {
    name: "Zig",
    src: () => import("shiki/langs/zig.mjs"),
  },
};
