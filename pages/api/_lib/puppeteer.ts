import getOptions from "./options";
import puppeteer, { ScreenshotOptions } from "puppeteer";
import { InternalServerError, NotFoundError } from "./errors";

export async function getScreenshot(
  url: string,
  fileType: ScreenshotOptions["type"] = "png",
  isDev: boolean
) {
  const options = await getOptions(isDev);

  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  const response = await page.goto(url, { waitUntil: "domcontentloaded" });

  await page.evaluate(async () => {
    await document.fonts.ready;
  });

  if (response?.status() === 404) {
    throw new NotFoundError();
  } else if (response?.status() === 500) {
    throw new InternalServerError();
  }

  await page.waitForSelector("#frame");

  const bounds = (await page.evaluate(() => {
    return document.querySelector("#frame")?.getBoundingClientRect().toJSON();
  })) as ScreenshotOptions["clip"];

  if (!bounds) {
    throw new InternalServerError();
  }

  await page.setViewport({
    width: bounds.width,
    height: bounds.height,
    deviceScaleFactor: 2,
  });

  const screenshot = await page.screenshot({ type: fileType, clip: bounds });

  await browser.close();

  return screenshot;
}
