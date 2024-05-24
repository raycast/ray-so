import { THEMES } from "./store/themes";
import { createVsCodeTheme } from "./util/theme-vs-code";
import fs from "fs";
import path from "path";
const outputDir = "../ray-so-themes/themes";
const themeIds = Object.keys(THEMES);

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const generateTheme = async (themeId: string, type: "light" | "dark") => {
  try {
    const theme = Object.entries(THEMES).find(([key]) => key === themeId)?.[1];
    if (!theme) return console.error(`Theme not found: ${themeId}`);
    const vsCodeTheme = createVsCodeTheme({
      name: themeId,
      type: type,
      theme: theme,
    });
    const fileName = `${themeId}-${type}.json`;
    const filePath = path.join(outputDir, fileName);
    fs.writeFileSync(filePath, JSON.stringify(vsCodeTheme, null, 2));
    console.log(`Saved ${fileName}.json`);
  } catch (error) {
    console.error(`Error fetching theme for ${themeId}:`, error);
  }
};

const generateThemes = async () => {
  for (const themeId of themeIds) {
    await generateTheme(themeId, "dark");
    await generateTheme(themeId, "light");
  }
};

generateThemes();
