"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@raycast/icons";
import { Button } from "@/components/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/dialog";
import { cn } from "@/utils/cn";

type ShortcutInstallLink = {
  label: string;
  /** “Get Shortcut” iCloud link — leave empty until set; empty entries render as plain text. */
  href: string;
};

type GuideStep = {
  title: string;
  body: string;
  /** Optional second paragraph (e.g. before shortcut links). */
  bodyFollowUp?: string;
  shortcutLinks?: ShortcutInstallLink[];
  /** Files in `public/ios-shortcut-install-guide/` — path must match extension (e.g. `.jpg` vs `.png`). */
  imageSrc?: string;
};

/** Set `href` to each shortcut’s iCloud “Get Shortcut” URL (opens Shortcuts on iPhone). */
const RAYCAST_FEATURE_SHORTCUT_LINKS: ShortcutInstallLink[] = [
  { label: "AI", href: "https://www.icloud.com/shortcuts/57294c0ebfc244cc913403db73df8490" },
  { label: "Quicklinks", href: "https://www.icloud.com/shortcuts/f8eb59700c4540678e84eed5a42ddfd7" },
  { label: "Calculator", href: "https://www.icloud.com/shortcuts/b9b08b569941443e9d29b9c16de19dd1" },
  { label: "Notes", href: "https://www.icloud.com/shortcuts/d06271cffd2c4622923e4e1dd0b9adb1" },
  { label: "Snippets", href: "https://www.icloud.com/shortcuts/91f636b4fa1144c6a8b7c54fb61c632d" },
];

const INSTALL_GUIDE_STEPS: GuideStep[] = [
  {
    title: "Save icons to Photos",
    body: "Select the icons you want, tap Save Selected, then save them from the share sheet. On a Mac, download and AirDrop to your iPhone if needed.",
    imageSrc: "/ios-shortcut-install-guide/ios-guide-1.jpg",
  },
  {
    title: "Open your shortcut",
    body: "On your iPhone, open the Shortcuts app and open the shortcut you want on your Home Screen.",
    bodyFollowUp: "Or install a shortcut directly.",
    shortcutLinks: RAYCAST_FEATURE_SHORTCUT_LINKS,
    imageSrc: "/ios-shortcut-install-guide/ios-guide-2.jpg",
  },
  {
    title: "Add to Home Screen",
    body: "Tap the title menu in the shortcut editor, then choose Add to Home Screen.",
    imageSrc: "/ios-shortcut-install-guide/ios-guide-3.jpg",
  },
  {
    title: "Choose the custom icon",
    body: "Tap on image, choose Choose Photo, pick your saved image",
    imageSrc: "/ios-shortcut-install-guide/ios-guide-4.jpg",
  },
  {
    title: "Add to Home Screen",
    body: "Tap on Add, and your icon will be added to your Home Screen.",
    imageSrc: "/ios-shortcut-install-guide/ios-guide-5.jpg",
  },
];

type InstallGuideDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function GuideStepImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return null;
  }

  return (
    <div className="relative mx-auto aspect-[1468/826] w-full max-w-[min(100%,720px)] shrink-0 overflow-hidden rounded-xl border border-gray-6 bg-gray-3 shadow-sm">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain object-center"
        sizes="(max-width: 768px) 100vw, 720px"
        onError={() => setFailed(true)}
        priority={false}
      />
    </div>
  );
}

export function InstallGuideDialog({ open, onOpenChange }: InstallGuideDialogProps) {
  const [step, setStep] = useState(0);
  const total = INSTALL_GUIDE_STEPS.length;
  const current = INSTALL_GUIDE_STEPS[step]!;

  const goPrev = useCallback(() => setStep((s) => Math.max(0, s - 1)), []);
  const goNext = useCallback(() => setStep((s) => Math.min(total - 1, s + 1)), [total]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
        return;
      }

      const target = (e.target || e.srcElement) as HTMLElement;
      const { tagName } = target;
      if (
        target.isContentEditable ||
        target.getAttribute("role") === "option" ||
        ((tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT") &&
          "readOnly" in target &&
          !target.readOnly)
      ) {
        return;
      }

      e.preventDefault();
      if (e.key === "ArrowLeft") {
        goPrev();
      } else {
        goNext();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, goPrev, goNext]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="large" className="flex max-h-[90vh] flex-col gap-0 overflow-hidden p-6">
        <div className="shrink-0 space-y-2 pb-2">
          <DialogTitle>Add icons with Shortcuts</DialogTitle>
          <DialogDescription className="text-left">
            Use these images as custom Home Screen icons for your Raycast shortcuts.
          </DialogDescription>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden py-2" aria-live="polite" aria-atomic="true">
          {current.imageSrc ? (
            <GuideStepImage key={current.imageSrc} src={current.imageSrc} alt={`Screenshot: ${current.title}`} />
          ) : null}
          <div className="min-h-0 flex-1 overflow-y-auto">
            <div className="flex min-h-[7.5rem] flex-col space-y-2 sm:min-h-[7rem]">
              <p className="text-base font-medium text-gray-12">{current.title}</p>
              <div className="space-y-2 text-sm text-gray-11 leading-relaxed">
                <p>{current.body}</p>
                {current.bodyFollowUp || current.shortcutLinks?.length ? (
                  <p>
                    {current.bodyFollowUp ? <>{current.bodyFollowUp} </> : null}
                    {current.shortcutLinks?.map((link, i) => (
                      <span key={link.label}>
                        {i > 0 ? <span className="text-gray-8"> · </span> : null}
                        {link.href ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-gray-12 underline underline-offset-2 hover:text-gray-11"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <span className="text-gray-10">{link.label}</span>
                        )}
                      </span>
                    ))}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex shrink-0 flex-col gap-3 border-t border-gray-5 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center text-xs text-gray-10 sm:text-left">
            Step <span className="inline-block min-w-[2ch] text-center font-mono tabular-nums">{step + 1}</span> of{" "}
            <span className="inline-block min-w-[2ch] text-center font-mono tabular-nums">{total}</span>
          </p>

          <div className="flex flex-1 justify-center gap-1.5">
            {INSTALL_GUIDE_STEPS.map((_, i) => (
              <button
                key={`step-dot-${i}`}
                type="button"
                onClick={() => setStep(i)}
                className={cn(
                  "h-2 w-2 rounded-full transition-colors",
                  i === step ? "bg-gray-12" : "bg-gray-6 hover:bg-gray-8",
                )}
                aria-label={`Go to step ${i + 1}`}
                aria-current={i === step ? "step" : undefined}
              />
            ))}
          </div>

          <div className="flex justify-center gap-2 sm:justify-end">
            <Button
              type="button"
              variant="secondary"
              iconOnly
              aria-label="Previous step"
              disabled={step === 0}
              onClick={goPrev}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="secondary"
              iconOnly
              aria-label="Next step"
              disabled={step === total - 1}
              onClick={goNext}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
