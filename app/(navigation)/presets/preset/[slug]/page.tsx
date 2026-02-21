import { notFound } from "next/navigation";
import { allPresets } from "../../presets";
import { getAvailableAiModels } from "@/api/ai";
import { PresetDetail } from "../../components/PresetDetail";
import { Metadata, ResolvingMetadata } from "next";
import { getExtensions } from "@/api/store";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const preset = allPresets.find((preset) => preset.id === params.slug);
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
      url: `/presets/preset/${params.slug}`,
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
      "twitter:label2": preset.creativity ? "Creativity" : preset.tools ? "AI Tools" : "",
      "twitter:data2": preset.creativity
        ? preset.creativity
        : preset.tools
          ? preset.tools.map((tool) => tool.name)
          : "",
    },
  };
}

const hashString = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return hash;
};

const getRelatedPresets = (presetId: string) => {
  const candidates = allPresets.filter((p) => p.id !== presetId).sort((a, b) => a.id.localeCompare(b.id));
  if (candidates.length <= 2) {
    return candidates;
  }
  const startIndex = Math.abs(hashString(presetId)) % candidates.length;
  return [...candidates.slice(startIndex), ...candidates.slice(0, startIndex)].slice(0, 2);
};

export default async function Page(props: Props) {
  const params = await props.params;
  if (!params.slug) {
    notFound();
  }

  const preset = allPresets.find((preset) => preset.id === params.slug);

  if (!preset) {
    notFound();
  }

  const relatedPresets = getRelatedPresets(preset.id);

  const models = await getAvailableAiModels();
  const allToolIds = Array.from(new Set([...(preset?.tools?.map((tool) => tool.id) || [])]));
  const extensions = await getExtensions({ extensionIds: allToolIds });

  return <PresetDetail preset={preset} relatedPresets={relatedPresets} models={models} extensions={extensions} />;
}

export async function generateStaticParams() {
  return allPresets.map((preset) => ({
    slug: preset.id,
  }));
}
