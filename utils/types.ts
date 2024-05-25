import { Toast, ToasterToast, useToast } from "@/components/ui/use-toast";

export type NavBarProps = {
  userData: React.JSX.Element;
};

export type FormBuilderType = {
  label: string;
  type: FormComponentType;
};

export type SupaBaseFormBuilderType = {
  searchParams?: Record<string, string>;
  activeWizard: LOGIN_WIZARD;
  // handleWizardChange: (wizard: LOGIN_WIZARD) => void;
};

export enum FormComponentType {
  EMAIL = "EMAIL",
  PASSWORD = "PASSWORD",
  DATE_TIME = "DATE_TIME",
}

export type LOGIN_WIZARD = "SIGN_UP" | "LOG_IN";

// export type ToasterCallableType = (obj: Toast) => {
//   id: string;
//   dismiss: () => void;
//   update: (props: ToasterToast) => void;
// };

export type APIResponseType = {
  isSuccess: boolean;
  errorMsg: string | null;
};
