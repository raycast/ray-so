import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that are disabled - redirect to home (code image generator)
// Remove routes from this array to re-enable them
const disabledRoutes = ["/icon", "/prompts", "/presets", "/quicklinks", "/snippets", "/themes"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path starts with any disabled route
  const isDisabledRoute = disabledRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  if (isDisabledRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Match all routes except static files and api routes
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
