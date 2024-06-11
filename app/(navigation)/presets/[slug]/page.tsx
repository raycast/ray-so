export default function Page({ params }: { params: { slug: string } }) {
  return <div>My Preset: {params.slug}</div>;
}

export const presets = ["hej", "hopp", "hurra"];

export async function generateStaticParams() {
  return presets.map((preset) => ({
    slug: preset,
  }));
}
