import { Button } from "@/components/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/dialog";
import { Info02Icon } from "@raycast/icons";
import { Shortcut } from "@/components/kbd";
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
      <DialogContent size="large">
        <div className="flex gap-8">
          <div className="flex flex-col gap-3 flex-1 text-[13px] text-gray-11 leading-relaxed">
            <DialogTitle>About</DialogTitle>
            <p>Icon Maker by Raycast is a tool to easily create and export icons for your extensions.</p>
            <p>
              Use the Raycast icon library to search for an icon, change the color of the icon, and customize the
              background to create a beautifully simple icon.
            </p>
            <p>
              Edit the file name, and when you’re ready, click export in the top-right corner to export the icon in the
              correct size and format to submit to the Raycast Store.
            </p>
            <p>
              <a href="https://developers.raycast.com/" className="text-gray-12 underline underline-offset-2">
                View Documentation
              </a>
            </p>
            <h2 className="text-base font-medium text-gray-12">Contribute</h2>
            <p>
              The project is Open Source and{" "}
              <a href="https://github.com/raycast/ray-so" className="text-gray-12 underline underline-offset-2">
                available on GitHub
              </a>
              .
            </p>
            <p>
              If you have any questions or feedback, please write to us on{" "}
              <a href="https://x.com/raycast" className="text-gray-12 underline underline-offset-2">
                𝕏
              </a>{" "}
              or{" "}
              <a
                href="mailto:feedback+rayso@raycast.com?subject=Icon"
                className="text-gray-12 underline underline-offset-2"
              >
                send us an email
              </a>
              .
            </p>
            <SocialFooter referral="icon" />
          </div>

          <div className="w-px h-full bg-gray-a3" />

          <div className="flex-1 flex flex-col gap-2">
            <h2 className="font-medium -mt-[3px]">Shortcuts</h2>
            <div className="flex flex-col gap-4">
              <Shortcut keys={["⌘", "Z"]}>Undo action</Shortcut>
              <Shortcut keys={["⌘", "⇧", "Z"]}>Redo action</Shortcut>
              <Shortcut keys={["⌘", "F"]}>Search icons</Shortcut>
              <Shortcut keys={["⌘", "."]}>Toggle interface</Shortcut>
              <Shortcut keys={["⌘", "K"]}>Toggle export menu</Shortcut>
              <Shortcut keys={["⌘", "⇧", "E"]}>Export</Shortcut>
              <Shortcut keys={["⌘", "C"]}>Copy image</Shortcut>
              <Shortcut keys={["⌘", "shift", "C"]}>Copy URL</Shortcut>
              <Shortcut keys={["?"]}>Open shortcuts</Shortcut>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
