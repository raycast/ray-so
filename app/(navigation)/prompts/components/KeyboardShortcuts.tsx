import React, { useCallback, useState } from "react";

import { Button } from "@/components/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/dialog";
import { Shortcut } from "@/components/kbd";
import { KeyboardIcon } from "@raycast/icons";
import useHotkeys from "@/utils/useHotkeys";

export default function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);
  const togglePopover = useCallback(() => setIsOpen((prev) => !prev), [setIsOpen]);

  useHotkeys("shift+/", () => togglePopover());

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="transparent">
          <KeyboardIcon />
          Keyboard Shortcuts
        </Button>
      </DialogTrigger>
      <DialogContent size="small">
        <DialogTitle>Keyboard Shortcuts</DialogTitle>
        <div className="flex flex-col gap-4">
          <Shortcut keys={["⌘", "⏎"]}>Add to Raycast</Shortcut>
          <Shortcut keys={["⌘", "D"]}>Download JSON</Shortcut>
          <Shortcut keys={["⌘", "⌥", "C"]}>Copy JSON</Shortcut>
          <Shortcut keys={["⌘", "K"]}>Toggle export menu</Shortcut>
          <Shortcut keys={["⌘", "⇧", "C"]}>Copy URL</Shortcut>
          <Shortcut keys={["?"]}>Open shortcuts</Shortcut>
        </div>
      </DialogContent>
    </Dialog>
  );
}
