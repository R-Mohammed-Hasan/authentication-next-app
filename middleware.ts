import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { supabase } from "./utils/supabase/client";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  const { data } = await supabase.auth.getSession();
  debugger;

  console.log(
    "session",
    session,
    { data },
    req?.nextUrl?.search,
    req?.nextUrl?.searchParams
  );
  // Exluding Google OAuth URL containing "code" param
  if (req?.nextUrl?.search?.includes("code")) {
    return res;
  }
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return res;
  // return await updateSession(req);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * To exclude pages like login, sign up pages or home page
     *  of a website for which user doesn't need to be logged in
     */
    "/((?!_next/static|_next/image|login|reset|favicon.ico|api/auth/callback/google|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
