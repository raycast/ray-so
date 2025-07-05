import type { Metadata } from "next";
import Presets from "./presets";
import { getAvailableAiModels } from "@/api/ai";
import OgImage from "../assets/og-image.png";
import { allPresets } from "../presets";
import { getExtensions } from "@/api/store";
import { getExtensionIdsFromString } from "@/utils/getExtensionIdsFromString";
const pageTitle = "Preset Explorer by Raycast";
const pageDescription = "Easily browse, share, and add presets to Raycast.";
const ogUrl = OgImage.src;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    url: "/presets",
    title: pageTitle,
    description: pageDescription,
    siteName: "Ray.so",
    images: [
      {
        url: ogUrl,
        width: 1200,
        height: 630,
        alt: pageTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@raycast",
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: ogUrl,
        width: 1200,
        height: 630,
        alt: pageTitle,
      },
    ],
  },
  keywords: "prompts, AI, import, raycast, ideas",
};

export default async function Page() {
  const models = await getAvailableAiModels();
  const toolIds = allPresets.reduce((acc: string[], preset) => {
    if (preset.tools) {
      const toolList = Array.isArray(preset.tools) ? preset.tools : [preset.tools];
      toolList.forEach((tool) => {
        if (!acc.includes(tool.id)) {
          acc.push(tool.id);
        }
      });
    }
    return acc;
  }, []);
  const extensions = await getExtensions({ extensionIds: toolIds });
  return <Presets models={models} extensions={extensions} />;
}
