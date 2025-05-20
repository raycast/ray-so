import { Desktop } from "@themes/components/desktop";
import { PageWithThemeMode } from "@themes/components/page-with-theme-mode";
import { Raycast } from "@themes/components/raycast";
import { RedirectToRaycast } from "@themes/components/redirect-to-raycast";
import { Theme, getAllThemes, makeThemeObjectFromParams } from "@themes/lib/theme";
import { BASE_URL } from "@/utils/common";
import defaultOgImage from "@themes/assets/default-og-image.png";

export async function generateMetadata(props: { searchParams: Promise<{ [key: string]: string }> }) {
  const searchParams = await props.searchParams;
  const themeInUrl = makeThemeObjectFromParams(searchParams);

  if (!themeInUrl) {
    return {
      openGraph: {
        images: [
          {
            url: defaultOgImage.src,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        images: [
          {
            url: defaultOgImage.src,
          },
        ],
      },
    };
  }

  const { colors, ...theme } = themeInUrl;

  const queryParams = new URLSearchParams();
  Object.entries(theme).forEach(([key, value]) => queryParams.set(key, value));
  Object.entries(colors).forEach(([key, value]) => queryParams.set(key, value));

  const title = theme.author ? `${theme.name} by ${theme.author}` : theme.name;
  const image = `${BASE_URL}/themes/og?${queryParams}`;

  return {
    title,
    openGraph: {
      title,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [
        {
          url: image,
        },
      ],
    },
  };
}

export default async function Home(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const themes = await getAllThemes();
  const defaultTheme = themes.filter((theme) => theme.appearance === "dark")[0];

  let themeInUrl: Theme | undefined = undefined;
  let shouldOpenInRaycast: boolean = false;

  if (searchParams) {
    themeInUrl = makeThemeObjectFromParams(searchParams);
    shouldOpenInRaycast = "addToRaycast" in searchParams;
  }

  return (
    <PageWithThemeMode theme={themeInUrl || defaultTheme}>
      <Desktop>
        <Raycast />
      </Desktop>

      {shouldOpenInRaycast && themeInUrl && <RedirectToRaycast theme={themeInUrl} />}
    </PageWithThemeMode>
  );
}
