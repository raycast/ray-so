import type { Metadata } from "next";
import Link from "next/link";
import { getAvailableAiModels } from "../api";
import { Prompts } from "./prompts";

const pageTitle = "Prompt Explorer by Raycast";
const pageDescription = "Easily browse, share, and add prompts to Raycast.";

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
  return <Prompts models={models} />;
}
