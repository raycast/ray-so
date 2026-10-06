import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

// Use the project's TypeScript compiler without adding a test-runner dependency.
function loadModule(name, imports = {}, globals = {}) {
  const source = readFileSync(new URL(`../app/(navigation)/(code)/util/${name}.ts`, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  const loadedModule = { exports: {} };
  runInNewContext(outputText, {
    module: loadedModule,
    exports: loadedModule.exports,
    require: (name) => {
      assert.ok(name in imports, `Unexpected import: ${name}`);
      return imports[name];
    },
    Intl,
    Blob,
    setTimeout,
    ...globals,
  });
  return loadedModule.exports;
}

const animation = loadModule("typingAnimation");

test("typing reveals whole graphemes, including combined accents and emoji", () => {
  const text = "A\u0065\u0301\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc66Z";
  assert.equal(animation.getTypingCharacters(text).length, 4);
  assert.equal(animation.getVisibleCode(text, 0.5), "Ae\u0301");
  assert.equal(animation.getVisibleCode(text, 0.75), text.slice(0, -1));
  assert.equal(animation.getVisibleCode(text, 1), text);
  assert.equal(animation.getVisibleCode(text, null), text);
});

test("typing boundaries clamp the count and remove the final cursor", () => {
  assert.equal(animation.getVisibleCharacterCount(121, -1), 0);
  assert.equal(animation.getVisibleCharacterCount(121, 2), 121);
  assert.equal(animation.getVisibleCharacterCount(0, 0.5), 0);
  assert.equal(animation.getTypingRenderStateKey(121, 0, true), "0:1");
  assert.equal(animation.getTypingRenderStateKey(121, 1, true), "121:0");
  assert.equal(animation.getTypingRenderStateKey(121, 0.5, false), "60:0");
});

function createRecorder({ onAdd, onFinalize, codec = "vp9" } = {}) {
  const state = { samples: [], rendered: [], progress: [], canceled: 0, finalized: 0 };
  const mediabunny = {
    BufferTarget: class {},
    Quality: class {
      constructor(options) {
        this.options = options;
      }
    },
    WebMOutputFormat: class {},
    getFirstEncodableVideoCodec: async () => codec,
    CanvasSource: class {
      constructor(canvas, config) {
        state.canvas = canvas;
        state.config = config;
      }
      async add(timestamp, duration) {
        state.samples.push({ timestamp, duration });
        await onAdd?.(state.samples.length);
      }
      close() {
        state.closed = true;
      }
    },
    Output: class {
      state = "pending";
      constructor({ target }) {
        this.target = target;
      }
      addVideoTrack(_source, config) {
        state.track = config;
      }
      async start() {
        this.state = "started";
      }
      async cancel() {
        state.canceled++;
        this.state = "canceled";
      }
      async finalize() {
        await onFinalize?.();
        state.finalized++;
        this.state = "finalized";
        this.target.buffer = new ArrayBuffer(1);
      }
    },
  };
  const { recordVideo } = loadModule(
    "exportVideo",
    { mediabunny },
    {
      window: {},
      VideoEncoder: class {},
      VideoFrame: class {},
    },
  );
  const options = {
    canvas: { width: 520, height: 300 },
    fps: 60,
    frameCount: 10,
    finalHoldFrameCount: 3,
    signal: new AbortController().signal,
    renderFrame: (index) => state.rendered.push(index),
    onProgress: (value) => state.progress.push(value),
  };
  return { state, options, recordVideo };
}

for (const fps of [12, 24, 30, 60]) {
  test(`${fps} fps: complete timeline and final hold without dropped frames`, async () => {
    const { state, options, recordVideo } = createRecorder();
    const frameCount = 6 * fps;
    const finalHoldFrameCount = Math.round(animation.FINAL_HOLD_DURATION_SECONDS * fps);
    const total = frameCount + finalHoldFrameCount;
    const result = await recordVideo({ ...options, fps, frameCount, finalHoldFrameCount });
    assert.equal(result.type, "video/webm");
    assert.equal(state.canvas, options.canvas);
    assert.equal(state.samples.length, total);
    for (let index = 0; index < total; index++) {
      assert.equal(state.samples[index].timestamp, index / fps);
      assert.equal(state.samples[index].duration, 1 / fps);
      assert.equal(state.rendered[index], Math.min(index, frameCount - 1));
    }
    assert.equal(state.progress.at(-1), 1);
    assert.equal(state.config.latencyMode, "quality");
    assert.equal(state.config.quality.options.bitrate, 12_000_000);
    assert.equal(state.track.maximumPacketCount, total);
    assert.equal(state.finalized, 1);
    assert.equal(state.canceled, 0);
  });
}

test("invalid settings and unavailable codecs fail before encoding", async () => {
  const { state, options, recordVideo } = createRecorder();
  for (const fps of [0, -1, NaN, Infinity]) {
    await assert.rejects(recordVideo({ ...options, fps }), /Invalid video export settings/);
  }
  await assert.rejects(recordVideo({ ...options, frameCount: 0 }), /Invalid video export settings/);
  await assert.rejects(recordVideo({ ...options, finalHoldFrameCount: -1 }), /Invalid video export settings/);
  assert.equal(state.samples.length, 0);
  const unsupported = createRecorder({ codec: null });
  await assert.rejects(unsupported.recordVideo(unsupported.options), /does not support VP8 or VP9/);
});

test("an already canceled export never starts encoding", async () => {
  const { state, options, recordVideo } = createRecorder();
  await assert.rejects(recordVideo({ ...options, signal: AbortSignal.abort() }), { name: "AbortError" });
  assert.equal(state.samples.length, 0);
  assert.equal(state.finalized, 0);
});

test("cancellation stops encoding and never finalizes a partial video", async () => {
  const controller = new AbortController();
  const { state, options, recordVideo } = createRecorder({
    onAdd: (count) => {
      if (count === 7) controller.abort();
    },
  });
  await assert.rejects(recordVideo({ ...options, signal: controller.signal }), { name: "AbortError" });
  assert.equal(state.samples.length, 7);
  assert.equal(state.canceled, 1);
  assert.equal(state.finalized, 0);
});

test("rendering, encoding and finalization errors cancel the output", async () => {
  const failure = new Error("Test failure");
  const cases = [
    {
      behavior: {},
      override: {
        renderFrame: () => {
          throw failure;
        },
      },
    },
    {
      behavior: {
        onAdd: () => {
          throw failure;
        },
      },
      override: {},
    },
    {
      behavior: {
        onFinalize: () => {
          throw failure;
        },
      },
      override: {},
    },
  ];
  for (const { behavior, override } of cases) {
    const { state, options, recordVideo } = createRecorder(behavior);
    await assert.rejects(recordVideo({ ...options, ...override }), failure);
    assert.equal(state.canceled, 1);
    assert.equal(state.finalized, 0);
  }
});
