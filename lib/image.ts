import {
  toPng as htmlToPng,
  toSvg as htmlToSvg,
  toBlob as htmlToBlob,
} from "html-to-image";

const imageFilter = (node: HTMLElement) =>
  node.tagName !== "TEXTAREA" && !node.dataset?.ignoreInExport;

export const toPng = async (node: HTMLElement) => {
  return htmlToPng(node, {
    filter: imageFilter,
  });
};

export const toBlob = async (node: HTMLElement) => {
  return htmlToBlob(node, {
    filter: imageFilter,
  });
};

export const toSvg = async (node: HTMLElement) => {
  return htmlToSvg(node, { filter: imageFilter });
};
