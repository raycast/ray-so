import { toPng as htmlToPng, toSvg as htmlToSvg, toBlob as htmlToBlob } from "html-to-image";

const imageFilter = (node: HTMLElement) => node.tagName !== "TEXTAREA" && !node.dataset?.ignoreInExport;

const htmlToImageOptions = {
  filter: imageFilter,
  pixelRatio: 2,
  skipAutoScale: true,
};

// Some frames hide their header while exporting. html-to-image measures the node right away,
// so wait for the re-render or the image keeps the header's height as empty space.
const waitForRender = () =>
  new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));

type PngOptions = Parameters<typeof htmlToPng>[1];
export const toPng = async (node: HTMLElement, options?: PngOptions) => {
  await waitForRender();
  // sometimes the first render doesn't work fully so we do the rendering twice https://github.com/bubkoo/html-to-image/issues/361
  await htmlToPng(node, {
    ...htmlToImageOptions,
    ...options,
  });
  return htmlToPng(node, {
    ...htmlToImageOptions,
    ...options,
  });
};

type BlobOptions = Parameters<typeof htmlToBlob>[1];
export const toBlob = async (node: HTMLElement, options?: BlobOptions) => {
  await waitForRender();
  return htmlToBlob(node, {
    ...htmlToImageOptions,
    ...options,
  });
};

type SvgOptions = Parameters<typeof htmlToSvg>[1];
export const toSvg = async (node: HTMLElement, options?: SvgOptions) => {
  await waitForRender();
  return htmlToSvg(node, {
    ...htmlToImageOptions,
    ...options,
  });
};
