import { SubmitButton } from "@/app/login/submit-button";
import {
  signInAction,
  signInWithGoogle,
  signUpAction,
} from "@/components/actions/login";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/utils/supabase/client";
import { APIResponseType, SupaBaseFormBuilderType } from "@/utils/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const FormBuilder: React.FC<SupaBaseFormBuilderType> = ({
  searchParams,
  activeWizard,
}) => {
  // Show loader on isPending event
  // const [isPending, startTransition] = useTransition();
  const [rememberMe, setRememberMe] = React.useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const signIn = async (formData: FormData) => {
    const res: APIResponseType = await signInAction(formData, rememberMe);
    if (!res.isSuccess) {
      toast({
        title: res.errorMsg || "Some error occurred while processing",
        description: "Please check your credentials",
        variant: "destructive",
      });
    } else {
      setTimeout(() => {
        toast({
          title: "Success !",
          variant: "success",
          description: "You have been signed in...",
        });
      }, 500);
      router.push("/protected");
    }
  };

  const signUp = async (formData: FormData) => {
    const res = await signUpAction(formData);
    if (!res.isSuccess) {
      toast({
        title: res.errorMsg || "Some error occurred while processing",
        description: "Please check your credentials",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success! Please confirm you email",
        variant: "success",
        description: "Check you inbox & activate your account...",
      });
    }
  };

  const signIntoGoogle = async () => {
    await signInWithGoogle();
  };

  const getSession = async () => {
    const session = await supabase.auth.getSession();
    console.log("session", session);
  };

  getSession();

  return (
    <form className="animate-in flex flex-col w-full justify-center gap-1 text-foreground">
      <label className="text-sm" htmlFor="email">
        Email
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        name="email"
        placeholder="Enter your email"
        pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
        required
      />
      <label className="text-sm" htmlFor="password">
        Password
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        type="password"
        name="password"
        pattern="[A-Za-z0-9]{12,}"
        title="Your password should contain 12 characters and be a combination of Uppercase,Lowercase and Numbers"
        placeholder="••••••••"
        required
      />
      {activeWizard == "LOG_IN" ? (
        <>
          <div className="miscellaneous-options-container h-6 flex items-center mb-4 justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                value={String(rememberMe)}
                id="remember-me"
                onChange={() => setRememberMe((prev) => !prev)}
              />
              <label
                htmlFor="remember-me"
                className="remember-me my-0 ml-2 text-sm cursor-pointer"
              >
                Remember for 30 days
              </label>
            </div>
            <Link
              href="login/reset"
              className="text-sm border-foreground/20 rounded-md h-full text-primary hover:underline self-end"
            >
              Forgot password
            </Link>
          </div>
          <SubmitButton
            formAction={(formData) => signIn(formData)}
            className="bg-primary text-sm rounded-md px-4 py-2 mb-2 text-textSecondary"
            pendingText="Signing In..."
          >
            Sign In
          </SubmitButton>
          <Button
            variant={"outline"}
            size={"lg"}
            onClick={signIntoGoogle}
            type="button"
            className="border-border flex items-center justify-center gap-2 relative rounded-md p-4 mb-2"
          >
            <Icons glyph="google" />
            Sign in with Google
          </Button>
          <div className="signup-container text-sm text-center mt-6">
            Don't have an account?{" "}
            <Link
              href={"/login?activeWizard=SIGN_UP"}
              className="rounded-md px-1 mb-2 text-primary font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </>
      ) : (
        <SubmitButton
          formAction={signUp}
          className="bg-primary rounded-md px-4 py-2 mb-2 text-textSecondary"
        >
          Sign Up
        </SubmitButton>
      )}
      {searchParams?.message && (
        <p className="mt-4 p-4  bg-destructive text-textSecondary rounded text-center">
          {searchParams.message}
        </p>
      )}
    </form>
  );
};

export default FormBuilder;
