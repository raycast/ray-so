import React, { MouseEventHandler, useCallback, useContext } from "react";

import { toPng } from "html-to-image";

import DownloadIcon from "assets/icons/download-16.svg";

import { FrameContext } from "../store/FrameContextStore";
import download from "../util/download";

import styles from "styles/ExportButton.module.css";

const ExportButton: React.FC = () => {
  const frameContext = useContext(FrameContext);

  const handleExport = useCallback<MouseEventHandler>(
    (event) => {
      event.preventDefault();

      if (frameContext && frameContext.current) {
        toPng(frameContext.current).then((dataURL) => {
          download(dataURL, "ray-so-export.png");
        });
      }
    },
    [frameContext]
  );

  return (
    <a onClick={handleExport} className={styles.exportButton}>
      Export <DownloadIcon />
    </a>
  );
};

export default ExportButton;
