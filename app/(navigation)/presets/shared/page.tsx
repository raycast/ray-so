import { notFound } from "next/navigation";
import { allPresets } from "../presets";
import { getAvailableAiModels } from "../api";
import { PresetDetail } from "../components/PresetDetail";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

function parseURLPreset(presetQueryString?: string) {
  if (!presetQueryString) {
    return null;
  }
  return JSON.parse(presetQueryString);
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const preset = parseURLPreset(searchParams.preset as string);
  if (!preset) {
    notFound();
  }
  const pageTitle = `${preset.name} - Raycast AI Preset`;
  const ogImage = `/presets/og?title=${encodeURIComponent(preset.name)}&description=${encodeURIComponent(
    preset.description || ""
  )}&icon=${preset.icon}`;

  return {
    title: pageTitle,
    description: preset.description,
    openGraph: {
      type: "website",
      url: "/presets/shared",
      title: pageTitle,
      description: preset.description,
      siteName: "Ray.so",
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@raycastapp",
      title: pageTitle,
      description: preset.description,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    other: {
      "twitter:label1": "Model",
      "twitter:data": preset.model,
      "twitter:label2": "Creativity",
      "twitter:data2": preset.creativity,
    },
  };
}

export default async function Page({ params, searchParams }: Props) {
  if (!searchParams.preset) {
    notFound();
  }

  const preset = parseURLPreset(searchParams.preset as string);

  if (!preset) {
    notFound();
  }

  const relatedPresets = allPresets
    .filter((p) => p.id !== preset.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);

  const models = await getAvailableAiModels();

  return <PresetDetail preset={preset} relatedPresets={relatedPresets} models={models} />;
}
