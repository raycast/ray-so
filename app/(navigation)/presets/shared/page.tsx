import { notFound } from "next/navigation";
import { allPresets, Preset } from "../presets";
import { getAvailableAiModels } from "@/api/ai";
import { PresetDetail } from "../components/PresetDetail";
import { Metadata, ResolvingMetadata } from "next";
import { getExtensions } from "@/api/store";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function parseURLPreset(presetQueryString?: string) {
  if (!presetQueryString) {
    return null;
  }
  return JSON.parse(presetQueryString);
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const preset = parseURLPreset(searchParams.preset as string);
  if (!preset) {
    notFound();
  }
  const pageTitle = `${preset.name} - Raycast AI Preset`;
  const ogImage = `/presets/og?title=${encodeURIComponent(preset.name)}&description=${encodeURIComponent(
    preset.description || "",
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
      creator: "@raycast",
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

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  if (!searchParams.preset) {
    notFound();
  }

  const preset = parseURLPreset(searchParams.preset as string) as Preset;

  if (!preset) {
    notFound();
  }

  const relatedPresets = allPresets
    .filter((p) => p.id !== preset.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);

  const models = await getAvailableAiModels();
  const extensionIds = preset.tools?.map((tool) => tool.id) || [];
  const extensions = await getExtensions({ extensionIds });

  return <PresetDetail preset={preset} relatedPresets={relatedPresets} models={models} extensions={extensions} />;
}
