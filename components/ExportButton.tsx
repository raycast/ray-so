import React, { MouseEventHandler, useCallback, useContext } from "react";

import { toBlob, toPng, toSvg } from "html-to-image";

import DownloadIcon from "assets/icons/download-16.svg";
import ImageIcon from "assets/icons/image-16.svg";
import LinkIcon from "assets/icons/link-16.svg";
import ClipboardIcon from "assets/icons/clipboard-16.svg";

import { FrameContext } from "../store/FrameContextStore";
import download from "../util/download";

import styles from "styles/ExportButton.module.css";
import useHotkeys from "../util/useHotkeys";

const imageFilter = (node: HTMLElement) => node.tagName !== "TEXTAREA";

const ExportButton: React.FC = () => {
  const frameContext = useContext(FrameContext);

  const savePng = useCallback(() => {
    if (frameContext && frameContext.current) {
      toPng(frameContext.current, { filter: imageFilter }).then((dataURL) => {
        download(dataURL, "ray-so-export.png");
      });
    }
  }, [frameContext]);

  const copyPng = useCallback(() => {
    if (frameContext && frameContext.current) {
      toBlob(frameContext.current, { filter: imageFilter }).then((blob) => {
        if (!blob) return;

        navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob,
          }),
        ]);
      });
    }
  }, [frameContext]);

  const saveSvg = useCallback(() => {
    if (frameContext && frameContext.current) {
      toSvg(frameContext.current, { filter: imageFilter }).then((dataURL) => {
        download(dataURL, "ray-so-export.svg");
      });
    }
  }, [frameContext]);

  const handleExportClick = useCallback<MouseEventHandler>(
    (event) => {
      event.preventDefault();

      savePng();
    },
    [savePng]
  );

  const copyUrl = useCallback(() => {
    navigator.clipboard.writeText(window.location.toString());
  }, []);

  useHotkeys("ctrl+s,cmd+s", (event) => {
    event.preventDefault();
    savePng();
  });
  useHotkeys("ctrl+c,cmd+c", (event) => {
    event.preventDefault();
    copyPng();
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
    <div className={styles.hoverContainer}>
      <a href="#" onClick={handleExportClick} className={styles.exportButton}>
        Export <DownloadIcon />
      </a>
      <div className={styles.popoverContainer}>
        <div className={styles.popover}>
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
        </div>
      </div>
    </div>
  );
};

export default ExportButton;
