import React, { MouseEventHandler, useContext, useState } from "react";
import { track } from "@vercel/analytics";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import ImageIcon from "../assets/icons/image-16.svg";
import LinkIcon from "../assets/icons/link-16.svg";
import ChevronUpIcon from "../assets/icons/chevron-up-16.svg";
import ClipboardIcon from "../assets/icons/clipboard-16.svg";

import { FrameContext } from "../store/FrameContextStore";
import { derivedFlashMessageAtom, flashShownAtom } from "../store/flash";
import { fileNameAtom } from "../store";
import download from "../util/download";
import { toPng, toSvg, toBlob } from "../lib/image";

import styles from "../styles/ExportButton.module.css";
import useHotkeys from "../util/useHotkeys";
import usePngClipboardSupported from "../util/usePngClipboardSupported";
import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";

const ExportButton: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pngClipboardSupported = usePngClipboardSupported();
  const frameContext = useContext(FrameContext);
  const [, setFlashMessage] = useAtom(derivedFlashMessageAtom);
  const [, setFlashShown] = useAtom(flashShownAtom);
  const customFileName = useAtomValue(fileNameAtom);
  const fileName = customFileName.replaceAll(" ", "-") || "ray-so-export";

  const savePng = async () => {
    if (!frameContext?.current) {
      throw new Error("Couldn't find a frame to export");
    }

    setFlashMessage({ icon: <ImageIcon />, message: "Exporting PNG" });

    const dataUrl = await toPng(frameContext.current);
    download(dataUrl, `${fileName}.png`);

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
    download(dataUrl, `${fileName}.svg`);

    setFlashShown(false);
  };

  const dropdownHandler: (handler: () => void) => (event: Event) => void = (handler) => {
    return (event) => {
      event.preventDefault();
      handler();
      setDropdownOpen(false);
    };
  };

  const handleExportClick: MouseEventHandler = (event) => {
    event.preventDefault();

    const params = new URLSearchParams(window.location.hash);
    track("Export", {
      theme: params.get("theme") || "vercel",
      background: params.get("background") || "true",
      darkMode: params.get("darkMode") || "true",
      padding: params.get("padding") || "64",
      language: params.get("language") || "auto",
      title: params.get("title") || "untitled",
      width: params.get("width") || "auto",
    });
    savePng();
  };

  const copyUrl = async () => {
    setFlashMessage({ icon: <ClipboardIcon />, message: "Copying URL" });

    const url = window.location.toString();
    let urlToCopy = url;

    const encodedUrl = encodeURIComponent(url);
    const response = await fetch(`/api/shorten-url?url=${encodedUrl}&ref=codeImage`).then((res) => res.json());

    if (response.link) {
      urlToCopy = response.link;
    }

    navigator.clipboard.writeText(urlToCopy);

    setFlashMessage({ icon: <ClipboardIcon />, message: "URL Copied to clipboard!", timeout: 2000 });
  };

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

      <DropdownMenu.Root open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenu.Trigger asChild>
          <button className={classNames(styles.button, styles.small)} aria-label="See other export options">
            <ChevronUpIcon />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className={styles.dropdown} sideOffset={5} side={"top"}>
            <DropdownMenu.Item onSelect={dropdownHandler(savePng)} className={styles.option}>
              <ImageIcon />
              Save PNG
            </DropdownMenu.Item>
            <DropdownMenu.Item onSelect={dropdownHandler(saveSvg)} className={styles.option}>
              <ImageIcon />
              Save SVG
            </DropdownMenu.Item>
            {pngClipboardSupported && (
              <DropdownMenu.Item onSelect={dropdownHandler(copyPng)} className={styles.option}>
                <ClipboardIcon />
                Copy Image
              </DropdownMenu.Item>
            )}
            <DropdownMenu.Item onSelect={dropdownHandler(copyUrl)} className={styles.option}>
              <LinkIcon />
              Copy URL
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};

export default ExportButton;
