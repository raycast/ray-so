import { NextResponse } from "next/server";
import { LANGUAGES } from "../../../util/languages";
import { THEMES } from "../../../store/themes";
import { PADDING_OPTIONS } from "../../../store/padding";

export async function GET() {
  const languages = Object.entries(LANGUAGES).map(([key, { src, className, ...rest }]) => ({ id: key, ...rest }));
  const themes = Object.entries(THEMES)
    .filter((theme) => !["tailwind"].includes(theme[1].id))
    .map(([key, { syntax, icon, ...rest }]) => ({ ...rest }));
  const padding = PADDING_OPTIONS;
  return NextResponse.json({ languages, themes, padding });
}
