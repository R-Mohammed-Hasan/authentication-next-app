import { supabase } from "@/utils/supabase/client";
import { APIResponseType } from "@/utils/types";
import { getErrMsg } from "@/utils/utils";
import { AuthResponse, OAuthResponse } from "@supabase/supabase-js";

export const signInAction = async (
  formData: FormData
): Promise<APIResponseType> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Here we get the session token to be stored for future verification
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  console.log("error", error);

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
  console.log("error", error);
  if (error) {
    return { isSuccess: false, errorMsg: getErrMsg(error.code) };
  }
  return { isSuccess: true, errorMsg: "" };
};

export const signInWithGoogle = async (): Promise<OAuthResponse> => {
  const res = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${location.origin}/protected`,
    },
  });
  console.log("res", res);

  return res;
};
