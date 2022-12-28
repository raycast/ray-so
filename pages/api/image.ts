import { getScreenshot } from "./_lib/puppeteer";
import { NotFoundError } from "./_lib/errors";
import { NextApiRequest, NextApiResponse } from "next";

const isDev = !process.env.AWS_REGION;

const image = async (req: NextApiRequest, res: NextApiResponse) => {
  const q = new URLSearchParams(req.query as Record<string, string>).toString();
  const fileType = "png";
  let url;
  if (isDev) {
    url = `http://localhost:3000/image#${q}`;
  } else {
    url = `https://ray.so/image#${q}`;
  }

  console.time("getting screenshot");
  try {
    const file = await getScreenshot(url, fileType, isDev);

    res.statusCode = 200;
    res.setHeader("Content-Type", `image/${fileType}`);
    // res.setHeader(
    //   "Cache-Control",
    //   `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
    // );
    res.end(file);
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.statusCode = 404;
      res.end("404");
    } else {
      console.error(err);
      res.statusCode = 500;
      res.end("500");
    }
  }
  console.timeEnd("getting screenshot");
};

export default image;
