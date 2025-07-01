"use client";

import { Button } from "@/components/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/dialog";
import { Info02Icon } from "@raycast/icons";
import { Kbd, Shortcut } from "@/components/kbd";
import { useCallback, useState } from "react";
import useHotkeys from "@/utils/useHotkeys";
import { SocialFooter } from "@/components/social-footer";

export function InfoDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), [setIsOpen]);

  useHotkeys("shift+/", toggleOpen);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="transparent" className="hidden md:flex gap-2">
          <Info02Icon /> About
        </Button>
      </DialogTrigger>
      <DialogContent size="large" className="overflow-hidden">
        <div className="flex gap-8">
          <div className="flex flex-col gap-3 flex-1 text-[13px] text-gray-11 leading-relaxed">
            <DialogTitle>About</DialogTitle>
            <p>
              Theme Explorer is a tool to easily browse, share, and add themes to{" "}
              <a href="https://raycast.com">Raycast</a>.
            </p>
            <p>Click the “Add to Raycast” button to import any theme directly.</p>
            <h2 className="text-base font-medium text-gray-12">Contribute</h2>
            <p>
              The project is Open Source and{" "}
              <a href="https://github.com/raycast/ray-so" className="text-gray-12 underline underline-offset-2">
                available on GitHub
              </a>
              .
            </p>
            <p>
              To add your own theme, export it as JSON from Theme Studio and upload it to the{" "}
              <a href="https://github.com/raycast/ray-so" className="text-gray-12 underline underline-offset-2">
                GitHub repository
              </a>
            </p>
            <p>
              If you have any questions or feedback, please write to us on{" "}
              <a href="https://x.com/raycast" className="text-gray-12 underline underline-offset-2">
                𝕏
              </a>{" "}
              or{" "}
              <a
                href="mailto:feedback+rayso@raycast.com?subject=Themes"
                className="text-gray-12 underline underline-offset-2"
              >
                send us an email
              </a>
              .
            </p>
            <SocialFooter referral="themes" />
          </div>

          <div className="w-px h-full bg-gray-a3" />

          <div className="flex-1 flex flex-col gap-2">
            <h2 className="font-medium -mt-[3px]">Shortcuts</h2>
            <div className="flex flex-col gap-4">
              <Shortcut keys={["⌘", "⏎"]}>Add to Raycast</Shortcut>
              <Shortcut keys={["⌘", "K"]}>Toggle Export Menu</Shortcut>
              <Shortcut keys={["⌘", "D"]}>Download JSON</Shortcut>
              <Shortcut keys={["⌘", "⌥", "C"]}>Copy JSON</Shortcut>
              <Shortcut keys={["⌘", "⇧", "C"]}>Copy URL</Shortcut>
              <Shortcut keys={["→"]}>Select Next</Shortcut>
              <Shortcut keys={["←"]}>Select Previous</Shortcut>
              <Shortcut keys={["?"]}>Open shortcuts</Shortcut>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
