import type { Metadata } from "next";
import { Quicklinks } from "./quicklinks";
import OgImage from "../assets/og-image.png";

const pageTitle = "Quicklink Explorer by Raycast";
const pageDescription = "Easily browse, share, and add quicklinks to Raycast.";
const ogUrl = OgImage.src;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    type: "website",
    url: "/quicklinks",
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
  keywords: "quicklinks, AI, import, raycast, ideas",
};

export default async function Page() {
  return <Quicklinks />;
}
