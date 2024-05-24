"use server";

import * as React from "react";
import NavBar from "./static-navbar";
import { createClient } from "@/utils/supabase/server";
import AuthButton from "@/components/AuthButton";

export async function WrappedNavBar() {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();

  console.log("user session", data);

  const userData = data ? <AuthButton user={data} /> : <></>;

  // console.log("userData", userData);

  return <NavBar userData={userData} />;
}
