"use client";

import { Button } from "@/components/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/dialog";
import { Input } from "@/components/input";
import { Select, SelectContent, SelectItem, SelectItemText, SelectTrigger, SelectValue } from "@/components/select";
import { Switch } from "@/components/switch";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { fileNameAtom } from "../store";
import {
  isTypingVideoFps,
  TYPING_VIDEO_FPS_OPTIONS,
  typingCursorAtom,
  typingDurationAtom,
  typingVideoFpsAtom,
} from "../store/animation";
import { codeAtom } from "../store/code";
import { derivedFlashMessageAtom } from "../store/flash";
import { EXPORT_SIZE_OPTIONS, exportSizeAtom, isExportSize, SIZE_LABELS } from "../store/image";
import { FrameContext } from "../store/FrameContextStore";
import download from "../util/download";
import { getSupportedVideoFormat, recordVideo } from "../util/exportVideo";
import { FINAL_HOLD_DURATION_SECONDS, getTypingCharacters } from "../util/typingAnimation";
import { createTypingRenderer, TypingRenderer } from "../util/typingRenderer";
import { useTypingPreview } from "../util/useTypingPreview";

import KeyboardIcon from "../assets/icons/keyboard-16.svg";

type TypingExportDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function TypingExportDialog({ open, onOpenChange }: TypingExportDialogProps) {
  const frameContext = useContext(FrameContext);
  const [typingDuration, setTypingDuration] = useAtom(typingDurationAtom);
  const [typingCursor, setTypingCursor] = useAtom(typingCursorAtom);
  const [typingVideoFps, setTypingVideoFps] = useAtom(typingVideoFpsAtom);
  const [exportSize, setExportSize] = useAtom(exportSizeAtom);
  const setFlashMessage = useSetAtom(derivedFlashMessageAtom);
  const code = useAtomValue(codeAtom);
  const customFileName = useAtomValue(fileNameAtom);
  const supportedFormat = useMemo(() => getSupportedVideoFormat(), []);
  const fileName = customFileName.replaceAll(" ", "-") || "ray-so-export";
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const exportControllerRef = useRef<AbortController | null>(null);
  const { isPreviewing, playPreview, stopPreview } = useTypingPreview();
  const characterCount = getTypingCharacters(code).length;
  const estimatedFrameCount = Math.max(1, Math.ceil(typingDuration * typingVideoFps));
  const finalHoldFrameCount = Math.round(typingVideoFps * FINAL_HOLD_DURATION_SECONDS);
  const estimatedVideoDuration = (estimatedFrameCount + finalHoldFrameCount) / typingVideoFps;

  useEffect(
    () => () => {
      exportControllerRef.current?.abort();
      exportControllerRef.current = null;
    },
    [],
  );

  useEffect(() => {
    if (!open) {
      exportControllerRef.current?.abort();
      setErrorMessage(null);
    }
  }, [open]);

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) exportControllerRef.current?.abort();
    onOpenChange(nextOpen);
  }

  function handlePreviewClick() {
    if (isPreviewing) {
      stopPreview();
      return;
    }
    if (!frameContext?.current) {
      setErrorMessage("Could not find the code frame to preview.");
      return;
    }
    setErrorMessage(null);
    onOpenChange(false);
    void playPreview(frameContext.current, typingDuration, typingCursor, (error) => {
      setFlashMessage({
        icon: <KeyboardIcon />,
        message: error instanceof Error ? error.message : "Typing preview failed",
        timeout: 2500,
      });
    });
  }

  async function exportVideo() {
    if (exportControllerRef.current) return;
    if (!supportedFormat || !frameContext?.current) {
      setErrorMessage("Video export requires a code frame and a recent Chromium-based browser.");
      return;
    }

    stopPreview();
    const controller = new AbortController();
    exportControllerRef.current = controller;
    setErrorMessage(null);
    setProgress(null);
    setIsExporting(true);
    let renderer: TypingRenderer | undefined;

    try {
      renderer = await createTypingRenderer(frameContext.current, {
        pixelRatio: isExportSize(exportSize) ? exportSize : 2,
        showCursor: typingCursor,
        signal: controller.signal,
      });
      const preparedRenderer = renderer;
      const videoBlob = await recordVideo({
        canvas: renderer.canvas,
        fps: typingVideoFps,
        frameCount: estimatedFrameCount,
        finalHoldFrameCount,
        signal: controller.signal,
        renderFrame: (index) =>
          preparedRenderer.render(estimatedFrameCount === 1 ? 1 : index / (estimatedFrameCount - 1)),
        onProgress: (value) => {
          if (exportControllerRef.current === controller && !controller.signal.aborted) setProgress(value);
        },
      });
      controller.signal.throwIfAborted();

      const objectUrl = URL.createObjectURL(videoBlob);
      download(objectUrl, `${fileName}.${supportedFormat.extension}`);
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 30_000);
      setFlashMessage({ icon: <KeyboardIcon />, message: "WEBM exported!", timeout: 2000 });
      onOpenChange(false);
    } catch (error) {
      if (exportControllerRef.current === controller && !controller.signal.aborted) {
        setErrorMessage(error instanceof Error ? error.message : "Typing video export failed");
      }
    } finally {
      renderer?.dispose();
      if (exportControllerRef.current === controller) {
        exportControllerRef.current = null;
        setIsExporting(false);
        setProgress(null);
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent size="medium">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <DialogTitle>Typing Animation</DialogTitle>
            <DialogDescription>
              Export the current snippet as a typing animation video. Higher frame rates and larger export sizes take
              longer to render.
            </DialogDescription>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-gray-11">
              <span className="font-medium text-gray-12">Duration</span>
              <Input
                type="number"
                min={1}
                max={15}
                step={0.5}
                value={typingDuration}
                disabled={isExporting}
                onChange={(event) => {
                  const nextDuration = event.currentTarget.valueAsNumber;

                  if (Number.isFinite(nextDuration)) {
                    setTypingDuration(Math.min(Math.max(nextDuration, 1), 15));
                  }
                }}
              />
            </label>

            <label className="flex flex-col gap-2 text-sm text-gray-11">
              <span className="font-medium text-gray-12">Frame rate</span>
              <Select
                value={typingVideoFps.toString()}
                disabled={isExporting}
                onValueChange={(value) => {
                  const nextFps = Number(value);

                  if (isTypingVideoFps(nextFps)) {
                    setTypingVideoFps(nextFps);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frame rate" />
                </SelectTrigger>
                <SelectContent>
                  {TYPING_VIDEO_FPS_OPTIONS.map((fps) => (
                    <SelectItem key={fps} value={fps.toString()}>
                      <SelectItemText>{fps} fps</SelectItemText>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>

            <label className="flex flex-col gap-2 text-sm text-gray-11">
              <span className="font-medium text-gray-12">Export size</span>
              <Select
                value={exportSize.toString()}
                disabled={isExporting}
                onValueChange={(value) => {
                  const nextSize = Number(value);

                  if (isExportSize(nextSize)) {
                    setExportSize(nextSize);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {EXPORT_SIZE_OPTIONS.map((size) => (
                    <SelectItem key={size} value={size.toString()}>
                      <SelectItemText>{SIZE_LABELS[size]}</SelectItemText>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>

            <div className="flex flex-col gap-2 text-sm text-gray-11">
              <span className="font-medium text-gray-12">Cursor</span>
              <div className="flex h-[30px] items-center justify-between rounded-md border border-gray-a4 bg-gray-2 px-3">
                <span className="text-gray-11">Show typing cursor</span>
                <Switch disabled={isExporting} checked={typingCursor} onCheckedChange={setTypingCursor} />
              </div>
            </div>
          </div>

          <div className="rounded-md border border-gray-a4 bg-gray-a2 p-3 text-sm text-gray-11">
            <p className="font-medium text-gray-12">Export summary</p>
            <p className="mt-1">
              {characterCount} characters, {estimatedFrameCount + finalHoldFrameCount} frames, about{" "}
              {estimatedVideoDuration.toFixed(1)}s of video in {supportedFormat?.extension.toUpperCase() ?? "video"}{" "}
              format.
            </p>
          </div>

          {isExporting ? (
            <div className="flex flex-col gap-2 text-sm text-gray-11" role="status" aria-live="polite">
              <span>
                {progress === null
                  ? "Preparing animation…"
                  : progress === 1
                    ? "Finalizing video…"
                    : `Encoding video: ${Math.round(progress * 100)}%`}
              </span>
              <progress className="w-full" max={1} value={progress ?? undefined} aria-label="Video export progress" />
            </div>
          ) : null}

          {errorMessage ? (
            <div className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {errorMessage}
            </div>
          ) : null}

          <div className="flex items-center justify-end gap-2">
            {isExporting ? (
              <Button variant="secondary" onClick={() => exportControllerRef.current?.abort()}>
                Cancel export
              </Button>
            ) : null}
            <Button variant="secondary" onClick={handlePreviewClick} disabled={isExporting}>
              {isPreviewing ? "Stop preview" : "Play preview"}
            </Button>
            <Button variant="primary" onClick={exportVideo} disabled={isExporting || isPreviewing || !supportedFormat}>
              {isExporting ? "Exporting…" : `Export ${supportedFormat?.extension.toUpperCase() ?? "Video"}`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
