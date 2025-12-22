import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const isAuth = false;

  if (req.nextUrl.pathname === "/" && !isAuth) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }
}
