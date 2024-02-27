export { default } from "next-auth/middleware";
// import { getToken } from "next-auth/jwt";
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

export const config = {
  matcher: ["/userpost/"],
};


// export async function middleware(req: NextRequest) {
//   const session = await getToken({ req, secret: process.env.NEXTAUTH_URL });
//   console.log("middleware:", session);
//   if (!session) {
//     const requestPage = req.nextUrl.pathname;
//     const url = req.nextUrl.clone();
//     url.pathname = ``;
//     url.search = `p=${requestPage}`;
//     return NextResponse.redirect(url);
//   }

//   // return NextResponse.redirect(new URL('/home', req.url))
//   return NextResponse.next();

// }