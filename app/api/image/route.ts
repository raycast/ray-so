import { NextRequest } from "next/server";
import puppeteer, { ScreenshotOptions } from "puppeteer";
import getOptions from "./options";
import { InternalServerError, NotFoundError } from "./errors";

const isDev = !process.env.AWS_REGION;

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.toString();

  const fileType = "png";
  let url;
  if (isDev) {
    url = `http://localhost:3000/image#${q}`;
  } else {
    url = `https://ray.so/image#${q}`;
  }

  try {
    console.time("taking screenshot");
    const options = await getOptions(isDev);
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 4 });
    const response = await page.goto(url);

    console.time("fonts");
    await page.evaluate(async () => {
      await document.fonts.ready;
    });
    console.timeEnd("fonts");

    if (response?.status() === 404) {
      throw new NotFoundError();
    } else if (response?.status() === 500) {
      throw new InternalServerError();
    }

    console.time("frame ready");
    await page.waitForSelector(".shiki");
    console.timeEnd("frame ready");

    console.time("bounds");
    const bounds = (await page.evaluate(() => {
      return document.querySelector("#frame")?.getBoundingClientRect().toJSON();
    })) as ScreenshotOptions["clip"];

    if (!bounds) {
      throw new InternalServerError();
    }
    console.timeEnd("bounds");

    console.info("getting screenshot");
    const screenshot = await page.screenshot({ type: fileType, clip: bounds });
    console.timeEnd("taking screenshot");

    return new Response(screenshot, {
      status: 200,
      headers: {
        "Content-Type": `image/${fileType}`,
      },
    });
  } catch (err) {
    if (err instanceof NotFoundError) {
      return new Response("404", { status: 404 });
    } else {
      console.error(err);
      return new Response("500", { status: 500 });
    }
  }
}
