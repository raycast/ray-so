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

// deno-lint-ignore no-explicit-any
export const BASE_URL = {
  development: "http://localhost:3000",
  preview: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`,
  production: "https://www.ray.so",
}[process.env.NEXT_PUBLIC_VERCEL_ENV || "development"] as string;

export async function shortenUrl(url: string, ref: refProps) {
  const response = await fetch(`${BASE_URL}/api/shorten-url?url=${encodeURIComponent(url)}&ref=${ref}`).then((res) =>
    res.json(),
  );

  if (response.link) {
    return response.link as string;
  }

  console.error("Failed to shorten URL", response);

  throw new Error("Unable to shorten this link");
}
