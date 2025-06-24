/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import { alpha } from "@themes/lib/alpha";
import { getAllThemes, Theme } from "@themes/lib/theme";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const assetsPromise = Promise.all([
  readFile(join(process.cwd(), "app/(navigation)/themes/assets/Inter-Regular.woff")),
  readFile(join(process.cwd(), "app/(navigation)/themes/assets/Inter-Medium.woff")),
  readFile(join(process.cwd(), "app/(navigation)/themes/assets/Inter-SemiBold.woff")),
  readFile(join(process.cwd(), "app/(navigation)/themes/assets/Inter-Bold.woff")),
  readFile(join(process.cwd(), "app/(navigation)/themes/assets/grid-item-1-light.jpg")),
  readFile(join(process.cwd(), "app/(navigation)/themes/assets/grid-item-2-light.jpg")),
  readFile(join(process.cwd(), "app/(navigation)/themes/assets/grid-item-3-light.jpg")),
  readFile(join(process.cwd(), "app/(navigation)/themes/assets/grid-item-4-light.jpg")),
  readFile(join(process.cwd(), "app/(navigation)/themes/assets/grid-item-5-light.jpg")),
  readFile(join(process.cwd(), "app/(navigation)/themes/assets/grid-item-1-dark.jpg")),
  readFile(join(process.cwd(), "app/(navigation)/themes/assets/grid-item-2-dark.jpg")),
  readFile(join(process.cwd(), "app/(navigation)/themes/assets/grid-item-3-dark.jpg")),
  readFile(join(process.cwd(), "app/(navigation)/themes/assets/grid-item-4-dark.jpg")),
  readFile(join(process.cwd(), "app/(navigation)/themes/assets/grid-item-5-dark.jpg")),
]);

export const alt = "Raycast Theme Preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export async function generateStaticParams() {
  const themes = await getAllThemes();
  return themes.map((theme) => {
    const [author, themeName] = theme.slug!.split("/");
    return {
      author,
      themeName,
    };
  });
}

export default async function Image({ params }: { params: Promise<{ author: string; themeName: string }> }) {
  const resolvedParams = await params;
  const { author, themeName } = resolvedParams;
  const slug = `${author}/${themeName}`;

  const themes = await getAllThemes();
  const theme = themes.find((t) => t.slug === slug);

  if (!theme) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            fontSize: 48,
          }}
        >
          Theme not found
        </div>
      ),
      { ...size },
    );
  }

  const [
    interData,
    inter500Data,
    inter600Data,
    inter700Data,
    lightGridImage1Data,
    lightGridImage2Data,
    lightGridImage3Data,
    lightGridImage4Data,
    lightGridImage5Data,
    darkGridImage1Data,
    darkGridImage2Data,
    darkGridImage3Data,
    darkGridImage4Data,
    darkGridImage5Data,
  ] = await assetsPromise;

  const images = {
    light: [
      `data:image/jpeg;base64,${lightGridImage1Data.toString("base64")}`,
      `data:image/jpeg;base64,${lightGridImage2Data.toString("base64")}`,
      `data:image/jpeg;base64,${lightGridImage3Data.toString("base64")}`,
      `data:image/jpeg;base64,${lightGridImage4Data.toString("base64")}`,
      `data:image/jpeg;base64,${lightGridImage5Data.toString("base64")}`,
    ],
    dark: [
      `data:image/jpeg;base64,${darkGridImage1Data.toString("base64")}`,
      `data:image/jpeg;base64,${darkGridImage2Data.toString("base64")}`,
      `data:image/jpeg;base64,${darkGridImage3Data.toString("base64")}`,
      `data:image/jpeg;base64,${darkGridImage4Data.toString("base64")}`,
      `data:image/jpeg;base64,${darkGridImage5Data.toString("base64")}`,
    ],
  };

  const isDarkTheme = theme.appearance === "dark";

  const tokens = {
    backgroundPrimary: `${theme.colors.background}`,
    backgroundPrimary200: `${theme.colors.background}${alpha["20"]}`,
    backgroundPrimary400: `${theme.colors.background}${alpha["40"]}`,
    backgroundSecondary: `${theme.colors.backgroundSecondary || theme.colors.background}`,
    backgroundSecondary200: theme.colors.backgroundSecondary
      ? `${theme.colors.backgroundSecondary}${alpha["20"]}`
      : `${theme.colors.background}${alpha["20"]}`,
    backgroundSecondary400: theme.colors.backgroundSecondary
      ? `${theme.colors.backgroundSecondary}${alpha["40"]}`
      : `${theme.colors.background}${alpha["40"]}`,
    border100: `${theme.colors.text}${alpha["10"]}`,
    border200: `${theme.colors.text}${alpha["20"]}`,
    text: `${theme.colors.text}`,
    text100: `${theme.colors.text}${alpha["10"]}`,
    text400: `${theme.colors.text}${alpha["40"]}`,
    text600: `${theme.colors.text}${alpha["60"]}`,
    loader: `${theme.colors.loader}`,
    selection: `${theme.colors.selection}`,
    selection100: `${theme.colors.selection}${alpha["10"]}`,
    green: `${theme.colors.green}`,
    green100: `${theme.colors.green}${alpha["15"]}`,
    yellow: `${theme.colors.yellow}`,
    yellow100: `${theme.colors.yellow}${alpha["15"]}`,
    red: `${theme.colors.red}`,
    red100: `${theme.colors.red}${alpha["15"]}`,
    orange: `${theme.colors.orange}`,
    orange100: `${theme.colors.orange}${alpha["15"]}`,
    blue: `${theme.colors.blue}`,
    blue100: `${theme.colors.blue}${alpha["15"]}`,
    purple: `${theme.colors.purple}`,
    purple100: `${theme.colors.purple}${alpha["15"]}`,
    magenta: `${theme.colors.magenta}`,
    magenta100: `${theme.colors.magenta}${alpha["15"]}`,
  };

  const tagStyle = {
    display: "flex",
    alignItems: "center",
    borderRadius: 4,
    padding: "3px 8px 4px",
    fontSize: "13px",
  };

  const gridCellStyle = {
    width: 138,
    height: 138,
    borderRadius: 8,
    overflow: "hidden",
    display: "flex",
  };

  const checkIcon = (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      x="80"
      y="80"
      alignmentBaseline="middle"
    >
      <path
        d="M10.25 5.75s-2.385 2.54-3 4.5l-1.5-1.5m8.5-.75a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );

  const raycastDarkIcon = (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width={28} height={28}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.502 10.037v1.46L1 7.996l.734-.728 2.768 2.77Zm1.461 1.46h-1.46L8.004 15l.73-.73-2.772-2.772ZM14.27 8.73 15 8 8.002 1l-.73.73 2.765 2.77H8.365l-1.93-1.93-.73.73 1.201 1.202H6.07v5.431h5.43v-.84l1.203 1.203.73-.73-1.932-1.933V5.961l2.77 2.768ZM4.868 4.134l-.73.73.783.784.73-.73-.783-.784Zm6.215 6.215-.728.73.784.783.73-.73-.786-.783ZM3.3 5.701l-.73.73 1.931 1.933V6.902l-1.2-1.2Zm5.797 5.797H7.636l1.932 1.932.73-.731-1.2-1.201Z"
        fill="currentColor"
      ></path>
    </svg>
  );

  const raycastLightIcon = (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width={28} height={28}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="m15 8-.73.73-2.77-2.77V4.5L15 8ZM8 1l-.73.73 2.77 2.769h1.46L8 1ZM6.433 2.57l-.73.73 1.201 1.203h1.46L6.434 2.57ZM11.5 7.636v1.461l1.202 1.202.73-.73L11.5 7.635Zm-.418 2.716.418-.418H6.068V4.5l-.418.418-.784-.784-.733.732.784.784-.418.418v.84L3.297 5.706l-.73.73L4.498 8.37v1.667L1.731 7.27 1 8l7 7 .73-.73-2.768-2.77h1.673l1.933 1.933.73-.73L9.098 11.5h.84l.418-.418.784.784.73-.73-.787-.784Z"
        fill="currentColor"
      ></path>
    </svg>
  );

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          width: "100%",
          height: "100%",
          alignItems: "flex-start",
          overflow: "hidden",
          backgroundColor: isDarkTheme ? "rgb(0,0,0)" : "white",
          paddingTop: 40,
        }}
      >
        <div
          style={{
            borderRadius: "12px",
            border: "1px solid",
            borderColor: tokens.border200,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "stretch",
            overflow: "hidden",
            flexShrink: 0,
            margin: "0 auto",
            transform: "scale(1.4)",
            transformOrigin: "top",

            backgroundColor: isDarkTheme ? "rgba(128, 128, 128, 0.2)" : "rgba(255, 255, 255, 0.2)",
            backgroundImage: `linear-gradient(to bottom, ${tokens.backgroundPrimary400}, ${tokens.backgroundSecondary400} 70%)`,

            width: 750,
            height: 475,

            boxShadow: isDarkTheme ? "0px 0px 29px 10px rgba(0,0,0,.06)" : "0px 0px 29px 10px rgba(0,0,0,.06)",
          }}
        >
          <header
            style={{
              height: "52px",
              paddingLeft: "16px",
              paddingRight: "16px",
              borderStyle: "solid",
              borderBottomWidth: "1px",
              borderBottomColor: tokens.border100,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              position: "relative",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "6px",
                backgroundColor: tokens.text100,
                color: tokens.text,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
                <path
                  d="M6.25 4.75L2.75 8M2.75 8L6.25 11.25M2.75 8H13.25"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div
              style={{
                width: "100%",
                lineHeight: "1",
                backgroundColor: "transparent",
                border: "none",
                fontSize: "16px",
                marginLeft: "10px",
                color: tokens.text400,
              }}
            >
              Search for apps and commands...
            </div>
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: "35%",
                width: "30%",
                height: "1px",
                backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0), ${tokens.loader}, rgba(255, 255, 255, 0))`,
              }}
            ></div>
          </header>

          <main
            style={{
              display: "flex",
              flexDirection: "column",
              flex: "1",
              overflow: "hidden",
              paddingTop: "4px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "4px 8px",
                color: tokens.text,
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "8px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  letterSpacing: "0.1px",
                  color: tokens.text600,
                }}
              >
                List
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: "40px",
                  padding: "8px",
                  borderRadius: "8px",
                  backgroundColor: tokens.selection100,
                }}
              >
                <div style={{ display: "flex", marginRight: "10px" }}>{checkIcon}</div>
                <div
                  style={{
                    fontSize: "13px",
                    lineHeight: 1,
                    color: tokens.text,
                    flex: 1,
                  }}
                >
                  Primary Text
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <span
                    style={{
                      ...tagStyle,
                      color: tokens.red,
                      backgroundColor: tokens.red100,
                    }}
                  >
                    Red
                  </span>
                  <span
                    style={{
                      ...tagStyle,
                      color: tokens.orange,
                      backgroundColor: tokens.orange100,
                    }}
                  >
                    Orange
                  </span>
                  <span
                    style={{
                      ...tagStyle,
                      color: tokens.blue,
                      backgroundColor: tokens.blue100,
                    }}
                  >
                    Blue
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "40px",
                  padding: "8px",
                  borderRadius: "8px",
                }}
              >
                <div style={{ display: "flex", marginRight: "10px" }}>{checkIcon}</div>
                <div
                  style={{
                    fontSize: "13px",
                    color: tokens.text600,
                    flex: 1,
                  }}
                >
                  Primary Text
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <span
                    style={{
                      ...tagStyle,
                      color: tokens.green,
                      backgroundColor: tokens.green100,
                    }}
                  >
                    Green
                  </span>
                  <span
                    style={{
                      ...tagStyle,
                      color: tokens.yellow,
                      backgroundColor: tokens.yellow100,
                    }}
                  >
                    Yellow
                  </span>
                  <span
                    style={{
                      ...tagStyle,
                      color: tokens.purple,
                      backgroundColor: tokens.purple100,
                    }}
                  >
                    Purple
                  </span>
                  <span
                    style={{
                      ...tagStyle,
                      color: tokens.magenta,
                      backgroundColor: tokens.magenta100,
                    }}
                  >
                    Magenta
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "4px 8px",
                color: tokens.text,
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "8px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  letterSpacing: "0.1px",
                  color: tokens.text600,
                }}
              >
                Grid
              </div>

              <div style={{ display: "flex", gap: 8, padding: "0 8px" }}>
                <div style={gridCellStyle}>
                  <img src={images[theme.appearance][0]} />
                </div>
                <div style={gridCellStyle}>
                  <img src={images[theme.appearance][1]} />
                </div>
                <div style={gridCellStyle}>
                  <img src={images[theme.appearance][2]} />
                </div>
                <div style={gridCellStyle}>
                  <img src={images[theme.appearance][3]} />
                </div>
                <div style={gridCellStyle}>
                  <img src={images[theme.appearance][4]} />
                </div>
              </div>
            </div>
          </main>
        </div>

        <div
          style={{
            height: 400,
            position: "absolute",
            bottom: 0,
            left: 0,
            zIndex: 1,
            width: "100%",
            backgroundImage: `linear-gradient(to bottom, ${isDarkTheme ? "rgba(0,0,0,0)" : "rgba(255,255,255,0)"}, ${
              isDarkTheme ? "black" : "white"
            } 90%)`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            padding: 30,
          }}
        />
        <div
          style={{
            height: 400,
            position: "absolute",
            bottom: 0,
            left: 0,
            zIndex: 2,
            width: "100%",
            backgroundImage: `linear-gradient(to bottom, ${isDarkTheme ? "rgba(0,0,0,0)" : "rgba(255,255,255,0)"}, ${
              tokens.backgroundSecondary400
            } 90%)`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            padding: 30,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              alignItems: "flex-start",
              gap: 8,
            }}
          >
            <span
              style={{
                flexShrink: 0,
                color: tokens.text,
                fontSize: 40,
                fontWeight: 700,
              }}
            >
              {theme.name}
            </span>
            <span
              style={{
                color: tokens.text600,
                fontWeight: 500,
                fontSize: 16,
              }}
            >
              ray.so/themes{theme.slug ? `/${theme.slug}` : ""}
            </span>
          </div>

          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              color: tokens.text,
              fontSize: 16,
            }}
          >
            <span style={{ color: tokens.text600 }}>Built by</span> {isDarkTheme ? raycastDarkIcon : raycastLightIcon}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: interData, weight: 400, style: "normal" },
        { name: "Inter", data: inter500Data, weight: 500, style: "normal" },
        { name: "Inter", data: inter600Data, weight: 600, style: "normal" },
        { name: "Inter", data: inter700Data, weight: 700, style: "normal" },
      ],
    },
  );
}
