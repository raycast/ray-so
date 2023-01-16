import React, { MouseEventHandler, useContext, useState } from "react";
import * as Popover from "@radix-ui/react-popover";

import ImageIcon from "assets/icons/image-16.svg";
import LinkIcon from "assets/icons/link-16.svg";
import ChevronUpIcon from "assets/icons/chevron-up-16.svg";
import ClipboardIcon from "assets/icons/clipboard-16.svg";

import { FrameContext } from "../store/FrameContextStore";
import { derivedFlashMessageAtom, flashShownAtom } from "../store/flash";
import download from "../util/download";
import { toPng, toSvg, toBlob } from "../lib/image";

import styles from "styles/ExportButton.module.css";
import useHotkeys from "../util/useHotkeys";
import usePngClipboardSupported from "../util/usePngClipboardSupported";
import classNames from "classnames";
import { useAtom } from "jotai";

const ExportButton: React.FC = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const pngClipboardSupported = usePngClipboardSupported();
  const frameContext = useContext(FrameContext);
  const [, setFlashMessage] = useAtom(derivedFlashMessageAtom);
  const [, setFlashShown] = useAtom(flashShownAtom);

  const savePng = async () => {
    if (!frameContext?.current) {
      throw new Error("Couldn't find a frame to export");
    }

    setFlashMessage({ icon: <ImageIcon />, message: "Exporting PNG" });

    const dataUrl = await toPng(frameContext.current);
    download(dataUrl, "ray-so-export.png");

    setFlashShown(false);
  };

  const copyPng = () => {
    setFlashMessage({ icon: <ClipboardIcon />, message: "Copying PNG" });

    navigator.clipboard.write([
      new ClipboardItem({
        "image/png": new Promise((resolve) => {
          if (!frameContext?.current) {
            throw new Error("Couldn't find a frame to export");
          }

          toBlob(frameContext.current).then((blob) => {
            if (!blob) {
              throw new Error("expected toBlob to return a blob");
            }

            resolve(blob);

            setFlashMessage({ icon: <ClipboardIcon />, message: "PNG Copied to clipboard!", timeout: 2000 });
          });
        }),
      }),
    ]);
  };

  const saveSvg = async () => {
    if (!frameContext?.current) {
      throw new Error("Couldn't find a frame to export");
    }

    setFlashMessage({ icon: <ImageIcon />, message: "Exporting SVG" });

    const dataUrl = await toSvg(frameContext.current);
    download(dataUrl, "ray-so-export.svg");

    setFlashShown(false);
  };

  const popoverHandler: (handler: () => void) => MouseEventHandler = (handler) => {
    return (event) => {
      event.preventDefault();
      handler();
      setPopoverOpen(false);
    };
  };

  const handleExportClick: MouseEventHandler = (event) => {
    event.preventDefault();

    savePng();
  };

  const copyUrl = () => navigator.clipboard.writeText(window.location.toString());

  useHotkeys("ctrl+s,cmd+s", (event) => {
    event.preventDefault();
    savePng();
  });
  useHotkeys("ctrl+c,cmd+c", (event) => {
    if (pngClipboardSupported) {
      event.preventDefault();
      copyPng();
    }
  });
  useHotkeys("ctrl+shift+c,cmd+shift+c", (event) => {
    event.preventDefault();
    copyUrl();
  });
  useHotkeys("ctrl+shift+s,cmd+shift+s", (event) => {
    event.preventDefault();
    saveSvg();
  });

  return (
    <div className={styles.container}>
      <button onClick={handleExportClick} className={styles.button} aria-label="Export as PNG">
        Export
      </button>
      <Popover.Root open={popoverOpen} onOpenChange={setPopoverOpen}>
        <Popover.Trigger asChild>
          <button className={classNames(styles.button, styles.small)} aria-label="See other export options">
            <ChevronUpIcon />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className={styles.popover} sideOffset={5} side={"top"}>
            <a href="#" onClick={popoverHandler(savePng)} className={styles.option}>
              <ImageIcon />
              Save PNG
            </a>
            <a href="#" className={styles.option} onClick={popoverHandler(saveSvg)}>
              <ImageIcon />
              Save SVG
            </a>
            {pngClipboardSupported && (
              <a href="#" className={styles.option} onClick={popoverHandler(copyPng)}>
                <ClipboardIcon />
                Copy Image
              </a>
            )}
            <a href="#" className={styles.option} onClick={popoverHandler(copyUrl)}>
              <LinkIcon />
              Copy URL
            </a>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
};

export default ExportButton;
