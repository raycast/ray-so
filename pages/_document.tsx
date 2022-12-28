import { useAtom } from "jotai";
import { Html, Head, Main, NextScript } from "next/document";

import { darkModeAtom } from "../store/themes";

export default function Document() {
  const [darkMode] = useAtom(darkModeAtom);

  return (
    <Html>
      <Head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=JetBrains+Mono:wght@500&display=swap"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
      </Head>
      <body data-theme={darkMode ? "dark" : "light"}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
