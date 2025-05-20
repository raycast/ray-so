import { getRaycastFlavor } from "@/app/RaycastFlavor";
import { Theme } from "@themes/lib/theme";

export async function makeRaycastImportUrl(theme: Theme) {
  const { slug, colors, ...restTheme } = theme;

  const raycastProtocol = await getRaycastFlavor();
  const url = new URL(`${raycastProtocol}://theme`);

  const encodedParams = Object.entries(restTheme).map(
    ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
  );

  const orderedColors = [
    colors.background,
    colors.backgroundSecondary,
    colors.text,
    colors.selection,
    colors.loader,
    colors.red,
    colors.orange,
    colors.yellow,
    colors.green,
    colors.blue,
    colors.purple,
    colors.magenta,
  ];

  encodedParams.push(`colors=${orderedColors.map(encodeURIComponent).join(",")}`);
  url.search = encodedParams.join("&");

  return url.toString();
}
