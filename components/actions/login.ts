import { supabase } from "@/utils/supabase/client";
import { APIResponseType } from "@/utils/types";
import { REMEMBER_ME_MAX_LIMIT, getErrMsg } from "@/utils/utils";
import { AuthError, AuthResponse, OAuthResponse } from "@supabase/supabase-js";
import Cookies from "js-cookie";

export const signInAction = async (
  formData: FormData,
  rememberMe: boolean = false
): Promise<APIResponseType> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (rememberMe && data?.session) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30); // Set the expiry date to 30 days from now
    debugger;
    Cookies.set(
      "supabase.session",
      JSON.stringify({
        session: data,
        expiryDate: expiryDate.toISOString(),
      }),
      { expires: 30 }
    );
  }
  console.log("data", data?.session);
  if (error) {
    return { isSuccess: false, errorMsg: getErrMsg(error.code) };
  }
  return { isSuccess: true, errorMsg: "" };
};

export const signUpAction = async (
  formData: FormData
): Promise<APIResponseType> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error }: AuthResponse = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${location.origin}/auth/callback`,
    },
  });
  if (error) {
    return { isSuccess: false, errorMsg: getErrMsg(error.code) };
  }
  return { isSuccess: true, errorMsg: "" };
};

export const signInWithGoogle = async (): Promise<OAuthResponse> => {
  Cookies.remove("supabase.session");
  const res = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${location.origin}/protected`,
    },
  });
  console.log("res", res);
  return res;
};

export const signOut = async (): Promise<AuthError | null> => {
  Cookies.remove("supabase.session");
  const { error } = await supabase.auth.signOut();
  return error;
};
