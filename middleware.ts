import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "./utils/supabase/server";

export async function middleware(request: NextRequest) {
  const supabase = createClient(); // Here we need to call server side client since client side supabase gives null even if user is logged in
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  // console.log("session", session);
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return await updateSession(request);
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
    "/((?!_next/static|_next/image|login|reset|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
