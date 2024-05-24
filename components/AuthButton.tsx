"use client";

import { supabase } from "@/utils/supabase/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { useState } from "react";
import React from "react";

export default function AuthButton() {
  const [currentUser, setcurrentUser] = useState<any>(null);
  const signOut = async () => {
    await supabase.auth.signOut();
    return redirect("/login");
  };

  React.useEffect(() => {
    const getUser = async () => {
      const user2 = await supabase.auth.getSession();
      setcurrentUser(user2);
    };
    getUser();
  }, []);

  console.log("currentUser", currentUser);
  const user = currentUser;
  return user ? (
    <div className="flex items-center gap-4 text-sm">
      Hey, {user.email}!
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <div className="flex items-center justify-center gap-4 text-sm">
      <Link
        href="/login?activeWizard=LOG_IN"
        className="py-2 px-4 hover:bg-slate-200 transition-all flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
      >
        Log in
      </Link>
      <Button variant={"default"}>
        <Link
          href="/login?activeWizard=SIGN_UP"
          className="py-2 flex rounded-md no-underline"
        >
          Sign up
        </Link>
      </Button>
    </div>
  );
}
