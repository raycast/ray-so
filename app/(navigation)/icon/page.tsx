import type { Metadata } from "next";
import { IconGenerator } from "./icon-generator";
import { Suspense } from "react";
import OgImage from "./assets/og-image.png";

const pageTitle = "Icon Maker by Raycast";
const pageDescription = "Create beautiful icons for your next project, app, or Raycast extension.";
const ogUrl = OgImage.src;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    url: "/icon",
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
  twitter: {
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
  keywords: "generate, create, icon, assets, image, picture, share, export",
};

export default async function Page() {
  return (
    <Suspense>
      <IconGenerator />
    </Suspense>
  );
}
