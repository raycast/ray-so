import type { Metadata } from "next";

import OgPhoto from "./assets/og.png";
import { Code } from "./code";
import { BASE_URL } from "@/utils/common";

const title = "Create beautiful images of your code";
const description =
  "Turn your code into beautiful images. Choose from a range of syntax colors, hide or show the background, and toggle between a dark and light window.";
const ogUrl = OgPhoto.src;

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    url: BASE_URL,
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
