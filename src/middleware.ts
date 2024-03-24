export { default } from "next-auth/middleware";
// import { getToken } from "next-auth/jwt";
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

export const config = {
  matcher: ["/userpost/"],
};
