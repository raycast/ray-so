import { notFound } from "next/navigation";
import { allPresets } from "../../presets";
import { getAvailableAiModels } from "../../api";
import { PresetDetail } from "../../components/PresetDetail";
import { Metadata, ResolvingMetadata } from "next";

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

  return {
    title: pageTitle,
    description: preset.description,
    openGraph: {
      title: pageTitle,
      description: preset.description,
      images: [
        {
          url: `/presets/og?title=${encodeURIComponent(preset.name)}&description=${encodeURIComponent(
            preset.description || ""
          )}&icon=${preset.icon}`,
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

  return <PresetDetail preset={preset} relatedPresets={relatedPresets} models={models} />;
}

export async function generateStaticParams() {
  return allPresets.map((preset) => ({
    slug: preset.id,
  }));
}
