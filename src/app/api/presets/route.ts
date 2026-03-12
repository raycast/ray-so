import { categories } from "@presets/presets";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(categories);
}
