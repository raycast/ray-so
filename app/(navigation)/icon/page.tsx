import type { Metadata } from "next";
import { IconGenerator } from "./icon-generator";
import { Suspense } from "react";

const pageTitle = "Icon Maker by Raycast";
const pageDescription = "Create beautiful icons for your next project, app, or Raycast extension.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
  },
};

export default async function Page() {
  return (
    <Suspense>
      <IconGenerator />
    </Suspense>
  );
}
