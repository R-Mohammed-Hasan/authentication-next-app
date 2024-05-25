import { SubmitButton } from "@/app/login/submit-button";
import {
  signInAction,
  signInWithGoogle,
  signUpAction,
} from "@/components/actions/login";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
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
    const res: APIResponseType = await signInAction(formData);
    console.log("response", res);
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
    console.log("response", res);
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
      <label className="text-sm" htmlFor="password">
        Password
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        type="password"
        name="password"
        // pattern="[A-Za-z0-9]{12,}"
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
                id="show-password"
                onChange={() => setRememberMe((prev) => !prev)}
              />
              <label
                htmlFor="show-password"
                className="show-password my-0 ml-2 text-sm cursor-pointer"
              >
                Remember for 30 days
              </label>
            </div>
            <Link
              href="login/reset"
              className="text-sm border-foreground/20 rounded-md px-1 text-primary self-end"
            >
              Forgot password
            </Link>
          </div>
          <SubmitButton
            formAction={(formData) => signIn(formData)}
            className="bg-primary rounded-md px-4 py-2 mb-2 text-textSecondary"
            pendingText="Signing In..."
          >
            Sign In
          </SubmitButton>
          <Button
            variant={"outline"}
            onClick={signIntoGoogle}
            type="button"
            className="border-border rounded-md px-4 py-2 mb-2"
          >
            {/* <Icons glyph="google" /> */}
            Sign in with Google
          </Button>
          <div className="signup-container text-sm text-center mt-6">
            Don't have an account?{" "}
            <Link
              href={"/login?activeWizard=SIGN_UP"}
              className="rounded-md px-1 mb-2 text-primary"
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
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {searchParams.message}
        </p>
      )}
    </form>
  );
};

export default FormBuilder;
