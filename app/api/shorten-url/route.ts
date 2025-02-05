import { NextRequest, NextResponse } from "next/server";
import { Dub } from "dub";

export const runtime = "edge";

const dub = new Dub({
  token: process.env.DUB_TOKEN,
});

const tagIdsByRef = {
  codeImage: "clsokhlen0001kz0gxlqfgpp0",
  snippets: "clsokhqzy0003kz0gxdhcycue",
  prompts: "clsokhzja0006kz0g64z47gfr",
  themes: "clsoki8190008kz0gzajzalh7",
  icons: "cltyfpaho0001lwxwdcd93mkc",
  presets: "clu9ko3n300068tq0zhk7bc7f",
  quicklinks: "cm0qhn6fo000w3dl1i22hcgoz",
  desktopClient: "tag_LmjLVKbcZB45xNbcgNPLV0Hh",
};

export type refProps = keyof typeof tagIdsByRef;

const getTagId = (ref: refProps) => {
  return ref ? tagIdsByRef[ref] : undefined;
};

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const urlQuery = searchParams.get("url");
  const refQuery = searchParams.get("ref");

  const url = new URL(urlQuery as string);
  const tagId = getTagId(refQuery as refProps);

  if (!url) {
    return NextResponse.json({ error: "Missing URL" });
  }

  if (!refQuery) {
    return NextResponse.json({ error: "Missing ref" });
  }

  if (!tagId) {
    return NextResponse.json({ error: "Invalid ref" });
  }

  if (
    url.hostname.endsWith("ray.so") ||
    url.hostname.includes("raycastapp.vercel.app") ||
    url.hostname === "localhost"
  ) {
    const link = await dub.links.create({
      url: url.href,
      domain: "go.ray.so",
      tagIds: [tagId],
    });
    return NextResponse.json({ link: `https://ray.so/${link.key}` });
  }

  return NextResponse.json({ error: "Unable to shorten this link" }, { status: 400 });
}
