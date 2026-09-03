"use client";

import React, { useState, useEffect } from "react";
import cn from "classnames";

import { PlusIcon, TrashIcon } from "@raycast/icons";
import { toPng as htmlToPng } from "html-to-image";

import styles from "./ExportModal.module.css";
import { Select, SelectItem, SelectContent, SelectItemText, SelectValue, SelectTrigger } from "@/components/select";
import { Button } from "@/components/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/dialog";
import { Input, InputSlot } from "@/components/input";
import download from "../../(code)/util/download";

type ExportFormat = "PNG" | "SVG";

type ExportOption = {
  fileName: string;
  format: ExportFormat;
  size: number;
};

type SvgRefType = React.RefObject<(HTMLElement & SVGSVGElement) | null>;

const exportToPng = async (svgRef: SvgRefType, fileName: string, size: number) => {
  if (!svgRef.current) {
    return;
  }

  let dataUrl = await htmlToPng(svgRef.current, { pixelRatio: 1, quality: 1, width: size, height: size });
  // Download immediately since timing is handled in the export loop
  download(dataUrl, `${fileName}.png`);
  return dataUrl;
};

const exportToSvg = async (svgRef: SvgRefType, fileName: string) => {
  if (!svgRef.current) {
    return;
  }
  download(`data:text/plain;charset=utf-8,${encodeURIComponent(svgRef.current.outerHTML)}`, `${fileName}.svg`);
  return;
};

const Exporters = {
  PNG: exportToPng,
  SVG: exportToSvg,
};

type ExportModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStartExport: () => void;
  fileName: string;
  svgRef: SvgRefType;
};

function ExportModal({ open, onOpenChange, onStartExport, fileName, svgRef }: ExportModalProps) {
  const [exportOptions, setExportOptions] = useState<ExportOption[]>([
    {
      fileName,
      format: "PNG",
      size: 512,
    },
  ]);

  // Update export options when fileName changes
  useEffect(() => {
    setExportOptions((prevOptions) =>
      prevOptions.map((option, index) => {
        if (index === 0) {
          // Update the first option's fileName to match the current fileName
          return {
            ...option,
            fileName: option.format === "SVG" ? fileName : fileName,
          };
        } else {
          // Update other options to use the new fileName as base
          return {
            ...option,
            fileName: option.format === "SVG" ? fileName : `${fileName}@${option.size}px`,
          };
        }
      }),
    );
  }, [fileName]);

  const onExport = async () => {
    onOpenChange(false);
    onStartExport();
    // Fixes @2x png export instead of the same size as png
    const realPixelRatio = window.devicePixelRatio;
    window.devicePixelRatio = 1;

    // Export each option sequentially to avoid browser download blocking
    for (let i = 0; i < exportOptions.length; i++) {
      const option = exportOptions[i];
      await Exporters[option.format](svgRef, option.fileName, option.size);
      // Add a small delay between downloads to prevent browser blocking
      if (i < exportOptions.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 150));
      }
    }

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="medium">
        <DialogTitle>Export Icons</DialogTitle>
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
                  <Input
                    type={option.format === "SVG" ? "text" : "number"}
                    min={0}
                    value={option.format === "SVG" ? "-" : option.size}
                    onChange={(e) => updateExportOptions(index, "size", parseInt(e.target.value))}
                    disabled={option.format === "SVG"}
                    size="large"
                    className="w-[100px]"
                  >
                    <InputSlot>px</InputSlot>
                  </Input>
                </div>
              </div>
              <div className={styles.exportOptionFormat}>
                <Select value={option.format} onValueChange={(value) => updateExportOptions(index, "format", value)}>
                  <SelectTrigger size="large" className="w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PNG">
                      <SelectItemText>PNG</SelectItemText>
                    </SelectItem>
                    <SelectItem value="SVG">
                      <SelectItemText>SVG</SelectItemText>
                    </SelectItem>
                  </SelectContent>
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
        <Button onClick={onAddExportOption}>
          <PlusIcon /> Add new export
        </Button>
        <Button variant="primary" onClick={onExport}>
          Export Icon
        </Button>
      </DialogContent>
    </Dialog>
  );
}

ExportModal.displayName = "ExportModal";

export default ExportModal;
