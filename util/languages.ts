export type Language = {
  className: string;
  name: string;
  src: () => Promise<any>;
};

export const LANGUAGES: { [index: string]: Language } = {
  shell: {
    name: "Bash",
    className: "bash",
    src: () => import("shiki/langs/bash.mjs"),
  },
  astro: {
    name: "Astro",
    className: "astro",
    src: () => import("shiki/langs/astro.mjs"),
  },
  cpp: {
    name: "C++",
    className: "cpp",
    src: () => import("shiki/langs/cpp.mjs"),
  },
  csharp: {
    name: "C#",
    className: "csharp",
    src: () => import("shiki/langs/csharp.mjs"),
  },
  clojure: {
    name: "Clojure",
    className: "clojure",
    src: () => import("shiki/langs/clojure.mjs"),
  },
  crystal: {
    name: "Crystal",
    className: "crystal",
    src: () => import("shiki/langs/crystal.mjs"),
  },
  css: {
    name: "CSS",
    className: "css",
    src: () => import("shiki/langs/css.mjs"),
  },
  diff: {
    name: "Diff",
    className: "diff",
    src: () => import("shiki/langs/diff.mjs"),
  },
  dockerfile: {
    name: "Docker",
    className: "dockerfile",
    src: () => import("shiki/langs/dockerfile.mjs"),
  },
  elm: {
    name: "Elm",
    className: "elm",
    src: () => import("shiki/langs/elm.mjs"),
  },
  elixir: {
    name: "Elixir",
    className: "elixir",
    src: () => import("shiki/langs/elixir.mjs"),
  },
  erlang: {
    name: "Erlang",
    className: "erlang",
    src: () => import("shiki/langs/erlang.mjs"),
  },
  graphql: {
    name: "GraphQL",
    className: "graphql",
    src: () => import("shiki/langs/graphql.mjs"),
  },
  go: {
    name: "Go",
    className: "go",
    src: () => import("shiki/langs/go.mjs"),
  },
  haskell: {
    name: "Haskell",
    className: "haskell",
    src: () => import("shiki/langs/haskell.mjs"),
  },
  html: {
    name: "HTML",
    className: "xml",
    src: () => import("shiki/langs/html.mjs"),
  },
  java: {
    name: "Java",
    className: "java",
    src: () => import("shiki/langs/java.mjs"),
  },
  javascript: {
    name: "JavaScript",
    className: "javascript",
    src: () => import("shiki/langs/javascript.mjs"),
  },
  julia: {
    name: "Julia",
    className: "julia",
    src: () => import("shiki/langs/julia.mjs"),
  },
  json: {
    name: "JSON",
    className: "json",
    src: () => import("shiki/langs/json.mjs"),
  },
  jsx: {
    name: "JSX",
    className: "javascript",
    src: () => import("shiki/langs/jsx.mjs"),
  },
  kotlin: {
    name: "Kotlin",
    className: "kotlin",
    src: () => import("shiki/langs/kotlin.mjs"),
  },
  latex: {
    name: "LaTeX",
    className: "latex",
    src: () => import("shiki/langs/latex.mjs"),
  },
  lisp: {
    name: "Lisp",
    className: "lisp",
    src: () => import("shiki/langs/lisp.mjs"),
  },
  lua: {
    name: "Lua",
    className: "lua",
    src: () => import("shiki/langs/lua.mjs"),
  },
  markdown: {
    name: "Markdown",
    className: "markdown",
    src: () => import("shiki/langs/markdown.mjs"),
  },
  matlab: {
    name: "MATLAB",
    className: "matlab",
    src: () => import("shiki/langs/matlab.mjs"),
  },
  plaintext: {
    name: "Plaintext",
    className: "",
    src: () => import("shiki/langs/javascript.mjs"),
  },
  powershell: {
    name: "Powershell",
    className: "powershell",
    src: () => import("shiki/langs/powershell.mjs"),
  },
  objectivec: {
    name: "Objective-C",
    className: "objectivec",
    src: () => import("shiki/langs/objc.mjs"),
  },
  ocaml: {
    name: "OCaml",
    className: "ocaml",
    src: () => import("shiki/langs/ocaml.mjs"),
  },
  php: {
    name: "PHP",
    className: "php",
    src: () => import("shiki/langs/php.mjs"),
  },
  python: {
    name: "Python",
    className: "python",
    src: () => import("shiki/langs/python.mjs"),
  },
  r: {
    name: "R",
    className: "r",
    src: () => import("shiki/langs/r.mjs"),
  },
  ruby: {
    name: "Ruby",
    className: "ruby",
    src: () => import("shiki/langs/ruby.mjs"),
  },
  rust: {
    name: "Rust",
    className: "rust",
    src: () => import("shiki/langs/rust.mjs"),
  },
  scala: {
    name: "Scala",
    className: "scala",
    src: () => import("shiki/langs/scala.mjs"),
  },
  scss: {
    name: "SCSS",
    className: "scss",
    src: () => import("shiki/langs/scss.mjs"),
  },
  solidity: {
    name: "Solidity",
    className: "solidity",
    src: () => import("shiki/langs/solidity.mjs"),
  },
  sql: {
    name: "SQL",
    className: "sql",
    src: () => import("shiki/langs/sql.mjs"),
  },
  swift: {
    name: "Swift",
    className: "swift",
    src: () => import("shiki/langs/swift.mjs"),
  },
  svelte: {
    name: "Svelte",
    className: "svelte",
    src: () => import("shiki/langs/svelte.mjs"),
  },
  toml: {
    name: "TOML",
    className: "toml",
    src: () => import("shiki/langs/toml.mjs"),
  },
  typescript: {
    name: "TypeScript",
    className: "typescript",
    src: () => import("shiki/langs/typescript.mjs"),
  },
  tsx: {
    name: "TSX",
    className: "typescript",
    src: () => import("shiki/langs/tsx.mjs"),
  },
  vue: {
    name: "Vue",
    className: "vue",
    src: () => import("shiki/langs/vue.mjs"),
  },
  xml: {
    name: "XML",
    className: "xml",
    src: () => import("shiki/langs/xml.mjs"),
  },
  yaml: {
    name: "YAML",
    className: "yaml",
    src: () => import("shiki/langs/yaml.mjs"),
  },
};
