"use server";

import AuthButton from "@/components/AuthButton";
import NavBar from "./static-nav";

export async function WrappedNavBar() {
  const userData = <AuthButton />;

  return <NavBar userData={userData} />;
}
