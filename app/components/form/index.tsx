import { SubmitButton } from "@/app/login/submit-button";
import { signInAction, signUpAction } from "@/components/actions/login";
import { useToast } from "@/components/ui/use-toast";
import { APIResponseType, SupaBaseFormBuilderType } from "@/utils/types";
import { getErrMsg } from "@/utils/utils";
import React, { useTransition } from "react";

const FormBuilder: React.FC<SupaBaseFormBuilderType> = ({
  searchParams,
  activeWizard,
}) => {
  // Show loader on isPending event
  const [isPending, startTransition] = useTransition();

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
      toast({
        title: "Success !",
        variant: "success",
        description: "You have been signed in...",
      });
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
        title: "Success !",
        variant: "success",
        description: "You have been signed up...",
      });
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
        required
      />
      <label className="text-sm" htmlFor="password">
        Password
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        type="password"
        name="password"
        placeholder="••••••••"
        required
      />
      {activeWizard == "LOG_IN" ? (
        <>
          <SubmitButton
            formAction={(formData) => startTransition(() => signIn(formData))}
            className="bg-primary rounded-md px-4 py-2 mb-2 text-textSecondary"
            pendingText="Signing In..."
          >
            Sign In
          </SubmitButton>
          <div className="signup-container text-sm text-center mt-6">
            Don't have an account?{" "}
            <SubmitButton
              formAction={signUp}
              className="text-sm border-foreground/20 rounded-md px-1 text-primary mb-2"
              pendingText="Signing Up..."
            >
              Sign up
            </SubmitButton>
          </div>
        </>
      ) : (
        <SubmitButton
          formAction={signUp}
          className="bg-primary rounded-md px-4 py-2 mb-2 text-textSecondary"
          pendingText="Signing up..."
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
