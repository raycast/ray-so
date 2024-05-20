import { atomWithStorage } from "jotai/utils";

export const EXPORT_SIZE_OPTIONS = [2, 4, 6] as const;

export const SIZE_LABELS = {
  2: "2x",
  4: "4x",
  6: "6x",
} as const;

export type ExportSize = (typeof EXPORT_SIZE_OPTIONS)[number];

export function isExportSize(value: ExportSize | unknown): value is ExportSize {
  return EXPORT_SIZE_OPTIONS.indexOf(value as ExportSize) !== -1;
}

const exportSizeAtom = atomWithStorage<ExportSize>("size", EXPORT_SIZE_OPTIONS[1]);

export { exportSizeAtom };
