import React from "react";
import "./../../login/login.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Basic Authentication System | Reset password",
  description: "Reset password page",
};

const ResetPasswordPageLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="login-container mt-32 min-h-full flex flex-col justify-center items-center">
      {children}
    </div>
  );
};

export default ResetPasswordPageLayout;
