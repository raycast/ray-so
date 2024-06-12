import type { Metadata } from "next";
import Link from "next/link";
import Presets from "./presets";
import { getAvailableAiModels } from "../api";

const pageTitle = "Preset Explorer by Raycast";
const pageDescription = "Easily browse, share, and add presets to Raycast.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
  },
};

export default async function Page() {
  const models = await getAvailableAiModels();
  return <Presets models={models} />;
}
