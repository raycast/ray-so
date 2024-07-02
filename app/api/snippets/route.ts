import { snippetGroups } from "@snippets/snippets";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(snippetGroups);
}
