import type { Metadata } from "next";
import Snippets from "./snippets";

const pageTitle = "Snippet Explorer by Raycast";
const pageDescription = "Snippet Explorer is a tool to easily browse and import Snippets directly to Raycast.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
  },
};

export default async function Page() {
  return <Snippets />;
}
