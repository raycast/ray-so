"use client";

import React, { useState } from "react";
import cn from "classnames";

import { PlusIcon, TrashIcon, XMarkCircleFilledIcon } from "@raycast/icons";

import { saveSvgAsPng } from "save-svg-as-png";

import styles from "./ExportModal.module.css";
import { Select, SelectItem } from "./Select";
import Button from "./Button";

type ExportFormat = "PNG" | "SVG";

type ExportOption = {
  fileName: string;
  format: ExportFormat;
  size: number;
};

type SvgRefType = React.RefObject<HTMLElement & SVGSVGElement>;

type PropTypes = {
  onClose: () => void;
  onStartExport: () => void;
  fileName: string;
  svgRef: SvgRefType;
};

const exportToPng = async (svgRef: SvgRefType, fileName: string, size: number) => {
  if (!svgRef.current) {
    return;
  }
  return saveSvgAsPng(svgRef.current, `${fileName}.png`, { encoderOptions: 1, scale: size / 512 });
};

const exportToSvg = async (svgRef: SvgRefType, fileName: string) => {
  if (!svgRef.current) {
    return;
  }
  const element = document.createElement("a");
  element.setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(svgRef.current.outerHTML)}`);
  element.setAttribute("download", `${fileName}.svg`);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  return;
};

const Exporters = {
  PNG: exportToPng,
  SVG: exportToSvg,
};

const ExportModal = React.forwardRef<HTMLDivElement, PropTypes>(({ onClose, onStartExport, fileName, svgRef }, ref) => {
  const [exportOptions, setExportOptions] = useState<ExportOption[]>([
    {
      fileName,
      format: "PNG",
      size: 512,
    },
  ]);

  const onExport = async () => {
    onClose();
    onStartExport();
    // Fixes @2x png export instead of the same size as png
    const realPixelRatio = window.devicePixelRatio;
    window.devicePixelRatio = 1;
    const exportPromises = exportOptions.map((option) => {
      return Exporters[option.format](svgRef, option.fileName, option.size);
    });
    await Promise.all(exportPromises);
    window.devicePixelRatio = realPixelRatio;
  };

  const onAddExportOption = () => {
    const newSize = exportOptions[0].size * (exportOptions.length + 1);
    setExportOptions([
      ...exportOptions,
      {
        format: "PNG",
        size: newSize,
        fileName: `${fileName}@${newSize}px`,
      },
    ]);
  };

  const removeExportOption = (removeIndex: number) => {
    const newOptions = exportOptions.reduce((acc: ExportOption[], item, index) => {
      if (removeIndex !== index) {
        acc.push(item);
      }

      return acc;
    }, []);
    setExportOptions(newOptions);
  };

  const updateExportOptions = (updateIndex: number, key: keyof ExportOption, value: string | number) => {
    const exportOption = exportOptions[updateIndex];
    const newExportOption = {
      ...exportOption,
      [key]: value,
      fileName: updateIndex != 0 && key === "size" ? `${fileName}@${value}px` : exportOption.fileName,
    };
    if (newExportOption.format === "SVG") {
      newExportOption.fileName = fileName;
    }
    const newExportOptions = exportOptions.reduce((acc: ExportOption[], value, index) => {
      acc.push(updateIndex === index ? newExportOption : value);
      return acc;
    }, []);
    setExportOptions(newExportOptions);
  };

  return (
    <div className={styles.shadow} ref={ref}>
      <div className={styles.modal}>
        <h3 className={styles.modalTitle}>Export icons</h3>
        <button className={styles.close} onClick={onClose}>
          <XMarkCircleFilledIcon />
        </button>
        {exportOptions.map((option, index) => (
          <div className={styles.exportOption} key={index}>
            <div className={styles.exportOptionFileName}>
              {option.fileName}.{option.format.toLowerCase()}
            </div>
            <div className={styles.exportOptionSettings}>
              <div className={styles.exportOptionSize}>
                <div
                  className={cn(styles.inputWrapper, styles.inputWithUnit, option.format === "SVG" && styles.disabled)}
                >
                  <input
                    type={option.format === "SVG" ? "text" : "number"}
                    min={0}
                    value={option.format === "SVG" ? "-" : option.size}
                    onChange={(e) => updateExportOptions(index, "size", parseInt(e.target.value))}
                    disabled={option.format === "SVG"}
                  />
                  <span className={styles.unit}>px</span>
                </div>
              </div>
              <div className={styles.exportOptionFormat}>
                <Select
                  variant="primary"
                  value={option.format}
                  onValueChange={(value) => updateExportOptions(index, "format", value)}
                >
                  <SelectItem value="PNG">PNG</SelectItem>
                  <SelectItem value="SVG">SVG</SelectItem>
                </Select>
              </div>
            </div>
            <button
              className={styles.exportOptionRemove}
              disabled={exportOptions.length <= 1}
              onClick={() => removeExportOption(index)}
            >
              <TrashIcon />
            </button>
          </div>
        ))}
        <Button className={styles.modalButton} onClick={onAddExportOption}>
          <PlusIcon /> Add new export
        </Button>
        <Button variant="primary" className={styles.modalButton} onClick={onExport}>
          Export Icon
        </Button>
      </div>
    </div>
  );
});

ExportModal.displayName = "ExportModal";

export default ExportModal;
