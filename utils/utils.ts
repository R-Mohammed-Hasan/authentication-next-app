export const getErrMsg = (errCode: string = ""): string => {
  let err = "";
  switch (errCode) {
    case "weak_password":
      err = "Weak password. Please choose a strong password";
      break;
    default:
      break;
  }
  return err;
};
