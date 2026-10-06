import { useEffect, useRef, useState } from "react";
import { FINAL_HOLD_DURATION_SECONDS } from "./typingAnimation";
import { createTypingRenderer, TypingRenderer } from "./typingRenderer";

type PreviewSession = {
  controller: AbortController;
  renderer?: TypingRenderer;
  animationFrame?: number;
  restoreFrame?: () => void;
  stopWatching?: () => void;
};

function disposePreview(session: PreviewSession) {
  session.stopWatching?.();
  session.controller.abort();
  if (session.animationFrame !== undefined) cancelAnimationFrame(session.animationFrame);
  session.renderer?.canvas.remove();
  session.restoreFrame?.();
  session.renderer?.dispose();
}

function changesExportedAppearance(mutation: MutationRecord) {
  const element = mutation.target instanceof Element ? mutation.target : mutation.target.parentElement;
  if (element?.closest("textarea, [data-ignore-in-export]")) return false;

  if (mutation.type === "attributes" && mutation.attributeName === "style" && element instanceof HTMLElement) {
    const previous = document.createElement("div").style;
    previous.cssText = mutation.oldValue ?? "";
    const current = element.style;
    // Native carets do not appear in the rasterized input/textarea snapshot.
    return Array.from(previous)
      .concat(Array.from(current))
      .some(
        (property) =>
          property !== "caret-color" &&
          (previous.getPropertyValue(property) !== current.getPropertyValue(property) ||
            previous.getPropertyPriority(property) !== current.getPropertyPriority(property)),
      );
  }
  if (mutation.type !== "childList") return true;
  return Array.from(mutation.addedNodes)
    .concat(Array.from(mutation.removedNodes))
    .some((node) => !(node instanceof HTMLElement && (node.tagName === "TEXTAREA" || node.dataset.ignoreInExport)));
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
    const invalidatePreview = () => {
      if (sessionRef.current === session) stopPreview();
    };
    const initialHash = window.location.hash;
    const onHashChange = () => {
      if (window.location.hash !== initialHash) invalidatePreview();
    };
    let mutationObserver: MutationObserver | undefined;
    let resizeObserver: ResizeObserver | undefined;
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("resize", invalidatePreview);
    session.stopWatching = () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("resize", invalidatePreview);
      mutationObserver?.disconnect();
      resizeObserver?.disconnect();
    };
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
      mutationObserver = new MutationObserver((mutations) => {
        if (mutations.some(changesExportedAppearance)) invalidatePreview();
      });
      mutationObserver.observe(frame, {
        attributes: true,
        attributeOldValue: true,
        childList: true,
        characterData: true,
        subtree: true,
      });
      const bounds = frame.getBoundingClientRect();
      resizeObserver = new ResizeObserver(() => {
        const current = frame.getBoundingClientRect();
        if (Math.abs(current.width - bounds.width) > 0.5 || Math.abs(current.height - bounds.height) > 0.5) {
          invalidatePreview();
        }
      });
      resizeObserver.observe(frame);
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
