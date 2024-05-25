export const getErrMsg = (errCode: string = ""): string => {
  let err = "";
  switch (errCode) {
    case "weak_password":
      err = "Weak password. Please choose a strong password";
      break;
    case "over_email_send_rate_limit":
      err = "Too many requests. Please try again after sometime";
      break;
    default:
      break;
  }
  return err;
};

export const checkPasswordsMatch = (
  password: string,
  confirmPassword: string
): boolean => {
  return password == confirmPassword;
};
