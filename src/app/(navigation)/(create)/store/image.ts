import { atomWithStorage } from "jotai/utils";

export const EXPORT_SIZE_OPTIONS = [
  { label: "Normal (2×)", value: 2 },
  { label: "High Quality (4×)", value: 4 },
  { label: "Ultra HD (6×)", value: 6 },
];

export type ExportSize = (typeof EXPORT_SIZE_OPTIONS)[number];

export function isExportSize(value: ExportSize | unknown): value is ExportSize {
  return EXPORT_SIZE_OPTIONS.indexOf(value as ExportSize) !== -1;
}

const exportSizeAtom = atomWithStorage<number>("size", EXPORT_SIZE_OPTIONS[1].value);

export { exportSizeAtom };
