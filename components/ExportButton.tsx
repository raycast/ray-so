import React, { MouseEventHandler, useContext } from "react";
import * as Popover from "@radix-ui/react-popover";

import ImageIcon from "assets/icons/image-16.svg";
import LinkIcon from "assets/icons/link-16.svg";
import ChevronUpIcon from "assets/icons/chevron-up-16.svg";
import ClipboardIcon from "assets/icons/clipboard-16.svg";

import { FrameContext } from "../store/FrameContextStore";
import download from "../util/download";
import { toPng, toSvg, toBlob } from "../lib/image";

import styles from "styles/ExportButton.module.css";
import useHotkeys from "../util/useHotkeys";
import usePngClipboardSupported from "../util/usePngClipboardSupported";
import classNames from "classnames";

const ExportButton: React.FC = () => {
  const pngClipboardSupported = usePngClipboardSupported();
  const frameContext = useContext(FrameContext);

  const savePng = async () => {
    if (!frameContext?.current) {
      throw new Error("Couldn't find a frame to export");
    }

    const dataUrl = await toPng(frameContext.current);
    download(dataUrl, "ray-so-export.png");
  };

  const copyPng = () => {
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
          });
        }),
      }),
    ]);
  };

  const saveSvg = async () => {
    if (!frameContext?.current) {
      throw new Error("Couldn't find a frame to export");
    }

    const dataUrl = await toSvg(frameContext.current);
    download(dataUrl, "ray-so-export.svg");
  };

  const handleExportClick: MouseEventHandler = (event) => {
    event.preventDefault();

    savePng();
  };

  const copyUrl = () =>
    navigator.clipboard.writeText(window.location.toString());

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
      <button
        onClick={handleExportClick}
        className={styles.button}
        aria-label="Export as PNG"
      >
        Export
      </button>
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            className={classNames(styles.button, styles.small)}
            aria-label="See other export options"
          >
            <ChevronUpIcon />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className={styles.popover}
            sideOffset={5}
            side={"top"}
          >
            <a href="#" onClick={handleExportClick} className={styles.option}>
              <ImageIcon />
              Save PNG
            </a>
            <a
              href="#"
              className={styles.option}
              onClick={(event) => {
                event.preventDefault();
                saveSvg();
              }}
            >
              <ImageIcon />
              Save SVG
            </a>
            {pngClipboardSupported && (
              <a
                href="#"
                className={styles.option}
                onClick={(event) => {
                  event.preventDefault();
                  copyPng();
                }}
              >
                <ClipboardIcon />
                Copy Image
              </a>
            )}
            <a
              href="#"
              className={styles.option}
              onClick={(event) => {
                event.preventDefault();
                copyUrl();
              }}
            >
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
