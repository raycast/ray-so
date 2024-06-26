import React, { useCallback, useState } from "react";

import styles from "./KeyboardShortcutsPanel.module.css";

import KeyboardIcon from "../assets/icons/keyboard-16.svg";
import useHotkeys from "@/utils/useHotkeys";
import usePngClipboardSupported from "../util/usePngClipboardSupported";
import { Button } from "@/components/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/dialog";
import { Shortcut } from "@/components/kbd";

const KeyboardShortcutsPanel: React.FC = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const togglePopover = useCallback(() => setPopoverOpen((old) => !old), [setPopoverOpen]);
  const pngClipboardSupported = usePngClipboardSupported();

  useHotkeys("shift+/", togglePopover);

  return (
    <Dialog open={popoverOpen} onOpenChange={setPopoverOpen}>
      <DialogTrigger asChild>
        <Button variant="transparent">
          <KeyboardIcon />
          Keyboard Shortcuts
        </Button>
      </DialogTrigger>
      <DialogContent size="small">
        <DialogTitle>Keyboard Shortcuts</DialogTitle>
        <div className={styles.shortcuts}>
          <Shortcut keys={["F"]}>Focus text editor</Shortcut>
          <Shortcut keys={["Esc"]}>Unfocus text editor</Shortcut>
          <Shortcut keys={["C"]}>Change colors</Shortcut>
          <Shortcut keys={["B"]}>Toggle background</Shortcut>
          <Shortcut keys={["D"]}>Toggle dark mode</Shortcut>
          <Shortcut keys={["P"]}>Change padding</Shortcut>
          <Shortcut keys={["L"]}>Select language</Shortcut>
          <Shortcut keys={["⌥", "click"]}>Highlight line</Shortcut>
          <Shortcut keys={["⌘", "K"]}>Toggle Export Menu</Shortcut>
          <Shortcut keys={["⌘", "S"]}>Save PNG</Shortcut>
          <Shortcut keys={["⌘", "⇧", "S"]}>Save SVG</Shortcut>
          {pngClipboardSupported && <Shortcut keys={["⌘", "C"]}>Copy image</Shortcut>}
          <Shortcut keys={["⌘", "⇧", "C"]}>Copy URL</Shortcut>
          <Shortcut keys={["?"]}>Open shortcuts</Shortcut>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KeyboardShortcutsPanel;
