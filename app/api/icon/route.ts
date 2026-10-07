import { NextRequest, NextResponse } from "next/server";
import { SettingsType } from "@icon/lib/types";
import { Icons, IconName } from "@raycast/icons";

// Default settings for icon generation
const DEFAULT_SETTINGS: SettingsType = {
  backgroundFillType: "Linear",
  backgroundStartColor: "#FF6363",
  backgroundEndColor: "#FFA07A",
  backgroundAngle: 45,
  backgroundPosition: "50%,50%",
  backgroundSpread: 80,
  backgroundRadius: 128,
  backgroundStrokeSize: 0,
  backgroundStrokeColor: "#000000",
  backgroundStrokeOpacity: 100,
  backgroundRadialGlare: false,
  backgroundNoiseTexture: false,
  backgroundNoiseTextureOpacity: 50,
  iconColor: "#FFFFFF",
  iconSize: 256,
  iconOffsetX: 0,
  iconOffsetY: 0,
  icon: "Raycast" as IconName,
  fileName: "icon",
  selectedPresetIndex: null,
};

function parseQueryParam(value: string | null, defaultValue: any, type: "string" | "number" | "boolean" = "string") {
  if (value === null) return defaultValue;

  if (type === "number") {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? defaultValue : parsed;
  }

  if (type === "boolean") {
    return value === "true" || value === "1";
  }

  return value;
}

function generateSVG(settings: SettingsType, size: number, iconName: string): string {
  const strokeSize = settings.backgroundStrokeSize;
  const strokeWidth = isNaN(parseInt(strokeSize.toString())) ? 0 : parseInt(strokeSize.toString());

  const rectId = `rect-${Date.now()}`;
  const gradientId = `gradient-${Date.now()}`;
  const radialGlareGradientId = `radial-glare-${Date.now()}`;
  const gradientX = settings.backgroundPosition?.split(",")[0] || "50%";
  const gradientY = settings.backgroundPosition?.split(",")[1] || "50%";

  // Get icon SVG content
  const IconComponent = Icons[iconName as keyof typeof Icons];
  let iconSvg = "";

  if (IconComponent) {
    // Create a temporary SVG to extract the icon path
    const tempDiv = { __html: "" };
    try {
      // Most Raycast icons are simple SVG paths, we'll use a placeholder approach
      iconSvg = `<g transform="translate(${(size - settings.iconSize) / 2 + +settings.iconOffsetX}, ${(size - settings.iconSize) / 2 + +settings.iconOffsetY})">
        <svg width="${settings.iconSize}" height="${settings.iconSize}" viewBox="0 0 16 16" fill="${settings.iconColor}" xmlns="http://www.w3.org/2000/svg">
          <!-- Icon placeholder - actual icon rendering requires client-side -->
          <circle cx="8" cy="8" r="6" fill="${settings.iconColor}" />
        </svg>
      </g>`;
    } catch (e) {
      // Fallback to a simple circle
      iconSvg = `<circle cx="${size / 2 + +settings.iconOffsetX}" cy="${size / 2 + +settings.iconOffsetY}" r="${settings.iconSize / 3}" fill="${settings.iconColor}" />`;
    }
  }

  // Build gradient definition
  let gradientDef = "";
  if (settings.backgroundFillType === "Radial") {
    gradientDef = `
      <radialGradient id="${gradientId}" cx="50%" cy="50%" r="100%" fx="${gradientX}" fy="${gradientY}" gradientUnits="objectBoundingBox">
        <stop stop-color="${settings.backgroundStartColor}" />
        <stop offset="${settings.backgroundSpread / 100}" stop-color="${settings.backgroundEndColor}" />
      </radialGradient>`;
  } else if (settings.backgroundFillType === "Linear") {
    gradientDef = `
      <linearGradient id="${gradientId}" gradientUnits="userSpaceOnUse" gradientTransform="rotate(${settings.backgroundAngle})" style="transform-origin: center">
        <stop stop-color="${settings.backgroundStartColor}" />
        <stop offset="1" stop-color="${settings.backgroundEndColor}" />
      </linearGradient>`;
  }

  const radialGlareDef = `
    <radialGradient id="${radialGlareGradientId}" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(${size / 2}) rotate(90) scale(${size})">
      <stop stop-color="white" />
      <stop offset="1" stop-color="white" stop-opacity="0" />
    </radialGradient>`;

  const fillValue = settings.backgroundFillType === "Solid" ? settings.backgroundStartColor : `url(#${gradientId})`;

  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ${gradientDef}
    ${radialGlareDef}
  </defs>
  <rect id="${rectId}" width="${size - strokeSize}" height="${size - strokeSize}" x="${strokeSize / 2}" y="${strokeSize / 2}" rx="${settings.backgroundRadius}" fill="${fillValue}" stroke="${settings.backgroundStrokeColor}" stroke-width="${strokeWidth}" stroke-opacity="${settings.backgroundStrokeOpacity}%" paint-order="stroke" />
  ${settings.backgroundRadialGlare ? `<rect width="${size - strokeSize}" height="${size - strokeSize}" x="${strokeSize / 2}" y="${strokeSize / 2}" fill="url(#${radialGlareGradientId})" rx="${settings.backgroundRadius}" style="mix-blend-mode: overlay" />` : ""}
  <clipPath id="clip">
    <use href="#${rectId}" />
  </clipPath>
  ${iconSvg}
</svg>`;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse all settings from query parameters
    const settings: SettingsType = {
      backgroundFillType: parseQueryParam(searchParams.get("backgroundFillType"), DEFAULT_SETTINGS.backgroundFillType),
      backgroundStartColor: parseQueryParam(
        searchParams.get("backgroundStartColor"),
        DEFAULT_SETTINGS.backgroundStartColor,
      ),
      backgroundEndColor: parseQueryParam(searchParams.get("backgroundEndColor"), DEFAULT_SETTINGS.backgroundEndColor),
      backgroundAngle: parseQueryParam(searchParams.get("backgroundAngle"), DEFAULT_SETTINGS.backgroundAngle, "number"),
      backgroundPosition: parseQueryParam(searchParams.get("backgroundPosition"), DEFAULT_SETTINGS.backgroundPosition),
      backgroundSpread: parseQueryParam(
        searchParams.get("backgroundSpread"),
        DEFAULT_SETTINGS.backgroundSpread,
        "number",
      ),
      backgroundRadius: parseQueryParam(
        searchParams.get("backgroundRadius"),
        DEFAULT_SETTINGS.backgroundRadius,
        "number",
      ),
      backgroundStrokeSize: parseQueryParam(
        searchParams.get("backgroundStrokeSize"),
        DEFAULT_SETTINGS.backgroundStrokeSize,
        "number",
      ),
      backgroundStrokeColor: parseQueryParam(
        searchParams.get("backgroundStrokeColor"),
        DEFAULT_SETTINGS.backgroundStrokeColor,
      ),
      backgroundStrokeOpacity: parseQueryParam(
        searchParams.get("backgroundStrokeOpacity"),
        DEFAULT_SETTINGS.backgroundStrokeOpacity,
        "number",
      ),
      backgroundRadialGlare: parseQueryParam(
        searchParams.get("backgroundRadialGlare"),
        DEFAULT_SETTINGS.backgroundRadialGlare,
        "boolean",
      ),
      backgroundNoiseTexture: parseQueryParam(
        searchParams.get("backgroundNoiseTexture"),
        DEFAULT_SETTINGS.backgroundNoiseTexture,
        "boolean",
      ),
      backgroundNoiseTextureOpacity: parseQueryParam(
        searchParams.get("backgroundNoiseTextureOpacity"),
        DEFAULT_SETTINGS.backgroundNoiseTextureOpacity,
        "number",
      ),
      iconColor: parseQueryParam(searchParams.get("iconColor"), DEFAULT_SETTINGS.iconColor),
      iconSize: parseQueryParam(searchParams.get("iconSize"), DEFAULT_SETTINGS.iconSize, "number"),
      iconOffsetX: parseQueryParam(searchParams.get("iconOffsetX"), DEFAULT_SETTINGS.iconOffsetX, "number"),
      iconOffsetY: parseQueryParam(searchParams.get("iconOffsetY"), DEFAULT_SETTINGS.iconOffsetY, "number"),
      icon: parseQueryParam(searchParams.get("icon"), DEFAULT_SETTINGS.icon) as IconName,
      fileName: parseQueryParam(searchParams.get("fileName"), DEFAULT_SETTINGS.fileName),
      selectedPresetIndex: null,
    };

    // Get the icon name
    const iconName = settings.icon || "Dots";

    // Check if icon exists
    const availableIcons = Object.keys(Icons);
    if (!availableIcons.includes(iconName)) {
      return NextResponse.json(
        {
          error: `Icon "${iconName}" not found`,
          availableIcons: availableIcons.slice(0, 10),
          totalIcons: availableIcons.length,
        },
        { status: 400 },
      );
    }

    // Get size from query params
    const size = parseQueryParam(searchParams.get("size"), 512, "number");

    // Generate the SVG
    const svgString = generateSVG(settings, size, iconName);

    // Return SVG
    return new NextResponse(svgString, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error generating icon:", error);
    return NextResponse.json(
      { error: "Failed to generate icon", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}
