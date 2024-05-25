"use client";

import { supabase } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import ApplicationLoader from "@/app/loading";
import { User } from "@supabase/supabase-js";
import { signOut } from "./actions/login";

export default function AuthButton() {
  const { toast } = useToast();
  const router = useRouter();
  const [currentUser, setcurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const signOutHandler = async () => {
    await signOut();
    toast({ title: "Logged off successfully", variant: "success" });
    router.push("/login");
  };

  React.useEffect(() => {
    const getUser = async () => {
      const {
        data: { user: user2 },
      } = await supabase.auth.getUser();
      setcurrentUser(user2);
      setIsLoading(false);
    };
    // Run getUser once on mount to get the current user
    getUser();

    // auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`Supabase auth event: ${event}`);
        getUser();
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const user = currentUser;

  if (isLoading) {
    return <ApplicationLoader />;
  }

  return user ? (
    <div className="flex items-center gap-4 text-sm">
      Hey, {user.email}!
      <form action={signOutHandler}>
        <Button variant={"default"} className="py-2 px-4 rounded-md">
          Logout
        </Button>
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
