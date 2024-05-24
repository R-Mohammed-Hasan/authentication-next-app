import "./../globals.css";
import "./../reset.css";
import "./login.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Basic Authentication System - Login page",
  description: "Login page of authentication system",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="login-container mt-32 min-h-full flex flex-col justify-center items-center">
      {children}
    </div>
  );
}
