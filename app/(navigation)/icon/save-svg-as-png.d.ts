declare module "save-svg-as-png" {
  // TODO: real options type?
  export function saveSvgAsPng(el: SVGSVGElement, filename?: string, options: Record<string, string | number>): void;
  export function svgAsPngUri(el: SVGSVGElement, options: Record<string, string | number>): Awaited<string>;
}
