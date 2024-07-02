import { readFile } from "fs";
import { basename, join } from "path";
import { glob } from "glob";
import { promisify } from "util";
import { BASE_URL } from "@/utils/common";

export type Theme = {
  author: string;
  authorUsername: string;
  version: string;
  name: string;
  slug?: string;
  appearance: "light" | "dark";
  colors: {
    background: string;
    backgroundSecondary: string;
    text: string;
    selection: string;
    loader: string;
    red: string;
    orange: string;
    yellow: string;
    green: string;
    blue: string;
    purple: string;
    magenta: string;
  };
};

const themesDir = join(process.cwd(), "app", "(navigation)", "themes", "themes");

const readFileAsync = promisify(readFile);

export async function getAllThemes(): Promise<Theme[]> {
  const allThemePaths = await glob(`${themesDir}/**/*.json`);
  const sortedThemePaths = allThemePaths.sort((a, b) => {
    const aFileName = basename(a);
    const bFileName = basename(b);
    return aFileName.localeCompare(bFileName);
  });

  const themes = await Promise.all(
    sortedThemePaths.map(async (filePath) => {
      const fileName = basename(filePath);
      const data = await readFileAsync(filePath);
      const themeData = JSON.parse(data.toString());

      const parentDirName = basename(filePath.replace(fileName, ""));
      const slug = `${parentDirName}/${fileName.replace(".json", "")}`.toLowerCase();

      return { ...themeData, slug, og_image: `${BASE_URL}/themes-og/${slug.replace("/", "_")}.png` };
    })
  );

  return themes;
}

// This function checks whether the query params generated from Raycast's Theme Studio
// can be converted into a Theme object that is used in this App
function canConvertParamsToTheme(params: any): boolean {
  const { appearance, name, version, colors } = params;
  return appearance && name && version && colors;
}

function convertLegacyColorIfNeeded(color: string) {
  const [hex, value] = color.split("#");
  if (value.length === 8) {
    return `#${value.slice(0, -2)}`;
  }
  return color;
}

// This function converts the query params generated from Raycast's Theme Studio
// into a Theme object that is used in this App
export function makeThemeObjectFromParams(params: any): Theme | undefined {
  if (canConvertParamsToTheme(params)) {
    const { appearance, name, author, authorUsername, version, colors: colorString } = params;

    const colorArray = colorString.split(",");

    const colorObject = {
      background: convertLegacyColorIfNeeded(colorArray[0]),
      backgroundSecondary: convertLegacyColorIfNeeded(colorArray[1]),
      text: convertLegacyColorIfNeeded(colorArray[2]),
      selection: convertLegacyColorIfNeeded(colorArray[3]),
      loader: convertLegacyColorIfNeeded(colorArray[4]),
      red: convertLegacyColorIfNeeded(colorArray[5]),
      orange: convertLegacyColorIfNeeded(colorArray[6]),
      yellow: convertLegacyColorIfNeeded(colorArray[7]),
      green: convertLegacyColorIfNeeded(colorArray[8]),
      blue: convertLegacyColorIfNeeded(colorArray[9]),
      purple: convertLegacyColorIfNeeded(colorArray[10]),
      magenta: convertLegacyColorIfNeeded(colorArray[11]),
    };

    return {
      appearance,
      name,
      version,
      author,
      authorUsername,
      colors: colorObject,
    };
  } else {
    return undefined;
  }
}
