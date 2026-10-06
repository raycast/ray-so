import { useEffect, useRef, useState } from "react";
import { FINAL_HOLD_DURATION_SECONDS } from "./typingAnimation";
import { createTypingRenderer, TypingRenderer } from "./typingRenderer";

type PreviewSession = {
  controller: AbortController;
  renderer?: TypingRenderer;
  animationFrame?: number;
  restoreFrame?: () => void;
};

function disposePreview(session: PreviewSession) {
  session.controller.abort();
  if (session.animationFrame !== undefined) cancelAnimationFrame(session.animationFrame);
  session.renderer?.canvas.remove();
  session.restoreFrame?.();
  session.renderer?.dispose();
}

export function useTypingPreview() {
  const sessionRef = useRef<PreviewSession | null>(null);
  const [isPreviewing, setIsPreviewing] = useState(false);

  useEffect(
    () => () => {
      if (sessionRef.current) disposePreview(sessionRef.current);
      sessionRef.current = null;
    },
    [],
  );

  function stopPreview() {
    if (sessionRef.current) disposePreview(sessionRef.current);
    sessionRef.current = null;
    setIsPreviewing(false);
  }

  async function playPreview(
    frame: HTMLElement,
    duration: number,
    showCursor: boolean,
    onError: (error: unknown) => void,
  ) {
    stopPreview();
    const session: PreviewSession = { controller: new AbortController() };
    sessionRef.current = session;
    setIsPreviewing(true);
    try {
      const renderer = await createTypingRenderer(frame, {
        pixelRatio: window.devicePixelRatio || 1,
        showCursor,
        signal: session.controller.signal,
      });
      session.renderer = renderer;
      session.controller.signal.throwIfAborted();
      const { canvas } = renderer;
      Object.assign(canvas.style, {
        position: "absolute",
        inset: "0",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: "10",
        visibility: "visible",
      });
      canvas.dataset.ignoreInExport = "true";
      canvas.setAttribute("aria-hidden", "true");
      renderer.render(0);
      const previousVisibility = frame.style.visibility;
      session.restoreFrame = () => {
        frame.style.visibility = previousVisibility;
      };
      frame.style.visibility = "hidden";
      frame.append(canvas);
      const startedAt = performance.now();
      const tick = (now: number) => {
        if (sessionRef.current !== session) return;
        const elapsed = (now - startedAt) / 1000;
        renderer.render(Math.min(1, elapsed / duration));
        if (elapsed >= duration + FINAL_HOLD_DURATION_SECONDS) stopPreview();
        else session.animationFrame = requestAnimationFrame(tick);
      };
      session.animationFrame = requestAnimationFrame(tick);
    } catch (error) {
      if (sessionRef.current === session) {
        stopPreview();
        onError(error);
      } else disposePreview(session);
    }
  }

  return { isPreviewing, playPreview, stopPreview };
}
