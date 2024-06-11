import { presets } from "../data";

export default function Page({ params }: { params: { slug: string } }) {
  return <div>My Preset: {params.slug}</div>;
}

export async function generateStaticParams() {
  return presets.map((preset) => ({
    slug: preset,
  }));
}
