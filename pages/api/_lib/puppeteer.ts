import getOptions from "./options";
import puppeteer, { ScreenshotOptions } from "puppeteer";
import { InternalServerError, NotFoundError } from "./errors";

export async function getScreenshot(
  url: string,
  fileType: ScreenshotOptions["type"] = "png",
  isDev: boolean
) {
  const options = await getOptions(isDev);

  console.info(options);

  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  const response = await page.goto(url, { waitUntil: "domcontentloaded" });

  console.info("here we go");

  console.time("fonts");
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  console.timeEnd("fonts");

  console.info("fonts ready");

  if (response?.status() === 404) {
    throw new NotFoundError();
  } else if (response?.status() === 500) {
    throw new InternalServerError();
  }

  console.time("frame ready");
  await page.waitForSelector("#frame");
  console.timeEnd("frame ready");

  console.time("bounds");
  const bounds = (await page.evaluate(() => {
    return document.querySelector("#frame")?.getBoundingClientRect().toJSON();
  })) as ScreenshotOptions["clip"];

  if (!bounds) {
    throw new InternalServerError();
  }
  console.timeEnd("bounds");

  await page.setViewport({
    width: bounds.width,
    height: bounds.height,
    deviceScaleFactor: 2,
  });

  console.info("getting screenshot");
  const screenshot = await page.screenshot({ type: fileType, clip: bounds });

  await browser.close();

  return screenshot;
}
