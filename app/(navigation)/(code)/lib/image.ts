import { toPng as htmlToPng, toSvg as htmlToSvg, toBlob as htmlToBlob } from "html-to-image";

const imageFilter = (node: HTMLElement) => node.tagName !== "TEXTAREA" && !node.dataset?.ignoreInExport;

const htmlToImageOptions = {
  filter: imageFilter,
  pixelRatio: 2,
  skipAutoScale: true,
  useCORS: true,
  allowTaint: true,
};

type PngOptions = Parameters<typeof htmlToPng>[1];
export const toPng = async (node: HTMLElement, options?: PngOptions) => {
  // Ensure the node is properly sized before export
  const rect = node.getBoundingClientRect();
  const exportOptions = {
    ...htmlToImageOptions,
    width: rect.width,
    height: rect.height,
    ...options,
  };

  // sometimes the first render doesn't work fully so we do the rendering twice https://github.com/bubkoo/html-to-image/issues/361
  await htmlToPng(node, exportOptions);
  return htmlToPng(node, exportOptions);
};

type BlobOptions = Parameters<typeof htmlToBlob>[1];
export const toBlob = async (node: HTMLElement, options?: BlobOptions) => {
  const rect = node.getBoundingClientRect();
  return htmlToBlob(node, {
    ...htmlToImageOptions,
    width: rect.width,
    height: rect.height,
    ...options,
  });
};

type SvgOptions = Parameters<typeof htmlToSvg>[1];
export const toSvg = async (node: HTMLElement, options?: SvgOptions) => {
  const rect = node.getBoundingClientRect();
  return htmlToSvg(node, {
    ...htmlToImageOptions,
    width: rect.width,
    height: rect.height,
    ...options,
  });
};
