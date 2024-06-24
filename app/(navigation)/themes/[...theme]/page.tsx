import React from "react";
import { redirect } from "next/navigation";
import { Raycast } from "@themes/components/raycast";
import { BASE_URL } from "@themes/lib/url";
import { getAllThemes } from "@themes/lib/theme";
import { Desktop } from "@themes/components/desktop";
import { PageWithThemeMode } from "@themes/components/page-with-theme-mode";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { theme: [author: string, theme: string] };
}): Promise<Metadata> {
  const [author, themeName] = params.theme;

  const slug = `${author}/${themeName}`;
  const themes = await getAllThemes();
  const theme = themes.find((theme) => theme.slug === slug);

  if (!theme) {
    return {};
  }

  const { colors, ...restTheme } = theme;

  const queryParams = new URLSearchParams();
  Object.entries(restTheme).forEach(([key, value]) => queryParams.set(key, value));
  Object.entries(colors).forEach(([key, value]) => queryParams.set(key, value));

  const title = `${restTheme.name} by ${restTheme.author}`;
  const image = `${BASE_URL}/og?${queryParams}`;

  return {
    title,
    openGraph: {
      title,
      url: `/themes/${author}/${themeName}`,
      siteName: "Ray.so",
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@raycastapp",
      title,
      images: [
        {
          url: image,
        },
      ],
    },
  };
}

export default async function ThemePage({ params }: { params: { theme: [author: string, theme: string] } }) {
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
