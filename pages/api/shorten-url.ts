import Dub from "dub";
import { NextApiRequest, NextApiResponse } from "next";

const dub = new Dub({
  token: "0e7uX8DwmzNxmRalhRculkIh",
  projectSlug: "ray-so",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (!url) {
    res.status(400).json({ error: "Missing URL" });
    return;
  }

  if (url.includes("ray.so") || url.includes("ray-so-v2") || url.includes("localhost")) {
    const link = await dub.links.create({
      url: url as string,
      domain: "go.ray.so",
    });
    res.status(200).json({ link: `https://ray.so/${link.key}` });
    return;
  }

  res.status(400).json({ error: "Unable to shorten this link" });
}
