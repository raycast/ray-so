import type { Metadata } from "next";
import { CodeVideosApp } from "../_code/videos/CodeVideosApp";
import { BASE_URL } from "@/utils/common";

const title = "Create beautiful videos of your code";
const description =
  "Turn your code into polished typing animations. Choose syntax colors, adjust timing, and export a shareable video of your code.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    url: `${BASE_URL}/videos`,
    title,
    description,
  },
  twitter: {
    title,
    description,
  },
  keywords: "generate, create, export, source, code, typing, animation, video, webm, share",
};

export default function Page() {
  return <CodeVideosApp />;
}
