import { NextRequest } from "next/server";
import satori, { init as initSatori } from "satori/wasm";
import { Resvg, initWasm as initResvg } from "@resvg/resvg-wasm";

import initYoga from "yoga-wasm-web";

// @ts-ignore
import yogaWasm from "../../vendor/yoga.wasm?module";

// @ts-ignore
import resvgWasm from "../../vendor/resvg.simd.wasm?module";

import { lowlight } from "lowlight/lib/common";
import { Root, Span, Text } from "lowlight/lib/core";
import { ReactNode } from "react";
import Yoga from "yoga-layout";

const initializedYoga = initYoga(yogaWasm).then((yoga: typeof Yoga) =>
  initSatori(yoga)
);

const initializedResvg = initResvg(resvgWasm);

const fontPromise = fetch(
  new URL("../../vendor/JetBrainsMono-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export const config = {
  runtime: "experimental-edge",
};

const THEME = {
  "hljs-tag": "#f8f8f2",
  "hljs-subst": "#f8f8f2",
  "hljs-strong": "#a8a8a2",
  "hljs-emphasis": "#a8a8a2",
  "hljs-bullet": "#ae81ff",
  "hljs-quote": "#ae81ff",
  "hljs-number": "#ae81ff",
  "hljs-regexp": "#ae81ff",
  "hljs-literal": "#ae81ff",
  "hljs-link": "#ae81ff",
  "hljs-code": "#a6e22e",
  "hljs-title": "#a6e22e",
  "hljs-section": "#a6e22e",
  "hljs-selector-class": "#a6e22e",
  "hljs-keyword": "#f92672",
  "hljs-selector-tag": "#f92672",
  "hljs-name": "#f92672",
  "hljs-attr": "#f92672",
  "hljs-symbol": "#66d9ef",
  "hljs-attribute": "#a6e22e",
  "hljs-params": "#f8f8f2",
  "hljs-string": "#e6db74",
  "hljs-type": "#e6db74",
  "hljs-built_in": "#e6db74",
  "hljs-selector-id": "#e6db74",
  "hljs-selector-attr": "#e6db74",
  "hljs-selector-pseudo": "#e6db74",
  "hljs-addition": "#e6db74",
  "hljs-variable": "#e6db74",
  "hljs-template-variable": "#e6db74",
  "hljs-comment": "#75715e",
};

function transform(node: Root | Span | Text, color: string): ReactNode[] {
  switch (node.type) {
    case "element":
      const className = node.properties?.className[0] as keyof typeof THEME;
      return node.children.map((el) =>
        transform(el, THEME[className] || color || "#f8f8f2")
      );
    case "text":
      return node.value.split("\n").reduce((acc: ReactNode[], line: string) => {
        const chars = line.split("");
        if (!chars.length) chars.push("");

        return [
          ...acc,
          acc.length ? (
            <div
              style={{
                width: "100%",
                height: 1,
                display: "flex",
              }}
            />
          ) : null,
          <span
            key="foo"
            style={{
              color,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {chars.join("")}
          </span>,
        ];
      }, []);
    default:
      if (node.children) {
        return node.children.map((el) => transform(el, color));
      }
  }
  return [];
}

const code = `const btn = document.getElementById('btn')
  let count = 0
  function render() {
    btn.innerText = \`Count: \${count}\`
  }
  btn.addEventListener('click', () => {
  // Count from 1 to 10.
  if (count < 10) {
    count += 1
    render()
  }
})`;

export default async function handler(req: NextRequest) {
  const tree = lowlight.highlight("js", code);
  const jsx = (
    <div style={{ display: "flex", flexWrap: "wrap", whiteSpace: "pre-wrap" }}>
      {transform(tree, "#f8f8f2")}
    </div>
  );

  const svg = await satori(
    <div
      style={{
        display: "flex",
        background:
          "linear-gradient(140deg, rgba(207,47,152,1), rgba(106,61,236,1))",
        padding: 64,
      }}
    >
      <div
        style={{
          display: "flex",
          borderRadius: 10,
          padding: "16px 0",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          filter:
            "drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.15)) drop-shadow(0px 25px 30px rgba(0, 0, 0, 0.35))",
          background: "rgba(0, 0, 0, 0.75)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            padding: 16,
          }}
        >
          {jsx}
        </div>
      </div>
    </div>,
    {
      width: 920,
      height: 458,
      fonts: [
        {
          name: "JetBrains Mono",
          data: await fontPromise,
          weight: 400,
          style: "normal",
        },
      ],
    }
  );

  const result = new ReadableStream({
    async start(controller) {
      await Promise.all([initializedResvg, initializedYoga]);

      const resvgJS = new Resvg(svg, {
        fitTo: {
          mode: "width",
          value: 920 * 2,
        },
      });

      controller.enqueue(resvgJS.render());
      controller.close();
    },
  });

  return new Response(result, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
