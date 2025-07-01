import type { Metadata } from "next";
import { getAvailableAiModels } from "@/api/ai";
import { Prompts } from "./prompts";
import OgImage from "../assets/og-image.png";
import { getExtensions } from "@/api/store";
import { allPrompts } from "../prompts";
import { getExtensionIdsFromString } from "@/utils/getExtensionIdsFromString";

const pageTitle = "Prompt Explorer by Raycast";
const pageDescription = "Easily browse, share, and add prompts to Raycast.";
const ogUrl = OgImage.src;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    type: "website",
    url: "/prompts",
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
  const extensionIds = allPrompts.flatMap((prompt) => getExtensionIdsFromString(prompt.prompt));
  const allExtensions = await getExtensions({ extensionIds });
  return <Prompts models={models} extensions={allExtensions} />;
}
