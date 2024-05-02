import React, { PropsWithChildren, useCallback, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import styles from "../styles/KeyboardShortcutsPanel.module.css";

import KeyboardIcon from "../assets/icons/keyboard-16.svg";
import useHotkeys from "../util/useHotkeys";
import MultiplyIcon from "../assets/icons/multiply-16.svg";
import usePngClipboardSupported from "../util/usePngClipboardSupported";

const Shortcut: React.FC<PropsWithChildren<{ keys: string[] }>> = ({ children, keys }) => (
  <>
    <div>{children}</div>
    <div className={styles.keys}>
      {keys.map((key) => (
        <span key={key} className={styles.key}>
          {key}
        </span>
      ))}
    </div>
  </>
);

const KeyboardShortcutsPanel: React.FC = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const togglePopover = useCallback(() => setPopoverOpen((old) => !old), [setPopoverOpen]);
  const pngClipboardSupported = usePngClipboardSupported();

  useHotkeys("shift+/", togglePopover);

  return (
    <>
      <div className={styles.container}>
        <Dialog.Root open={popoverOpen} onOpenChange={setPopoverOpen}>
          <Dialog.Trigger asChild>
            <button className={styles.anchor}>
              <KeyboardIcon />
              Keyboard Shortcuts
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className={styles.overlay} />
            <Dialog.Content className={styles.popover}>
              <Dialog.Title className={styles.dialogTitle}>Keyboard Shortcuts</Dialog.Title>
              <div className={styles.shortcuts}>
                <Shortcut keys={["F"]}>Focus text editor</Shortcut>
                <Shortcut keys={["Esc"]}>Unfocus text editor</Shortcut>
                <Shortcut keys={["C"]}>Change colors</Shortcut>
                <Shortcut keys={["B"]}>Toggle background</Shortcut>
                <Shortcut keys={["D"]}>Toggle dark mode</Shortcut>
                <Shortcut keys={["P"]}>Change padding</Shortcut>
                <Shortcut keys={["L"]}>Select language</Shortcut>
                <Shortcut keys={["⌥", "click"]}>Highlight line</Shortcut>
                <Shortcut keys={["⌘", "S"]}>Save PNG</Shortcut>
                <Shortcut keys={["⌘", "shift", "S"]}>Save SVG</Shortcut>
                {pngClipboardSupported && <Shortcut keys={["⌘", "C"]}>Copy image</Shortcut>}
                <Shortcut keys={["⌘", "shift", "C"]}>Copy URL</Shortcut>
                <Shortcut keys={["?"]}>Open shortcuts</Shortcut>
              </div>

              <Dialog.Close asChild>
                <button className={styles.closeButton} aria-label="Close">
                  <MultiplyIcon />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </>
  );
};

export default KeyboardShortcutsPanel;
