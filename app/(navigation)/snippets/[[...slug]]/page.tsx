import type { Metadata } from "next";
import Snippets from "./snippets";
import OgImage from "../assets/og-image.png";

const pageTitle = "Snippet Explorer by Raycast";
const pageDescription = "Snippet Explorer is a tool to easily browse and import Snippets directly to Raycast.";
const ogUrl = OgImage.src;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    type: "website",
    url: "/snippets",
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
  keywords: "snippets, import, raycast, ideas",
};

export default async function Page() {
  return <Snippets />;
}
