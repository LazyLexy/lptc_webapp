import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

type AuthRole = "ADMIN" | "TEACHER" | "STUDENT";

function isAuthRole(role: unknown): role is AuthRole {
  return role === "ADMIN" || role === "TEACHER" || role === "STUDENT";
}

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const role = isAuthRole(token?.role) ? token.role : null;

  if (pathname.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/portal/login", req.url));
  }

  if (pathname.startsWith("/portal") && pathname !== "/portal/login" && !token) {
    return NextResponse.redirect(new URL("/portal/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/portal/:path*"],
};
