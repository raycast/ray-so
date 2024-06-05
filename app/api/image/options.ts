const chromium = require("chrome-aws-lambda");

const exePath =
  process.platform === "win32"
    ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
    : process.platform === "linux"
    ? "/usr/bin/google-chrome"
    : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

export default async function getOptions(isDev: boolean) {
  if (isDev) {
    return {
      args: [],
      executablePath: exePath,
      headless: true,
      ignoreHTTPSErrors: true,
    };
  } else {
    return {
      args: ["--disable-dev-shm-usage", ...chromium.args],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    };
  }
}
