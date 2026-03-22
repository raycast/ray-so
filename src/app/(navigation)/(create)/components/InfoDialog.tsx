import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Shortcut } from "@/components/ui/kbd";
import { SocialFooter } from "@/components/social-footer";
import useHotkeys from "@/utils/useHotkeys";
import { Info02Icon } from "@raycast/icons";
import { useCallback, useState } from "react";
import usePngClipboardSupported from "../util/usePngClipboardSupported";
import { InformationSquareIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

function InfoDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), [setIsOpen]);
  const pngClipboardSupported = usePngClipboardSupported();

  useHotkeys("shift+/", toggleOpen);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal>
      <DialogTrigger render={<Button variant={"outline"} className="hidden md:flex gap-2" />}>
        <HugeiconsIcon icon={InformationSquareIcon} />
      </DialogTrigger>
      <DialogPopup className={"max-w-3xl"}>
        <DialogHeader>
          <DialogTitle>About</DialogTitle>
        </DialogHeader>

        <DialogPanel>
          <div className="flex gap-8">
            <div className="flex flex-col gap-3 flex-1 text-[13px] text-gray-11 leading-relaxed">
              <p>Code Images by Raycast is a tool to create beautiful screenshots of your code.</p>
              <p>
                Pick a theme from a range of syntax colors and backgrounds, the language of your code and choose between
                light or dark mode.
              </p>
              <p>
                Customize the padding and when you’re ready, click export image in the top-right corner to save the
                image as a png, svg or share a link to your code.
              </p>
              <p>You can also change the image resolution in the export menu.</p>
              <h2 className="text-base font-medium">Contribute</h2>
              <p>
                The project is Open Source and{" "}
                <a href="https://github.com/raycast/ray-so" className=" underline underline-offset-2">
                  available on GitHub
                </a>
                .
              </p>
              <p>
                If you have any questions or feedback, please write to us on{" "}
                <a href="https://x.com/raycast" className="underline underline-offset-2">
                  𝕏
                </a>{" "}
                or{" "}
                <a href="mailto:feedback+rayso@raycast.com" className=" underline underline-offset-2">
                  send us an email
                </a>
                .
              </p>
            </div>

            <div className="w-px h-full bg-gray-a3" />

            <div className="flex-1 flex flex-col gap-2">
              <h2 className="font-medium -mt-[3px]">Shortcuts</h2>
              <div className="flex flex-col gap-2">
                <Shortcut keys={["F"]}>Focus text editor</Shortcut>
                <Shortcut keys={["Esc"]}>Unfocus text editor</Shortcut>
                <Shortcut keys={["C"]}>Change colors</Shortcut>
                <Shortcut keys={["B"]}>Toggle background</Shortcut>
                <Shortcut keys={["D"]}>Toggle dark mode</Shortcut>
                <Shortcut keys={["N"]}>Toggle line numbers</Shortcut>
                <Shortcut keys={["P"]}>Change padding</Shortcut>
                <Shortcut keys={["L"]}>Select language</Shortcut>
                <Shortcut keys={["⌥", "click"]}>Highlight line</Shortcut>
                <Shortcut keys={["⌥", "shift", "F"]}>Format code</Shortcut>
                <Shortcut keys={["⌘", "K"]}>Toggle Export Menu</Shortcut>
                <Shortcut keys={["⌘", "S"]}>Save PNG</Shortcut>
                <Shortcut keys={["⌘", "⇧", "S"]}>Save SVG</Shortcut>
                {pngClipboardSupported && <Shortcut keys={["⌘", "C"]}>Copy image</Shortcut>}
                <Shortcut keys={["⌘", "⇧", "C"]}>Copy URL</Shortcut>
                <Shortcut keys={["?"]}>Open shortcuts</Shortcut>
              </div>
            </div>
          </div>
        </DialogPanel>
        <DialogFooter>
          <div className="flex-1">
            <SocialFooter referral="code-image" />
          </div>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}

export default InfoDialog;
