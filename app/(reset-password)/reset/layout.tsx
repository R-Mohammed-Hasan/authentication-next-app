import React from "react";
import "./../../login/login.scss";

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
