import type { Metadata } from "next";
import { getAvailableAiModels } from "../api";
import { Prompts } from "./prompts";
import OgImage from "../assets/og-image.png";

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
    creator: "@raycastapp",
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
  return <Prompts models={models} />;
}
