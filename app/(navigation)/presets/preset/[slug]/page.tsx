import { notFound } from "next/navigation";
import { allPresets } from "../../presets";
import { getAvailableAiModels } from "@/api/ai";
import { PresetDetail } from "../../components/PresetDetail";
import { Metadata, ResolvingMetadata } from "next";
import { getExtensions } from "@/api/store";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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
      creator: "@raycastapp",
      title: pageTitle,
      description: preset.description,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    // TODO: Get extension names
    other: {
      "twitter:label1": "Model",
      "twitter:data": preset.model,
      "twitter:label2": preset.creativity ? "Creativity" : preset.extensions ? "AI Extensions" : "",
      "twitter:data2": preset.creativity
        ? preset.creativity
        : preset.extensions
          ? preset.extensions.map((extension) => extension)
          : "",
    },
  };
}

export default async function Page({ params }: Props) {
  if (!params.slug) {
    notFound();
  }

  const preset = allPresets.find((preset) => preset.id === params.slug);

  if (!preset) {
    notFound();
  }

  const relatedPresets = allPresets
    .filter((p) => p.id !== preset.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);

  const models = await getAvailableAiModels();
  const extensions = await getExtensions({ extensionIds: preset.extensions || [] });
  return <PresetDetail preset={preset} relatedPresets={relatedPresets} models={models} extensions={extensions} />;
}

export async function generateStaticParams() {
  return allPresets.map((preset) => ({
    slug: preset.id,
  }));
}
