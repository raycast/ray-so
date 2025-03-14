import copy from "copy-to-clipboard";
import { Quicklink } from "../quicklinks";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { BASE_URL } from "@/utils/common";
import { getRaycastFlavor } from "@/app/RaycastFlavor";

function makeQuicklinkImportData(quicklinks: Quicklink[]): string {
  return `[${quicklinks
    .map((selectedQuicklink) => {
      const { name, link, openWith } = selectedQuicklink;

      return JSON.stringify({
        name,
        link,
        openWith,
      });
    })
    .join(",")}]`;
}

function makeQueryString(quicklinks: Quicklink[], isRaycastImport?: boolean): string {
  const queryString = quicklinks
    .map((selectedQuicklink) => {
      const { name, link, openWith, icon } = selectedQuicklink;

      return `quicklinks=${encodeURIComponent(
        JSON.stringify({
          name,
          link,
          openWith,
          iconName: isRaycastImport ? getRaycastIconName(icon?.name) : icon?.name,
          iconUrl: icon?.link,
          iconInvert: icon?.invert,
        }),
      )}`;
    })
    .join("&");
  return queryString;
}

export function downloadData(quicklinks: Quicklink[]) {
  const encodedQuicklinksData = encodeURIComponent(makeQuicklinkImportData(quicklinks));
  const jsonString = `data:text/json;chatset=utf-8,${encodedQuicklinksData}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = "quicklinks.json";
  link.click();
}

export function copyData(quicklinks: Quicklink[]) {
  copy(makeQuicklinkImportData(quicklinks));
}

export function makeUrl(quicklinks: Quicklink[]) {
  return `${BASE_URL}/quicklinks/shared?${makeQueryString(quicklinks)}`;
}

export function copyUrl(quicklinks: Quicklink[]) {
  copy(makeUrl(quicklinks));
}

export async function addToRaycast(router: AppRouterInstance, quicklinks: Quicklink[]) {
  const raycastProtocol = await getRaycastFlavor();
  router.replace(`${raycastProtocol}://quicklinks/import?${makeQueryString(quicklinks, true)}`);
}

export async function addQuicklinkToRaycast(router: AppRouterInstance, quicklink: Quicklink) {
  const raycastProtocol = await getRaycastFlavor();
  const { name, link, openWith, icon } = quicklink;
  const encodedQuicklink = encodeURIComponent(
    JSON.stringify({
      name,
      link,
      openWith,
      icon: getRaycastIconName(icon?.name),
    }),
  );
  router.replace(`${raycastProtocol}://extensions/raycast/raycast/create-quicklink?context=${encodedQuicklink}`);
}

function getRaycastIconName(iconName?: string) {
  if (iconName) {
    return `${iconName}-16`;
  }
  return undefined;
}
