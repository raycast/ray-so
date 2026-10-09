import { toPng as htmlToPng, toSvg as htmlToSvg, toBlob as htmlToBlob } from "html-to-image";

const imageFilter = (node: HTMLElement) => node.tagName !== "TEXTAREA" && !node.dataset?.ignoreInExport;

const htmlToImageOptions = {
  filter: imageFilter,
  pixelRatio: 2,
  skipAutoScale: true,
};

type PngOptions = Parameters<typeof htmlToPng>[1];

// Export UI changes can collapse an empty title bar. Let React and resize
// observers update the frame, grid, and shader dimensions before cloning it.
const waitForExportLayout = () =>
  new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));

const svgDataUrl = (svg: SVGSVGElement) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(new XMLSerializer().serializeToString(svg))}`;

// Safari can drop canvas snapshots nested inside an SVG foreignObject. Keep
// full-frame shader backgrounds separate from the HTML layer when exporting.
const shaderLayers = async (node: HTMLElement, options?: PngOptions) => {
  const background = node.querySelector<HTMLCanvasElement>("[data-export-shader] canvas");
  if (!background) return null;

  const dataUrl = await htmlToSvg(node, {
    ...htmlToImageOptions,
    ...options,
    filter: (element) => element !== background && (options?.filter ?? imageFilter)(element),
  });
  const document = new DOMParser().parseFromString(decodeURIComponent(dataUrl.split(",")[1]), "image/svg+xml");
  const svg = document.documentElement as unknown as SVGSVGElement;
  const shader = svg.querySelector<HTMLElement>("[data-export-shader]");
  if (!shader?.parentElement) throw new Error("Couldn't find the shader background in the export");
  shader.parentElement.style.backgroundColor = "transparent";
  shader.remove();

  return { background, svg };
};

const shaderCanvas = async (layers: NonNullable<Awaited<ReturnType<typeof shaderLayers>>>, options?: PngOptions) => {
  const { background, svg } = layers;
  const foreground = new Image();
  foreground.src = svgDataUrl(svg);
  await foreground.decode();

  const canvas = document.createElement("canvas");
  const ratio = options?.pixelRatio ?? htmlToImageOptions.pixelRatio;
  canvas.width = (options?.canvasWidth ?? Number(svg.getAttribute("width"))) * ratio;
  canvas.height = (options?.canvasHeight ?? Number(svg.getAttribute("height"))) * ratio;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Couldn't create an export canvas");
  context.drawImage(background, 0, 0, canvas.width, canvas.height);
  context.drawImage(foreground, 0, 0, canvas.width, canvas.height);
  return canvas;
};

export const toPng = async (node: HTMLElement, options?: PngOptions) => {
  await waitForExportLayout();
  const layers = await shaderLayers(node, options);
  if (layers) {
    await shaderCanvas(layers, options);
    return (await shaderCanvas(layers, options)).toDataURL();
  }
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
  await waitForExportLayout();
  const layers = await shaderLayers(node, options);
  if (layers) {
    const canvas = await shaderCanvas(layers, options);
    return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve));
  }
  return htmlToBlob(node, {
    ...htmlToImageOptions,
    ...options,
  });
};

type SvgOptions = Parameters<typeof htmlToSvg>[1];
export const toSvg = async (node: HTMLElement, options?: SvgOptions) => {
  await waitForExportLayout();
  const layers = await shaderLayers(node, options);
  if (layers) {
    const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
    image.setAttribute("width", "100%");
    image.setAttribute("height", "100%");
    image.setAttribute("preserveAspectRatio", "none");
    image.setAttribute("href", layers.background.toDataURL());
    layers.svg.prepend(image);
    return svgDataUrl(layers.svg);
  }
  return htmlToSvg(node, {
    ...htmlToImageOptions,
    ...options,
  });
};
