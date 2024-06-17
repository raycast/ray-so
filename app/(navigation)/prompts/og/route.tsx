/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import { ImageResponse } from "@vercel/og";
import { RaycastLogoNegIcon } from "@raycast/icons";
import { CSSProperties } from "react";
import { Prompt } from "../prompts";
import { IconComponent } from "../../presets/components/Icons";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const hasTitle = searchParams.has("title");
    const title = hasTitle ? searchParams.get("title")?.slice(0, 100) : "";
    const description = searchParams.get("description") || "Raycast AI Prompt";
    const ellipsedDescription = description.length > 120 ? `${description.slice(0, 120)}...` : description;
    const icon = (searchParams.get("icon") || "stars") as Prompt["icon"];

    const interRegular = await fetch(new URL(`./Inter-Regular.ttf`, import.meta.url)).then((res) => res.arrayBuffer());
    const interSemiBold = await fetch(new URL(`./Inter-SemiBold.ttf`, import.meta.url)).then((res) =>
      res.arrayBuffer()
    );

    const bgImageData = await fetch(new URL(`./og-bg.png`, import.meta.url)).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: "black",
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <img
            width="1024"
            height="512"
            src={bgImageData as any}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              flex: 1,
            }}
          >
            {icon && (
              <div
                style={{
                  color: "white",
                  display: "flex",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "9999px",
                  backgroundImage: "radial-gradient(150.08% 117.14% at 31.25% 9.37%, #171717 0%, #000 100%)",
                  width: 110,
                  height: 110,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 24,
                }}
              >
                <IconComponent icon={icon} width={48} height={48} />
              </div>
            )}
            <div
              style={{
                fontSize: 68,
                fontStyle: "normal",
                letterSpacing: "-0.025em",
                color: "white",
                padding: "0 120px",
                lineHeight: 1.4,
                fontWeight: 600,
                whiteSpace: "nowrap",
                fontFamily: "Inter",
                textOverflow: "ellipsis",
                overflow: "hidden",
                maxWidth: "100%",
              }}
            >
              {title}
            </div>
            {description && (
              <div
                style={
                  {
                    display: "flex",
                    flexDirection: "row",
                    fontSize: 34,
                    color: "rgba(255, 255, 255, 0.60)",
                    marginTop: 16,
                    textAlign: "center",
                    lineHeight: 1.55,
                    fontFamily: "Inter",
                    paddingLeft: 70,
                    paddingRight: 70,
                    textWrap: "balance",
                    maxHeight: 105,
                    overflow: "hidden",
                  } as CSSProperties
                }
              >
                {ellipsedDescription}
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "white",
              fontSize: 30,
              fontWeight: 400,
              gap: 16,
              paddingBottom: 32,
            }}
          >
            <RaycastLogoNegIcon style={{ color: "#FF6362", width: 46, height: 46 }} /> By Raycast
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: interRegular,
            weight: 400,
            style: "normal",
          },
          {
            name: "Inter",
            data: interSemiBold,
            weight: 600,
            style: "normal",
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
