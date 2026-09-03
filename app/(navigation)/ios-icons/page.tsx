import type { Metadata } from "next";
import { readdir } from "fs/promises";
import path from "path";
import { IosIcons } from "./ios-icons";

type ThemeKey = "default" | "dark" | "clearLight" | "clearDark";

type IconFeature = {
  id: string;
  label: string;
  themes: Partial<Record<ThemeKey, string>>;
};

const pageTitle = "iOS App Icons by Raycast";
const pageDescription = "Save iOS shortcut icons for Raycast features.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    type: "website",
    url: "/ios-icons",
    title: pageTitle,
    description: pageDescription,
    siteName: "Ray.so",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@raycast",
    title: pageTitle,
    description: pageDescription,
  },
  keywords: "ios, app icons, shortcuts, raycast",
};

const THEME_ORDER: ThemeKey[] = ["default", "dark", "clearLight", "clearDark"];

function toFeatureLabel(name: string) {
  const title = name
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (char) => char.toUpperCase());

  return title.replace(/\bAi\b/g, "AI");
}

async function getIcons(): Promise<IconFeature[]> {
  const iconDir = path.join(process.cwd(), "public", "ios-shortcut-icons");
  const files = await readdir(iconDir);
  const map = new Map<string, IconFeature>();

  for (const file of files) {
    const match = file.match(/^(.*)-(default|dark|clearLight|clearDark)\.png$/);
    if (!match) {
      continue;
    }

    const [, featureId, theme] = match;
    const themeKey = theme as ThemeKey;

    if (!map.has(featureId)) {
      map.set(featureId, {
        id: featureId,
        label: toFeatureLabel(featureId),
        themes: {},
      });
    }

    const feature = map.get(featureId);
    if (!feature) {
      continue;
    }

    feature.themes[themeKey] = `/ios-shortcut-icons/${file}`;
  }

  return Array.from(map.values())
    .map((feature) => ({
      ...feature,
      themes: THEME_ORDER.reduce<IconFeature["themes"]>((acc, theme) => {
        if (feature.themes[theme]) {
          acc[theme] = feature.themes[theme];
        }
        return acc;
      }, {}),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export default async function Page() {
  const icons = await getIcons();
  return <IosIcons icons={icons} />;
}
