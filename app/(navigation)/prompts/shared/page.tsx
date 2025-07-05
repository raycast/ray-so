import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Shared } from "./shared";
import { Prompt } from "../prompts";
import { nanoid } from "nanoid";
import { getExtensions } from "@/api/store";
import { getExtensionIdsFromString } from "@/utils/getExtensionIdsFromString";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function parseURLPrompt(promptQueryString?: string | string[]): Prompt[] {
  if (!promptQueryString) {
    return [];
  }
  let prompts;
  if (Array.isArray(promptQueryString)) {
    prompts = promptQueryString;
  } else {
    prompts = [promptQueryString];
  }
  return prompts.map((prompt) => ({
    ...JSON.parse(prompt),
    id: nanoid(),
    isShared: true,
  }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const prompts = parseURLPrompt(searchParams.prompts as string);
  if (!prompts) {
    notFound();
  }

  if (prompts.length === 1) {
    const prompt = prompts[0];
    const pageTitle = `${prompt.title} - Raycast AI Prompt`;
    const pageDescription = "Raycast AI Prompt";
    const ogImage = `/prompts/og?title=${encodeURIComponent(prompt.title)}&icon=${prompt.icon}`;

    return {
      title: pageTitle,
      description: pageDescription,
      openGraph: {
        type: "website",
        url: "/prompts/shared",
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
      other: {
        "twitter:label1": "Model",
        "twitter:data": prompt.model || "openai-gpt-4o-mini",
        "twitter:label2": "Creativity",
        "twitter:data2": prompt.creativity || "none",
      },
    };
  } else {
    const pageTitle = `Raycast AI Prompts`;
    const pageDescription = `${prompts.length} shared prompts for Raycast AI`;
    const ogImageDescription = `"${prompts[0].title}" and ${prompts.length - 1} more ${
      prompts.length === 2 ? "prompt" : "prompts"
    }`;
    const ogImage = `/prompts/og?title=${encodeURIComponent(pageTitle)}&description=${encodeURIComponent(
      ogImageDescription,
    )}`;

    return {
      title: pageTitle,
      description: pageDescription,
      openGraph: {
        type: "website",
        url: "/prompts/shared",
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
  const prompts = parseURLPrompt(searchParams.prompts as string);
  if (!prompts) {
    notFound();
  }
  const extensionIds = prompts.flatMap((prompt) => getExtensionIdsFromString(prompt.prompt));
  const allExtensions = await getExtensions({ extensionIds });
  return <Shared prompts={prompts} extensions={allExtensions} />;
}
