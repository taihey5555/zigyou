import { NextResponse, type NextRequest } from "next/server";
import { createMiddlewareClient } from "@/lib/supabase/middleware";

function getAdminEmailSet() {
  const raw = process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || "";
  return new Set(
    raw
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
  );
}

export async function middleware(request: NextRequest) {
  const { supabase, response } = createMiddlewareClient(request);
  const { data } = await supabase.auth.getUser();

  if (request.nextUrl.pathname.startsWith("/admin")) {
    const isLogin = request.nextUrl.pathname.startsWith("/admin/login");
    if (!data.user && !isLogin) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }

    if (data.user && !isLogin) {
      const adminEmails = getAdminEmailSet();
      if (adminEmails.size > 0 && !adminEmails.has(data.user.email ?? "")) {
        const url = request.nextUrl.clone();
        url.pathname = "/admin/login";
        url.searchParams.set("error", "forbidden");
        return NextResponse.redirect(url);
      }
    }
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
