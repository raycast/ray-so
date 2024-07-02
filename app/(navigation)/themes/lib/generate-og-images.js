const fs = require("fs");
const path = require("path");
const glob = require("glob").glob;
const promisify = require("util").promisify;
const readFileAsync = promisify(fs.readFile);
const download = require("image-downloader");

const themesDir = path.join(process.cwd(), "app", "(navigation)", "themes", "themes");

async function getAllThemes() {
  const allThemePaths = await glob(`${themesDir}/**/*.json`);
  const sortedThemePaths = allThemePaths.sort((a, b) => {
    const aFileName = path.basename(a);
    const bFileName = path.basename(b);
    return aFileName.localeCompare(bFileName);
  });

  const themes = await Promise.all(
    sortedThemePaths.map(async (filePath) => {
      const fileName = path.basename(filePath);
      const data = await readFileAsync(filePath);
      const themeData = JSON.parse(data.toString());

      const parentDirName = path.basename(filePath.replace(fileName, ""));
      const slug = `${parentDirName}/${fileName.replace(".json", "")}`.toLowerCase();

      return { ...themeData, slug };
    })
  );

  return themes;
}

function doesFileExist(filename, directory) {
  const filePath = path.join(directory, filename);
  return fs.existsSync(filePath);
}

const outputDir = path.join(process.cwd(), "public", "themes-og");

async function main() {
  const option = process.argv[2];

  const forceRegeneration = option === "--force";
  const shouldRegenerateSlug = option.includes("--slug");
  const slugToRegenerate = shouldRegenerateSlug ? option.split("--slug=")[1] : null;

  const themes = await getAllThemes();

  themes.forEach(async (theme) => {
    const { colors, ...restTheme } = theme;

    const queryParams = new URLSearchParams();
    Object.entries(restTheme).forEach(([key, value]) => queryParams.set(key, value));
    Object.entries(colors).forEach(([key, value]) => queryParams.set(key, value));

    const filename = `${theme.slug.replace("/", "_")}.png`;

    if (!forceRegeneration && !shouldRegenerateSlug && doesFileExist(filename, outputDir)) {
      return;
    }

    if (shouldRegenerateSlug && slugToRegenerate !== theme.slug) {
      return;
    }

    const url = `http://localhost:3000/themes/og?${queryParams}`;

    download
      .image({
        url,
        dest: `${outputDir}/${filename}`,
      })
      .then(({ filename }) => {
        console.log("✅ Image saved");
        console.log("URL", url);
        console.log("Saved to", filename);
      })
      .catch((err) => {
        console.log("---");
        console.log("Error", url);
        console.error(err);
      });
  });
}
main();
