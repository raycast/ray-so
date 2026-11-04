import { BufferTarget, CanvasSource, getFirstEncodableVideoCodec, Output, Quality, WebMOutputFormat } from "mediabunny";

type RecordVideoOptions = {
  canvas: HTMLCanvasElement;
  fps: number;
  frameCount: number;
  finalHoldFrameCount: number;
  signal: AbortSignal;
  renderFrame: (frameIndex: number) => void;
  onProgress: (progress: number) => void;
};

export function getSupportedVideoFormat() {
  if (typeof window === "undefined" || typeof VideoEncoder === "undefined" || typeof VideoFrame === "undefined") {
    return null;
  }
  return { extension: "webm", mimeType: "video/webm" } as const;
}

export async function recordVideo({
  canvas,
  fps,
  frameCount,
  finalHoldFrameCount,
  signal,
  renderFrame,
  onProgress,
}: RecordVideoOptions) {
  signal.throwIfAborted();
  if (!getSupportedVideoFormat()) throw new Error("WebCodecs video export is not supported in this browser");
  if (
    !Number.isFinite(fps) ||
    fps <= 0 ||
    !Number.isInteger(frameCount) ||
    frameCount < 1 ||
    !Number.isInteger(finalHoldFrameCount) ||
    finalHoldFrameCount < 0 ||
    !canvas.width ||
    !canvas.height
  ) {
    throw new Error("Invalid video export settings");
  }

  const quality = new Quality({ bitrate: 12_000_000, bitrateMode: "variable" });
  const codec = await getFirstEncodableVideoCodec(["vp9", "vp8"], {
    width: canvas.width,
    height: canvas.height,
    quality,
  });
  signal.throwIfAborted();
  if (!codec) throw new Error("This browser does not support VP8 or VP9 encoding for WebM export");

  const target = new BufferTarget();
  const output = new Output({ format: new WebMOutputFormat(), target });
  const source = new CanvasSource(canvas, {
    codec,
    quality,
    contentHint: "text",
    keyFrameInterval: 1,
    latencyMode: "quality",
  });
  const totalFrames = frameCount + finalHoldFrameCount;
  output.addVideoTrack(source, { frameRate: fps, maximumPacketCount: totalFrames });
  const cancel = () => {
    if (output.state !== "canceled" && output.state !== "finalized") void output.cancel().catch(() => {});
  };
  signal.addEventListener("abort", cancel, { once: true });

  try {
    await output.start();
    for (let index = 0; index < totalFrames; index += 1) {
      signal.throwIfAborted();
      renderFrame(Math.min(index, frameCount - 1));
      // Encoding timestamps follow the timeline, not the time spent rendering.
      await source.add(index / fps, 1 / fps);
      if (index % Math.max(1, Math.round(fps / 10)) === 0 || index === totalFrames - 1) {
        onProgress((index + 1) / totalFrames);
        // Allow cancellation and navigation even when encoding resolves synchronously.
        await new Promise<void>((resolve) => setTimeout(resolve, 0));
      }
    }
    signal.throwIfAborted();
    source.close();
    await output.finalize();
    signal.throwIfAborted();
    if (!target.buffer) throw new Error("Video export did not produce output data");
    return new Blob([target.buffer], { type: "video/webm" });
  } catch (error) {
    if (output.state !== "canceled" && output.state !== "finalized") await output.cancel().catch(() => {});
    throw error;
  } finally {
    signal.removeEventListener("abort", cancel);
  }
}
