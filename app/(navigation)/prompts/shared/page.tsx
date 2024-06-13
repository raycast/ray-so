import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Shared } from "./shared";
import { Prompt } from "../prompts";
import { nanoid } from "nanoid";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
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

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const prompts = parseURLPrompt(searchParams.prompts as string);
  if (!prompts) {
    notFound();
  }

  if (prompts.length === 1) {
    const prompt = prompts[0];
    const pageTitle = `${prompt.title} - Raycast AI Prompt`;
    const pageDescription = "Raycast AI Prompt";

    return {
      title: pageTitle,
      description: pageDescription,
      openGraph: {
        title: pageTitle,
        description: pageDescription,
        images: [
          {
            url: `/prompts/og?title=${encodeURIComponent(prompt.title)}&icon=${prompt.icon}`,
          },
        ],
      },
      other: {
        "twitter:label1": "Model",
        "twitter:data": prompt.model || "openai-gpt-3.5-turbo",
        "twitter:label2": "Creativity",
        "twitter:data2": prompt.creativity,
      },
    };
  } else {
    const pageTitle = `Raycast AI Prompts`;
    const pageDescription = `${prompts.length} shared prompts for Raycast AI`;
    const ogImageDescription = `"${prompts[0].title}" and ${prompts.length - 1} more ${
      prompts.length === 2 ? "prompt" : "prompts"
    }`;

    return {
      title: pageTitle,
      description: pageDescription,
      openGraph: {
        title: pageTitle,
        description: pageDescription,
        images: [
          {
            url: `/prompts/og?title=${encodeURIComponent(pageTitle)}&description=${encodeURIComponent(
              ogImageDescription
            )}`,
          },
        ],
      },
    };
  }
}

export default async function Page({ params, searchParams }: Props) {
  const prompts = parseURLPrompt(searchParams.prompts as string);
  if (!prompts) {
    notFound();
  }
  return <Shared prompts={prompts} />;
}
