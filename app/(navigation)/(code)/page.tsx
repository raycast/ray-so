import type { Metadata } from "next";

import OgPhoto from "./assets/og.png";
import { Code } from "./code";

const url = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

const title = "Create beautiful images of your code";
const description =
  "Turn your code into beautiful images. Choose from a range of syntax colors, hide or show the background, and toggle between a dark and light window.";
const ogUrl = OgPhoto.src;

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: title,
  description: description,
  openGraph: {
    type: "website",
    url: url,
    title: title,
    description: description,
    images: [
      {
        url: ogUrl,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@raycastapp",
    title: title,
    description: description,
    images: [
      {
        url: ogUrl,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  keywords: "generate, create, convert, source, code, snippet, image, picture, share, export",
};

export default function Page() {
  return <Code />;
}
