import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Run against a dev server. Playwright can be installed separately; no app dependency is needed.
// PLAYWRIGHT_MODULE_PATH optionally points to its index.mjs; RAY_SO_TEST_URL defaults to localhost:3000.
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE_PATH || "playwright");
const baseUrl = process.env.RAY_SO_TEST_URL || "http://127.0.0.1:3000";
const artifacts = process.env.RAY_SO_TEST_ARTIFACTS_DIR || mkdtempSync(join(tmpdir(), "ray-so-typing-"));
const browser = await chromium.launch({ headless: true });
const sample = 'const greeting = "Hello World";\nconsole.log(greeting);';

async function withPage(
  { mobile = false, snippet = sample, pausePreview = false, path = "/videos", duration = 15 } = {},
  verify,
) {
  const page = await browser.newPage({
    viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 1000 },
    acceptDownloads: true,
  });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(
    ({ pausePreview }) => {
      localStorage.setItem("typingVideoFps", "30");
      localStorage.setItem("size", "2");
      window.__typingTest = { frames: [], captures: 0, rejections: [] };
      window.addEventListener("unhandledrejection", (event) =>
        window.__typingTest.rejections.push(String(event.reason)),
      );
      const descriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, "src");
      Object.defineProperty(HTMLImageElement.prototype, "src", {
        ...descriptor,
        set(value) {
          if (value.startsWith("data:image/svg+xml")) window.__typingTest.captures++;
          descriptor.set.call(this, value);
        },
      });
      const encode = VideoEncoder.prototype.encode;
      VideoEncoder.prototype.encode = function (frame, options) {
        window.__typingTest.frames.push(frame.timestamp);
        return encode.call(this, frame, options);
      };
      if (pausePreview) {
        const raf = window.requestAnimationFrame;
        window.requestAnimationFrame = (callback) => {
          if (callback.name === "tick") {
            window.__typingTest.tick = callback;
            window.__typingTest.startedAt ??= performance.now();
            return 999999;
          }
          return raf(callback);
        };
      }
    },
    { pausePreview },
  );
  const hash = new URLSearchParams({
    code: Buffer.from(snippet).toString("base64"),
    language: "tsx",
    theme: "breeze",
    typingDuration: String(duration),
    typingCursor: "false",
    padding: "128",
    lineNumbers: "false",
    title: "My snippet",
  });
  try {
    await page.goto(`${baseUrl}${path}#${hash}`, { waitUntil: "networkidle", timeout: 120000 });
    await page.waitForFunction(
      () => document.querySelector("[data-export-layer='code']")?.dataset.exportReady === "true",
    );
    await verify(page);
    assert.deepEqual(errors, []);
    assert.deepEqual(await page.evaluate(() => window.__typingTest.rejections), []);
  } finally {
    await page.close();
  }
}

async function playPreview(page) {
  await page.getByRole("button", { name: "Export as video" }).click();
  await page.getByRole("button", { name: "Play preview" }).click();
  await page.locator("#frame canvas").waitFor();
}

async function assertPreviewStopped(page) {
  await page.locator("#frame canvas").waitFor({ state: "detached" });
  assert.equal(await page.locator("#frame").evaluate((frame) => frame.style.visibility), "");
  await page.getByRole("button", { name: "Export as video" }).click();
  assert.equal(await page.getByRole("button", { name: "Play preview", exact: true }).isEnabled(), true);
  assert.equal(await page.getByRole("button", { name: "Export WEBM", exact: true }).isEnabled(), true);
  await page.getByRole("button", { name: "Close", exact: true }).click();
}

async function checkBidi(page, snippet, word) {
  await playPreview(page);
  await page.evaluate(
    ({ snippet, word }) => {
      const frame = document.querySelector("#frame");
      const canvas = frame.querySelector("canvas");
      const code = frame.querySelector("[data-export-layer='code']");
      const bounds = frame.getBoundingClientRect();
      const scaleX = canvas.width / bounds.width;
      const scaleY = canvas.height / bounds.height;
      const nodes = [];
      const walker = document.createTreeWalker(code, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) nodes.push(walker.currentNode);
      const boxes = Array.from(
        new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(word),
        ({ index, segment }) => {
          let start = snippet.indexOf(word) + index;
          let nodeIndex = 0;
          while (start >= nodes[nodeIndex].length) start -= nodes[nodeIndex++].length;
          const range = document.createRange();
          range.setStart(nodes[nodeIndex], start);
          range.setEnd(nodes[nodeIndex], start + segment.length);
          const rect = range.getBoundingClientRect();
          return {
            x: Math.ceil((rect.left - bounds.left) * scaleX) + 1,
            y: Math.ceil((rect.top - bounds.top) * scaleY) + 1,
            width: Math.max(1, Math.floor(rect.width * scaleX) - 2),
            height: Math.max(1, Math.floor(rect.height * scaleY) - 2),
          };
        },
      );
      window.__typingTest.boxes = boxes;
      window.__typingTest.baseline = boxes.map(({ x, y, width, height }) =>
        Array.from(canvas.getContext("2d").getImageData(x, y, width, height).data),
      );
    },
    { snippet, word },
  );

  const prefixCount = snippet.indexOf(word);
  const total = Array.from(new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(snippet)).length;
  const wordCount = Array.from(new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(word)).length;
  for (const typed of [0, 1, 2, wordCount, 0]) {
    const changed = await page.evaluate(
      ({ count, total }) => {
        const state = window.__typingTest;
        state.tick(state.startedAt + ((count + 0.25) / total) * 15000);
        const context = document.querySelector("#frame canvas").getContext("2d");
        return state.boxes.map(({ x, y, width, height }, index) => {
          const pixels = context.getImageData(x, y, width, height).data;
          return pixels.some((value, offset) => value !== state.baseline[index][offset]);
        });
      },
      { count: prefixCount + typed, total },
    );
    assert.deepEqual(
      changed,
      Array.from({ length: wordCount }, (_, index) => index < typed),
      `Unexpected glyphs after typing ${typed} RTL graphemes`,
    );
  }
  assert.equal(await page.evaluate(() => window.__typingTest.captures), 3);
}

try {
  for (const mobile of [true, false]) {
    await withPage({ mobile, path: "/" }, async (page) => {
      const initialHash = await page.evaluate(() => location.hash);
      await page.locator("nav").getByRole("button", { name: "Code Images", exact: true }).click();
      await page.getByRole("menuitem", { name: /Code Videos/ }).click();
      await page.waitForURL((url) => url.pathname === "/videos");
      assert.equal(await page.evaluate(() => location.hash), initialHash);
      await page.reload({ waitUntil: "networkidle" });
      assert.equal(await page.locator("[data-export-layer='code']").textContent(), sample);
      await page.locator("nav").getByRole("button", { name: "Code Videos", exact: true }).click();
      await page.getByRole("menuitem", { name: /Code Images/ }).click();
      await page.waitForURL((url) => url.pathname === "/");
      assert.equal(await page.evaluate(() => location.hash), initialHash);
    });
    console.log(`PASS ${mobile ? "mobile" : "desktop"} navigation and refresh preserve the snippet hash`);
  }

  await withPage({}, async (page) => {
    await playPreview(page);
    await page.keyboard.press("c");
    await assertPreviewStopped(page);
    await playPreview(page);
    await page.evaluate(() => {
      document.querySelector("[data-export-layer='code']").style.letterSpacing = "1px";
    });
    await assertPreviewStopped(page);
    await playPreview(page);
    await page.setViewportSize({ width: 390, height: 844 });
    await assertPreviewStopped(page);
  });
  console.log("PASS theme, DOM appearance and viewport changes stop preview and restore the editor");

  await withPage({}, async (page) => {
    await page.getByRole("button", { name: "Export as video" }).click();
    await page.getByRole("button", { name: "Play preview" }).click();
    await page.keyboard.press("c");
    await page.waitForTimeout(1500);
    await assertPreviewStopped(page);
  });
  console.log("PASS settings changes during preparation cancel preview without stale errors");

  await withPage({ duration: 1 }, async (page) => {
    await playPreview(page);
    await page.waitForTimeout(350);
    assert.equal(await page.locator("#frame canvas").count(), 1);
    await page.locator("#frame canvas").screenshot();
    assert.equal(await page.locator("#frame canvas").count(), 1);
    await assertPreviewStopped(page);
  });
  console.log("PASS unchanged preview completes its timeline and restores the editor");

  for (const word of ["\u05e9\u05dc\u05d5\u05dd", "\u0645\u0631\u062d\u0628\u0627"]) {
    const snippet = `const text = '${word}';`;
    await withPage({ snippet, pausePreview: true }, (page) => checkBidi(page, snippet, word));
    console.log("PASS RTL graphemes reveal in logical order, including backward seek");
  }

  await withPage({ duration: 1, snippet: "const text = '\u05e9\u05dc\u05d5\u05dd';" }, async (page) => {
    await page.getByRole("button", { name: "Export as video" }).click();
    const downloading = page.waitForEvent("download", { timeout: 60000 });
    await page.getByRole("button", { name: "Export WEBM", exact: true }).click();
    const download = await downloading;
    await download.saveAs(join(artifacts, "rtl.webm"));
    const stats = await page.evaluate(() => window.__typingTest);
    assert.equal(stats.captures, 3);
    assert.equal(stats.frames.length, 53);
    assert.equal(stats.frames.at(-1), Math.round((52 / 30) * 1_000_000));
  });
  console.log("PASS RTL WebM export keeps exact frame timestamps and three rasterizations");
} finally {
  await browser.close();
  if (!process.env.RAY_SO_TEST_ARTIFACTS_DIR) rmSync(artifacts, { recursive: true, force: true });
}
