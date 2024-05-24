"use server";

import * as React from "react";
import NavBar from "./static-navbar";
import { createClient } from "@/utils/supabase/server";
import { NavigationMenuItem } from "@/components/ui/navigation-menu";
import AuthButton from "@/components/AuthButton";

export async function WrappedNavBar() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  const userData = isSupabaseConnected && <AuthButton />;

  console.log("userData", userData);

  return <NavBar userData={userData} />;
}
