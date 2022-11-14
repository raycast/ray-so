import React, { MouseEventHandler, useCallback, useContext } from "react";

import { toPng } from "html-to-image";

import DownloadIcon from "assets/icons/download-16.svg";

import { FrameContext } from "../store/FrameContextStore";
import download from "../util/download";

import styles from "styles/ExportButton.module.css";
import useHotkeys from "../util/useHotkeys";
import { KeyHandler } from "hotkeys-js";

const ExportButton: React.FC = () => {
  const frameContext = useContext(FrameContext);

  const exportToPng = useCallback(() => {
    if (frameContext && frameContext.current) {
      toPng(frameContext.current).then((dataURL) => {
        download(dataURL, "ray-so-export.png");
      });
    }
  }, [frameContext]);

  const handleExportClick = useCallback<MouseEventHandler>(
    (event) => {
      event.preventDefault();

      exportToPng();
    },
    [exportToPng]
  );

  const handleExportHotkey = useCallback<KeyHandler>(
    (event) => {
      event.preventDefault();

      exportToPng();
    },
    [exportToPng]
  );

  useHotkeys("ctrl+s,cmd+s", handleExportHotkey);

  return (
    <a onClick={handleExportClick} className={styles.exportButton}>
      Export <DownloadIcon />
    </a>
  );
};

export default ExportButton;
