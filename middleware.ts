import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { parse } from "cookie";
import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";
import { signOut } from "./components/actions/login";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // console.log(
  //   "session",
  //   session,
  //   { data },
  //   req?.nextUrl?.search,
  //   req?.nextUrl?.searchParams
  // );
  // console.log("req", req);

  // Parse the cookies from the request headers for remember me feature
  const cookies = parse(req.cookies?.toString() ?? "");
  const storedSessionData = cookies["supabase.session"];
  console.log("storedSessionData", storedSessionData);

  if (storedSessionData) {
    const { session: storedSession, expiryDate } =
      JSON.parse(storedSessionData);

    // Check if the stored session has not expired
    if (new Date() < new Date(expiryDate)) {
      console.log("storedSession", storedSession, { expiryDate });
      supabase.auth.setSession(storedSession);
    } else {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error);
      }
    }
  }

  // Exluding Google OAuth URL containing "code" param
  if (req?.nextUrl?.search?.includes("code")) {
    return res;
  }
  console.log("session", session?.expires_in);

  if (!session) {
    return NextResponse.redirect(
      new URL("/login?message=You need to login...!", req.url)
    );
  }
  // return res;
  return await updateSession(req);
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
