import { NextRequest, NextResponse } from "next/server";
import Dub from "dub";

export const runtime = "edge";

const dub = new Dub({
  token: "0e7uX8DwmzNxmRalhRculkIh",
  projectSlug: "ray-so",
});

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const urlQuery = searchParams.get("url");

  const url = new URL(urlQuery as string);

  if (!url) {
    return NextResponse.json({ error: "Missing URL" });
  }

  if (
    url.hostname.endsWith("ray.so") ||
    url.hostname.includes("raycastapp.vercel.app") ||
    url.hostname === "localhost"
  ) {
    const link = await dub.links.create({
      url: url.href,
      domain: "go.ray.so",
    });
    return NextResponse.json({ link: `https://ray.so/${link.key}` });
  }

  return NextResponse.json({ error: "Unable to shorten this link" }, { status: 400 });
}
