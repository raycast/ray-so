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

// requestHostname covers preview deployments: they may only shorten links
// pointing to themselves, so no *.vercel.app wildcard is needed.
function isAllowedHostname(hostname: string, requestHostname: string) {
  return (
    hostname === "ray.so" || hostname.endsWith(".ray.so") || hostname === "localhost" || hostname === requestHostname
  );
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const urlQuery = searchParams.get("url");
  const refQuery = searchParams.get("ref");

  if (!urlQuery) {
    return NextResponse.json({ error: "Missing URL" }, { status: 400 });
  }

  if (!refQuery) {
    return NextResponse.json({ error: "Missing ref" }, { status: 400 });
  }

  const tagId = getTagId(refQuery as refProps);

  if (!tagId) {
    return NextResponse.json({ error: "Invalid ref" }, { status: 400 });
  }

  let url: URL;
  try {
    url = new URL(urlQuery);
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  if (!isAllowedHostname(url.hostname, req.nextUrl.hostname)) {
    return NextResponse.json({ error: "Unable to shorten this link" }, { status: 400 });
  }

  try {
    const link = await dub.links.create({
      url: url.href,
      domain: "go.ray.so",
      tagIds: [tagId],
    });
    return NextResponse.json({ link: `https://ray.so/${link.key}` });
  } catch {
    return NextResponse.json({ error: "Unable to shorten this link" }, { status: 500 });
  }
}
