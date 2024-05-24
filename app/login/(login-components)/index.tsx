"use client";

import { LOGIN_WIZARD, SupaBaseFormBuilderType } from "@/utils/types";
import FormBuilder from "../../components/form";
import React, { useState } from "react";

const LoginComponent: React.FC<
  Omit<SupaBaseFormBuilderType, "activeWizard">
> = ({ searchParams }) => {
  const [activeWizard, setActiveWizard] = useState<LOGIN_WIZARD>("SIGN_UP");

  return (
    <>
      <h2 className="text-3xl font-semibold mb-5">Log in to your account</h2>
      <p className="login-description text-sm mb-5">
        Welcome back! Please enter you details
      </p>
      <div className="login-signup-wizard-container flex items-center justify-center border-border-2 w-full mb-10 text-sm font-semibold">
        <div
          className={`${
            activeWizard == "SIGN_UP" ? "active" : ""
          } cursor-pointer signup-wizard flex justify-center items-center ml-0.5`}
          onClick={() => setActiveWizard("SIGN_UP")}
        >
          Sign Up
        </div>
        <div
          className={`${
            activeWizard == "LOG_IN" ? "active" : ""
          } cursor-pointer login-wizard flex justify-center items-center mr-0.5`}
          onClick={() => setActiveWizard("LOG_IN")}
        >
          Log in
        </div>
      </div>
      <div className="flex flex-col w-full sm:max-w-md justify-center gap-2">
        <FormBuilder
          searchParams={searchParams}
          activeWizard={activeWizard}
        />
      </div>
    </>
  );
};

export default LoginComponent;
