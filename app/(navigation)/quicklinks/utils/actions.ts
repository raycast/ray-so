import copy from "copy-to-clipboard";
import { Quicklink } from "../quicklinks";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { BASE_URL } from "@/utils/common";
import { getRaycastFlavor, getIsRaycastV2 } from "@/app/RaycastFlavor";

function getRaycastIconName(iconName?: string, isRaycastV2?: boolean) {
  if (iconName) {
    return isRaycastV2 ? iconName : `${iconName}-16`;
  }
  return undefined;
}

function makeQuicklinkImportData(quicklinks: Quicklink[]): string {
  return `[${quicklinks
    .map((selectedQuicklink) => {
      const { icon, name, link, openWith } = selectedQuicklink;

      return JSON.stringify({
        ...(icon?.name && { icon: icon.name }),
        name,
        link,
        openWith,
      });
    })
    .join(",")}]`;
}

function withRaycastProtocol<T extends Quicklink>(quicklinks: T[], protocol: string): T[] {
  return quicklinks.map((quicklink) => ({
    ...quicklink,
    link: quicklink.link.replace(/^raycast(?:internal|debug|-x(?:-internal|-development)?)?:\/\//, `${protocol}://`),
  }));
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

export async function addToRaycast(router: AppRouterInstance, quicklinks: Quicklink[], isTouch?: boolean) {
  // For mobile, always use the standard 'raycast' scheme since iOS apps
  // are typically registered for 'raycast://' not 'raycastinternal://'
  if (isTouch) {
    const quicklinksForImport = withRaycastProtocol(quicklinks, "raycast");
    window.location.href = `raycast://quicklinks/import?${makeQueryString(quicklinksForImport, true)}`;
  } else {
    const raycastProtocol = await getRaycastFlavor();
    const isRaycastV2 = await getIsRaycastV2();
    const quicklinksForImport = withRaycastProtocol(quicklinks, raycastProtocol);

    if (isRaycastV2) {
      const context = encodeURIComponent(
        JSON.stringify(
          quicklinksForImport.map(({ name, link, openWith, icon }) => ({
            name,
            link,
            openWith,
            icon: getRaycastIconName(icon?.name, true),
          })),
        ),
      );
      router.replace(`${raycastProtocol}://extensions/raycast/quicklinks/import-quicklinks?context=${context}`);
    } else {
      router.replace(`${raycastProtocol}://quicklinks/import?${makeQueryString(quicklinksForImport, true)}`);
    }
  }
}

export async function addQuicklinkToRaycast(router: AppRouterInstance, quicklink: Quicklink) {
  const raycastProtocol = await getRaycastFlavor();
  const isRaycastV2 = await getIsRaycastV2();
  const [{ name, link, openWith, icon }] = withRaycastProtocol([quicklink], raycastProtocol);
  const encodedQuicklink = encodeURIComponent(
    JSON.stringify({
      name,
      link,
      openWith,
      icon: getRaycastIconName(icon?.name, isRaycastV2),
    }),
  );

  if (isRaycastV2) {
    router.replace(`${raycastProtocol}://extensions/raycast/quicklinks/create-quicklink?context=${encodedQuicklink}`);
  } else {
    router.replace(`${raycastProtocol}://extensions/raycast/raycast/create-quicklink?context=${encodedQuicklink}`);
  }
}
