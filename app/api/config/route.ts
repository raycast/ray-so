import { NextResponse } from "next/server";
import { LANGUAGES } from "@code/util/languages";
import { THEMES } from "@code/store/themes";
import { PADDING_OPTIONS } from "@code/store/padding";

export async function GET() {
  const languages = Object.entries(LANGUAGES).map(([key, { src, className, ...rest }]) => ({ id: key, ...rest }));
  const themes = Object.entries(THEMES).map(([key, { syntax, icon, ...rest }]) => ({ ...rest }));
  const padding = PADDING_OPTIONS;
  return NextResponse.json({ languages, themes, padding });
}
