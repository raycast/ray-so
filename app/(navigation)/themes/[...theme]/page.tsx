import React from "react";
import { redirect } from "next/navigation";
import { Raycast } from "@themes/components/raycast";
import { getAllThemes } from "@themes/lib/theme";
import { Desktop } from "@themes/components/desktop";
import { PageWithThemeMode } from "@themes/components/page-with-theme-mode";
import { Metadata } from "next";
import { BASE_URL } from "@/utils/common";

export async function generateMetadata(props: {
  params: Promise<{ theme: [author: string, theme: string] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const [author, themeName] = params.theme;

  const slug = `${author}/${themeName}`;
  const themes = await getAllThemes();
  const theme = themes.find((theme) => theme.slug === slug);

  if (!theme) {
    return {};
  }

  const title = `${theme.name} by ${theme.author}`;
  const image = `${BASE_URL}/themes/${theme.slug}/opengraph-image`;

  return {
    title,
    openGraph: {
      title,
      url: `/themes/${author}/${themeName}`,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      title,
      images: [
        {
          url: image,
        },
      ],
    },
  };
}

export default async function ThemePage(props: { params: Promise<{ theme: [author: string, theme: string] }> }) {
  const params = await props.params;
  const [author, themeName] = params.theme;
  const slug = `${author}/${themeName}`;
  const themes = await getAllThemes();
  const theme = themes.find((theme) => theme.slug === slug);

  if (!theme) {
    redirect("/");
  }

  return (
    <PageWithThemeMode theme={theme}>
      <Desktop>
        <Raycast />
      </Desktop>
    </PageWithThemeMode>
  );
}
