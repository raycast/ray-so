import Dub from "dub";
import { NextApiRequest, NextApiResponse } from "next";

const dub = new Dub({
  token: "0e7uX8DwmzNxmRalhRculkIh",
  projectSlug: "ray-so",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url: urlQuery } = req.query;

  const url = new URL(urlQuery as string);
  console.log(url);
  if (!url) {
    res.status(400).json({ error: "Missing URL" });
    return;
  }

  if (url.hostname === "ray.so" || url.hostname.includes("raycastapp.vercel.app") || url.hostname === "localhost") {
    const link = await dub.links.create({
      url: url.href,
      domain: "go.ray.so",
    });
    res.status(200).json({ link: `https://ray.so/${link.key}` });
    return;
  }

  res.status(400).json({ error: "Unable to shorten this link" });
}
