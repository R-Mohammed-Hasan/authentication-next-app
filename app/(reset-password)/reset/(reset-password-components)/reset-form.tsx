"use client";

import { SubmitButton } from "@/app/login/submit-button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/utils/supabase/client";
import { checkPasswordsMatch } from "@/utils/utils";
import { useRouter } from "next/navigation";
import React from "react";

const ResetPasswordForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [showPasswords, setshowPasswords] = React.useState<boolean>(false);

  const resetPassword = async (formData: FormData) => {
    try {
      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirmPassword") as string;
      if (!checkPasswordsMatch(password, confirmPassword)) {
        toast({
          title: "Passwords doesn't match",
          description: "Please verify you passwords",
          variant: "destructive",
        });
      }
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });
      if (!error) {
        toast({
          title: "Password resetted",
          variant: "success",
          description: "Your password has been reset successfully",
        });
        router.push("/protected");
      } else {
        toast({
          title: error.message ?? "Some error occurred while processing",
          description: "Please check your credentials",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("error in resetpassword", err);
      toast({
        title: "Some error occurred while processing",
        description: "Please check your credentials",
        variant: "destructive",
      });
    }
  };

  return (
    <form className="animate-in flex flex-col w-full justify-center gap-1 text-foreground">
      <label className="text-sm" htmlFor="password">
        Password
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        type={showPasswords ? "text" : "password"}
        name="password"
        pattern="[A-Za-z0-9]{12,}"
        title="Your password should contain 12 characters and be a combination of Uppercase,Lowercase and Numbers"
        placeholder="••••••••"
        required
      />
      <label className="text-sm" htmlFor="password">
        Confirm Password
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        type={showPasswords ? "text" : "password"}
        name="confirmPassword"
        pattern="[A-Za-z0-9]{12,}"
        title="Your password should contain 12 characters and be a combination of Uppercase,Lowercase and Numbers"
        placeholder="••••••••"
        required
      />
      <div className="show-passwords-container flex">
        <input
          type="checkbox"
          value={String(showPasswords)}
          id="show-password"
          onChange={() => setshowPasswords((prev) => !prev)}
        />
        <label
          htmlFor="show-password"
          className="show-password ml-2 text-sm cursor-pointer my-4"
        >
          Show passwords
        </label>
      </div>
      <SubmitButton
        formAction={(formData: FormData) => resetPassword(formData)}
        className="bg-primary rounded-md px-4 py-2 mb-2 text-textSecondary"
        pendingText="Resetting..."
      >
        Reset
      </SubmitButton>
    </form>
  );
};

export default ResetPasswordForm;
