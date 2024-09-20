import { categories } from "@/app/(navigation)/quicklinks/quicklinks";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(categories);
}
