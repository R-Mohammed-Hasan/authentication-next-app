"use server";

import { createClient } from "@/utils/supabase/client";
import { APIResponseType } from "@/utils/types";
import { getErrMsg } from "@/utils/utils";
import { AuthResponse } from "@supabase/supabase-js";
import { headers } from "next/headers";

export const signInAction = async (
  formData: FormData
): Promise<APIResponseType> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

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
  const origin = headers().get("origin");
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error }: AuthResponse = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });
  console.log("error", error);
  if (error) {
    return { isSuccess: false, errorMsg: getErrMsg(error.code) };
  }
  return { isSuccess: true, errorMsg: "" };
};
