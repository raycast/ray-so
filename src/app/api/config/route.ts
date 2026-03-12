import { NextResponse } from "next/server";
import { LANGUAGES } from "@code/util/languages";
import { PADDING_OPTIONS } from "@code/store/padding";
import { THEMES } from "@/app/(navigation)/(code)/constants/themes";

export async function GET() {
  const languages = Object.entries(LANGUAGES).map(([key, { src, ...rest }]) => ({ id: key, ...rest }));
  const themes = Object.entries(THEMES).map(([key, { syntax, icon, ...rest }]) => ({ ...rest }));
  const padding = PADDING_OPTIONS;
  return NextResponse.json({ languages, themes, padding });
}
