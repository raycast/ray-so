import { toPng as htmlToPng, toSvg as htmlToSvg, toBlob as htmlToBlob } from "html-to-image";

const imageFilter = (node: HTMLElement) => node.tagName !== "TEXTAREA" && !node.dataset?.ignoreInExport;

const htmlToImageOptions = {
  filter: imageFilter,
  pixelRatio: 2,
  skipAutoScale: true,
};

export const toPng = async (node: HTMLElement) => {
  return htmlToPng(node, htmlToImageOptions);
};

export const toBlob = async (node: HTMLElement) => {
  return htmlToBlob(node, htmlToImageOptions);
};

export const toSvg = async (node: HTMLElement) => {
  return htmlToSvg(node, htmlToImageOptions);
};
