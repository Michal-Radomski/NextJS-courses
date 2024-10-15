import { NextResponse } from "next/server";

export function middleware(request: Request): NextResponse<unknown> {
  console.log("request:", request);
  return NextResponse.next();
}

export const config = {
  matcher: "/news",
};
