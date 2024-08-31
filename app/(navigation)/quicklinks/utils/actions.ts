import copy from "copy-to-clipboard";
import { Quicklink } from "../quicklinks";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { BASE_URL } from "@/utils/common";

const raycastProtocolForEnvironments = {
  development: "raycastinternal",
  production: "raycast",
  test: "raycastinternal",
};
const raycastProtocol = raycastProtocolForEnvironments[process.env.NODE_ENV];

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

function makeQueryString(quicklinks: Quicklink[]): string {
  const queryString = quicklinks
    .map((selectedQuicklink) => {
      const { name, link, openWith } = selectedQuicklink;

      return `quicklinks=${encodeURIComponent(
        JSON.stringify({
          name,
          link,
          openWith,
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

export function addToRaycast(router: AppRouterInstance, quicklinks: Quicklink[]) {
  router.replace(`${raycastProtocol}://quicklinks/import?${makeQueryString(quicklinks)}`);
}
