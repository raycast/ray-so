import copy from "copy-to-clipboard";
import { Preset } from "../presets";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { BASE_URL } from "@/utils/common";
import { Model } from "@/api/ai";
import { getRaycastFlavor, setRaycastImportVersion, type RaycastImportVersion } from "@/app/RaycastFlavor";

function prepareModel(model: Model) {
  if (model && /^".*"$/.test(model)) {
    return model.slice(1, model.length - 1);
  }
  return model;
}

function makePresetImportData(preset: Preset): string {
  const { name, instructions, creativity, icon, model, web_search, image_generation } = preset;
  return `[${JSON.stringify({
    name,
    instructions,
    creativity,
    icon,
    model: prepareModel(model),
    web_search: web_search ? true : false,
    image_generation: image_generation ? true : false,
  })}]`;
}

function makeQueryString(preset: Preset): string {
  const { name, instructions, description, creativity, icon, model, web_search, image_generation, id, tools } = preset;

  return `preset=${encodeURIComponent(
    JSON.stringify({
      name,
      description,
      instructions,
      creativity,
      icon,
      model: prepareModel(model),
      web_search: web_search ? true : false,
      image_generation: image_generation ? true : false,
      id,
      tools,
    }),
  )}`;
}

export function downloadData(preset: Preset) {
  const encodedPresetData = encodeURIComponent(makePresetImportData(preset));
  const jsonString = `data:text/json;chatset=utf-8,${encodedPresetData}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = `${preset.id}.json`;
  link.click();
}

export function copyData(preset: Preset) {
  copy(makePresetImportData(preset));
}

export function makeUrl(preset: Preset) {
  if (preset.id) {
    return `${BASE_URL}/presets/preset/${preset.id}`;
  }
  return `${BASE_URL}/presets/shared?${makeQueryString(preset)}`;
}

export function copyUrl(preset: Preset) {
  copy(makeUrl(preset));
}

export async function addToRaycast(
  router: AppRouterInstance,
  preset: Preset,
  isTouch?: boolean,
  importVersion?: RaycastImportVersion,
) {
  const queryString = makeQueryString(preset);

  // For mobile, use window.location.href directly as it's more reliable
  if (isTouch) {
    window.location.href = `raycast://presets/import?${queryString}`;
  } else {
    if (importVersion) {
      setRaycastImportVersion(importVersion);
    }

    const raycastProtocol = await getRaycastFlavor(importVersion);
    const url = `${raycastProtocol}://presets/import?${queryString}`;

    // For desktop, use router.replace
    router.replace(url);
  }
}
