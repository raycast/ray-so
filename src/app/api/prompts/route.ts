import { NextResponse } from "next/server";
import { baseCategories } from "@prompts/prompts";

export async function GET() {
  return NextResponse.json(baseCategories);
}
