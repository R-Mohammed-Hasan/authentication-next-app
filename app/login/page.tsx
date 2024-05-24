import { SupaBaseFormBuilderType } from "@/utils/types";
import LoginComponent from "./(login-components)";

const LoginPage: React.FC<SupaBaseFormBuilderType> = ({ searchParams }) => {
  return <LoginComponent searchParams={searchParams} />;
};

export default LoginPage;
