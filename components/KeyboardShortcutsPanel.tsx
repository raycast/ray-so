import React, { PropsWithChildren, useRef, useState } from "react";

import styles from "styles/KeyboardShortcutsPanel.module.css";

import KeyboardIcon from "assets/icons/keyboard-16.svg";
import { CSSTransition } from "react-transition-group";

const Shortcut: React.FC<PropsWithChildren<{ keys: string[] }>> = ({
  children,
  keys,
}) => (
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
  const popoverRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className={styles.container}>
        <a
          className={styles.anchor}
          onClick={(event) => {
            event.preventDefault();
            setPopoverOpen(!popoverOpen);
          }}
        >
          <KeyboardIcon />
          keyboard shortcuts
        </a>
        <CSSTransition
          in={popoverOpen}
          nodeRef={popoverRef}
          timeout={300}
          classNames={styles}
          unmountOnExit
        >
          <div ref={popoverRef} className={styles.popover}>
            <strong>Keyboard Shortcuts</strong>
            <div className={styles.shortcuts}>
              <Shortcut keys={["F"]}>Focus text editor</Shortcut>
              <Shortcut keys={["Esc"]}>Unfocus text editor</Shortcut>
              <Shortcut keys={["C"]}>Change colors</Shortcut>
              <Shortcut keys={["B"]}>Toggle background</Shortcut>
              <Shortcut keys={["D"]}>Toggle dark mode</Shortcut>
              <Shortcut keys={["P"]}>Change padding</Shortcut>
              <Shortcut keys={["L"]}>Select language</Shortcut>
              <Shortcut keys={["R"]}>Pick random theme</Shortcut>
              <Shortcut keys={["⌘", "S"]}>Save PNG</Shortcut>
              <Shortcut keys={["⌘", "shift", "S"]}>Save SVG</Shortcut>
              <Shortcut keys={["⌘", "C"]}>Copy image</Shortcut>
              <Shortcut keys={["⌘", "shift", "C"]}>Copy URL</Shortcut>
              <Shortcut keys={["?"]}>Open shortcuts</Shortcut>
            </div>
          </div>
        </CSSTransition>
      </div>
      <CSSTransition
        in={popoverOpen}
        nodeRef={overlayRef}
        timeout={300}
        classNames={styles}
        unmountOnExit
      >
        <div
          className={styles.overlay}
          ref={overlayRef}
          onClick={() => setPopoverOpen(false)}
        />
      </CSSTransition>
    </>
  );
};

export default KeyboardShortcutsPanel;
