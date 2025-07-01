import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Shared } from "./shared";
import { Quicklink } from "../quicklinks";
import { nanoid } from "nanoid";
import { isValidLink } from "../utils/isValidLink";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function parseURLQuicklink(quicklinkQueryString?: string | string[]): Quicklink[] {
  if (!quicklinkQueryString) {
    return [];
  }
  let quicklinks;
  if (Array.isArray(quicklinkQueryString)) {
    quicklinks = quicklinkQueryString;
  } else {
    quicklinks = [quicklinkQueryString];
  }

  return quicklinks.map((quicklink) => ({
    ...JSON.parse(quicklink),
    icon: {
      name: JSON.parse(quicklink).iconName,
      link: JSON.parse(quicklink).iconUrl,
      invert: JSON.parse(quicklink).iconInvert,
    },
    id: nanoid(),
    isShared: true,
  }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const quicklinks = parseURLQuicklink(searchParams.quicklinks as string);
  if (!quicklinks) {
    notFound();
  }

  if (quicklinks.length === 1) {
    const quicklink = quicklinks[0];
    const pageTitle = `${quicklink.name} - Raycast Quicklink`;
    const pageDescription = "Raycast Quicklink";
    let iconUrl = "";
    const iconLink = quicklink?.icon?.link || quicklink.link;
    if (isValidLink(iconLink)) {
      const url = new URL(iconLink);
      const domain = url.hostname.replace("www.", "");
      iconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
    }
    const ogImage = `/quicklinks/og?name=${encodeURIComponent(quicklink.name)}${
      quicklink.description ? `&description=${encodeURIComponent(quicklink.description)}` : ""
    }${iconUrl ? `&iconUrl=${encodeURIComponent(iconUrl)}` : ""}${quicklink?.icon?.name ? `&iconName=${encodeURIComponent(quicklink?.icon?.name)}` : ""}`;

    return {
      title: pageTitle,
      description: pageDescription,
      openGraph: {
        type: "website",
        url: "/quicklinks/shared",
        title: pageTitle,
        description: pageDescription,
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
        description: pageDescription,
        images: [
          {
            url: ogImage,
          },
        ],
      },
    };
  } else {
    const pageTitle = `Raycast Quicklinks`;
    const pageDescription = `${quicklinks.length} shared quicklinks for Raycast`;
    const ogImageDescription = `"${quicklinks[0].name}" and ${quicklinks.length - 1} more ${
      quicklinks.length === 2 ? "quicklink" : "quicklinks"
    }`;
    const ogImage = `/quicklinks/og?name=${encodeURIComponent(pageTitle)}&description=${encodeURIComponent(
      ogImageDescription,
    )}`;

    return {
      title: pageTitle,
      description: pageDescription,
      openGraph: {
        type: "website",
        url: "/quicklinks/shared",
        title: pageTitle,
        description: pageDescription,
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
        description: pageDescription,
        images: [
          {
            url: ogImage,
          },
        ],
      },
    };
  }
}

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const quicklinks = parseURLQuicklink(searchParams.quicklinks as string);
  if (!quicklinks) {
    notFound();
  }
  return <Shared quicklinks={quicklinks} />;
}
