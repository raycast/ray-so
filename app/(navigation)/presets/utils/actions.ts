import copy from "copy-to-clipboard";
import { Model, Preset } from "../presets";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { BASE_URL } from "@/utils/common";

const raycastProtocolForEnvironments = {
  development: "raycastinternal",
  production: "raycast",
  test: "raycastinternal",
};
const raycastProtocol = raycastProtocolForEnvironments[process.env.NODE_ENV];

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
    web_search,
    image_generation,
  })}]`;
}

function makeQueryString(preset: Preset): string {
  const { name, instructions, description, creativity, icon, model, web_search, image_generation, id } = preset;

  return `preset=${encodeURIComponent(
    JSON.stringify({
      name,
      description,
      instructions,
      creativity,
      icon,
      model: prepareModel(model),
      web_search,
      image_generation,
      id,
    })
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

export function addToRaycast(router: AppRouterInstance, preset: Preset) {
  router.replace(`${raycastProtocol}://presets/import?${makeQueryString(preset)}`);
}
