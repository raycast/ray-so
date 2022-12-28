import {
  toPng as htmlToPng,
  toSvg as htmlToSvg,
  toBlob as htmlToBlob,
} from "html-to-image";
import { changeDpiDataUrl } from "changedpi";

const imageFilter = (node: HTMLElement) =>
  node.tagName !== "TEXTAREA" && !node.dataset?.ignoreInExport;

export const toPng = async (node: HTMLElement) => {
  const scale = 2;
  const dpi = 72;

  const dataUrl = await htmlToPng(node, {
    height: node.offsetHeight * scale,
    width: node.offsetWidth * scale,
    style: {
      transform: `scale(${scale})`,
      transformOrigin: `top left`,
      width: `${node.offsetWidth}px`,
      height: `${node.offsetHeight}px`,
    },
    filter: imageFilter,
  });

  return changeDpiDataUrl(dataUrl, dpi * scale);
};

export const toBlob = async (node: HTMLElement) => {
  const scale = 2;
  const dpi = 72;

  return htmlToBlob(node, {
    height: node.offsetHeight * scale,
    width: node.offsetWidth * scale,
    style: {
      transform: `scale(${scale})`,
      transformOrigin: `top left`,
      width: `${node.offsetWidth}px`,
      height: `${node.offsetHeight}px`,
    },
    filter: imageFilter,
  });
};

export const toSvg = async (node: HTMLElement) => {
  return htmlToSvg(node, { filter: imageFilter });
};
