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
              Quicklink Explorer is a tool to easily browse, share, and add quicklinks to{" "}
              <a href="https://raycast.com">Raycast</a>.
            </p>
            <p>
              Select the quicklinks by clicking on them. To select multiple, hold <Kbd>⌘</Kbd> or select them with your
              mouse.
            </p>
            <p>
              You can quickly edit a quicklink before importing by clicking on the link preview or pencil icon. Great
              for editing dynamic parameters, numbers or addresses. Note that changes are temporarily saved for the
              current session only.
            </p>
            <p>
              Then, click the “Add to Raycast” button to import them. You can also download the quicklinks as a JSON
              file, or copy the URL to share with others.
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
              <a href="https://x.com/raycastapp" className="text-gray-12 underline underline-offset-2">
                𝕏
              </a>{" "}
              or{" "}
              <a
                href="mailto:feedback+rayso@raycast.com?subject=Prompts"
                className="text-gray-12 underline underline-offset-2"
              >
                send us an email
              </a>
              .
            </p>
            <SocialFooter referral="prompts" />
          </div>

          <div className="w-px h-full bg-gray-a3" />

          <div className="flex-1 flex flex-col gap-2">
            <h2 className="font-medium -mt-[3px]">Shortcuts</h2>
            <div className="flex flex-col gap-4">
              <Shortcut keys={["⌘", "⏎"]}>Add to Raycast</Shortcut>
              <Shortcut keys={["⌘", "D"]}>Download JSON</Shortcut>
              <Shortcut keys={["⌘", "⌥", "C"]}>Copy JSON</Shortcut>
              <Shortcut keys={["⌘", "K"]}>Toggle export menu</Shortcut>
              <Shortcut keys={["⌘", "⇧", "C"]}>Copy URL</Shortcut>
              <Shortcut keys={["?"]}>Open shortcuts</Shortcut>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
