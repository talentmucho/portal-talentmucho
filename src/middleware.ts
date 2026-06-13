import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

const PUBLIC_ROUTES = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const { supabase, supabaseResponse } = createClient(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const role =
    user?.app_metadata?.role || user?.user_metadata?.role || null;

  if (!user) {
    if (
      pathname === "/" ||
      pathname.startsWith("/participant") ||
      pathname.startsWith("/admin")
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return supabaseResponse;
  }

  if (PUBLIC_ROUTES.includes(pathname)) {
    const dest = role === "admin" ? "/admin" : "/participant";
    return NextResponse.redirect(new URL(dest, request.url));
  }

  if (pathname === "/") {
    const dest = role === "admin" ? "/admin" : "/participant";
    return NextResponse.redirect(new URL(dest, request.url));
  }

  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/participant", request.url));
  }

  // Lock specific sessions for non-admins. Empty = all sessions unlocked.
  // To re-lock, add session numbers here, e.g. [6, 7, 8, 9].
  if (role !== "admin") {
    const lockedSessions: number[] = [];
    for (const n of lockedSessions) {
      if (pathname.startsWith(`/participant/courses/cohort-1/session-${n}`)) {
        return NextResponse.redirect(new URL("/participant/courses/cohort-1/session-1", request.url));
      }
    }
  }

  if (pathname.startsWith("/participant") && role !== "participant") {
    // Admins can access course/lesson content
    if (role === "admin" && pathname.startsWith("/participant/courses")) {
      return supabaseResponse;
    }
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
