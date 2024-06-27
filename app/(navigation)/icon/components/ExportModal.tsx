"use client";

import React, { useState } from "react";
import cn from "classnames";

import { PlusIcon, TrashIcon } from "@raycast/icons";

import { saveSvgAsPng } from "save-svg-as-png";

import styles from "./ExportModal.module.css";
import { Select, SelectItem, SelectContent, SelectItemText, SelectValue, SelectTrigger } from "@/components/select";
import { Button } from "@/components/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/dialog";
import { Input, InputSlot } from "@/components/input";

type ExportFormat = "PNG" | "SVG";

type ExportOption = {
  fileName: string;
  format: ExportFormat;
  size: number;
};

type SvgRefType = React.RefObject<HTMLElement & SVGSVGElement>;

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

  const onExport = async () => {
    onOpenChange(false);
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
