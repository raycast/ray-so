import { getFontEmbedCSS } from "html-to-image";
import { toCanvas } from "../lib/image";
import { getTypingCharacters, getTypingRenderStateKey, getVisibleCharacterCount } from "./typingAnimation";

export type TypingRenderer = {
  canvas: HTMLCanvasElement;
  render: (progress: number) => void;
  dispose: () => void;
};

type RendererOptions = {
  pixelRatio: number;
  showCursor: boolean;
  signal: AbortSignal;
};

async function waitForHighlightedCode(node: HTMLElement, signal: AbortSignal) {
  signal.throwIfAborted();
  if (node.dataset.exportReady === "true") return;

  await new Promise<void>((resolve, reject) => {
    const finish = (error?: unknown) => {
      observer.disconnect();
      clearTimeout(timeout);
      signal.removeEventListener("abort", abort);
      if (error) reject(error);
      else resolve();
    };
    const abort = () => finish(signal.reason);
    const observer = new MutationObserver(() => {
      if (node.dataset.exportReady === "true") finish();
    });
    const timeout = setTimeout(() => finish(new Error("Timed out waiting for syntax highlighting")), 5000);
    observer.observe(node, { attributes: true, attributeFilter: ["data-export-ready"] });
    signal.addEventListener("abort", abort, { once: true });
  });
}

// Measure the existing typeset text, including wraps and grapheme clusters, once.
function measureCarets(node: HTMLElement, characters: string[]) {
  const bounds = node.getBoundingClientRect();
  const style = getComputedStyle(node);
  const scale = bounds.width / node.offsetWidth;
  const lineHeight = parseFloat(style.lineHeight) * scale;
  const paddingTop = parseFloat(style.paddingTop) * scale;
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode as Text);

  let nodeIndex = 0;
  let offset = 0;
  let fontOffset: number | undefined;
  const range = document.createRange();

  const carets = characters.map((character) => {
    while (nodeIndex < textNodes.length - 1 && offset >= textNodes[nodeIndex].length) {
      offset -= textNodes[nodeIndex].length;
      nodeIndex += 1;
    }
    range.setStart(textNodes[nodeIndex], offset);
    offset += character.length;
    while (nodeIndex < textNodes.length - 1 && offset > textNodes[nodeIndex].length) {
      offset -= textNodes[nodeIndex].length;
      nodeIndex += 1;
    }
    range.setEnd(textNodes[nodeIndex], offset);
    const rect = range.getBoundingClientRect();
    fontOffset ??= rect.top - bounds.top - paddingTop;
    const row = Math.max(0, Math.round((rect.top - bounds.top - paddingTop - fontOffset) / lineHeight));
    return { x: rect.left - bounds.left, y: paddingTop + row * lineHeight, height: lineHeight };
  });

  return { bounds, carets, color: style.getPropertyValue("--ray-foreground").trim() || style.color };
}

async function captureAnnotations(code: HTMLElement, options: { pixelRatio: number; fontEmbedCSS: string }) {
  const clone = code.cloneNode(true) as HTMLElement;
  const style = getComputedStyle(code);
  Object.assign(clone.style, {
    position: "absolute",
    left: "-100000px",
    top: "0",
    width: style.width,
    height: style.height,
  });
  clone.dataset.ignoreInExport = "true";
  clone.removeAttribute("data-export-layer");
  const lines = code.querySelectorAll<HTMLElement>(".line");
  clone.querySelectorAll<HTMLElement>(".line").forEach((line, index) => {
    // Removing text must not collapse wrapped lines or move subsequent line numbers.
    line.style.height = getComputedStyle(lines[index]).height;
  });
  code.parentElement?.append(clone);
  try {
    return await toCanvas(clone, {
      ...options,
      style: { position: "static", left: "auto", top: "auto" },
      filter: (node) => node.nodeType !== Node.TEXT_NODE || /^\n*$/.test(node.textContent ?? ""),
    });
  } finally {
    clone.remove();
  }
}

export async function createTypingRenderer(
  frame: HTMLElement,
  { pixelRatio, showCursor, signal }: RendererOptions,
): Promise<TypingRenderer> {
  const code = frame.querySelector<HTMLElement>("[data-export-layer='code']");
  if (!code) throw new Error("Could not find the highlighted code layer");

  await waitForHighlightedCode(code, signal);
  await document.fonts.ready;
  signal.throwIfAborted();

  const characters = getTypingCharacters(code.textContent ?? "");
  const { bounds: codeBounds, carets, color } = measureCarets(code, characters);
  const frameBounds = frame.getBoundingClientRect();
  const originalHtml = code.innerHTML;
  const resources: HTMLCanvasElement[] = [];
  const dispose = () => {
    for (const canvas of resources) canvas.width = canvas.height = 0;
  };

  try {
    const fontEmbedCSS = await getFontEmbedCSS(frame);
    signal.throwIfAborted();
    const options = { pixelRatio, fontEmbedCSS };
    // Exclude the dynamic layer without changing the live editor or its layout.
    const base = await toCanvas(frame, {
      ...options,
      filter: (node) => node !== code && node.tagName !== "TEXTAREA" && !node.dataset?.ignoreInExport,
    });
    resources.push(base);
    signal.throwIfAborted();
    const atlas = await toCanvas(code, options);
    resources.push(atlas);
    signal.throwIfAborted();
    // Keep newline separators and pseudo-elements (line numbers and highlights).
    const annotations = await captureAnnotations(code, options);
    resources.push(annotations);
    signal.throwIfAborted();
    if (!code.isConnected || code.innerHTML !== originalHtml || code.dataset.exportReady !== "true") {
      throw new Error("The code changed while preparing the animation. Please retry.");
    }

    const canvas = document.createElement("canvas");
    canvas.width = base.width;
    canvas.height = base.height;
    resources.push(canvas);
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not create the animation canvas");

    const xScale = base.width / frameBounds.width;
    const yScale = base.height / frameBounds.height;
    const x = (codeBounds.left - frameBounds.left) * xScale;
    const y = (codeBounds.top - frameBounds.top) * yScale;
    const width = codeBounds.width * xScale;
    const height = codeBounds.height * yScale;
    let previousState = "";

    const drawRegion = (source: HTMLCanvasElement, left: number, top: number, right: number, bottom: number) => {
      if (right <= left || bottom <= top) return;
      context.drawImage(
        source,
        left,
        top,
        right - left,
        bottom - top,
        x + (left * width) / atlas.width,
        y + (top * height) / atlas.height,
        ((right - left) * width) / atlas.width,
        ((bottom - top) * height) / atlas.height,
      );
    };

    return {
      canvas,
      dispose,
      render(progress) {
        signal.throwIfAborted();
        const state = getTypingRenderStateKey(characters.length, progress, showCursor);
        if (state === previousState) return;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(base, 0, 0);
        const count = getVisibleCharacterCount(characters.length, progress);
        const caret = carets[count];
        if (!caret) context.drawImage(atlas, x, y, width, height);
        else {
          const left = Math.max(0, Math.min(atlas.width, (caret.x * atlas.width) / codeBounds.width));
          const top = Math.max(0, Math.min(atlas.height, (caret.y * atlas.height) / codeBounds.height));
          const bottom = Math.min(atlas.height, top + (caret.height * atlas.height) / codeBounds.height);
          drawRegion(atlas, 0, 0, atlas.width, top);
          drawRegion(atlas, 0, top, left, bottom);
          drawRegion(annotations, left, top, atlas.width, bottom);
          if (showCursor && progress < 1) {
            context.fillStyle = color;
            context.fillRect(
              x + caret.x * xScale,
              y + (caret.y + caret.height * 0.15) * yScale,
              Math.max(1, 2 * pixelRatio),
              caret.height * 0.7 * yScale,
            );
          }
        }
        previousState = state;
      },
    };
  } catch (error) {
    dispose();
    throw error;
  }
}
