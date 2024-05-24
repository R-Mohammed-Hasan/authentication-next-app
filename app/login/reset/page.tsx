"use client";

import React from "react";
import { SubmitButton } from "../submit-button";
import { createClient } from "@/utils/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const ResetPassword = () => {
  const supabase = createClient();
  const { toast } = useToast();

  const resetPassword = async (formData: FormData) => {
    try {
      console.log("formData", formData);
      const { data, error } = await supabase.auth.resetPasswordForEmail(
        formData.get("email") as string,
        {
          redirectTo: `${location.origin}/reset`,
        }
      );
      console.log("data", data, error);
      if (!error) {
        toast({ title: "Mail sent successfully", variant: "success" });
      } else {
        toast({ title: "Unsuccessful...!", variant: "destructive" });
      }
    } catch (err) {
      console.log("errr", err);
      toast({ title: "Mail sent successfully", variant: "destructive" });
    }
  };
  return (
    <form className="animate-in flex flex-col w-full justify-center gap-1 text-foreground">
      <label className="text-sm" htmlFor="email">
        Email
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        name="email"
        placeholder="Enter your email"
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        required
      />
      <SubmitButton
        formAction={(formData: FormData) => resetPassword(formData)}
        className="bg-primary rounded-md px-4 py-2 mb-2 text-textSecondary"
        pendingText="Resetting..."
      >
        Reset password
      </SubmitButton>
    </form>
  );
};

export default ResetPassword;
