import { isArray } from "lodash";
import { toast } from "react-toastify";

export const shortenAddress = (address: string, chars = 4) => {
  if (address)
    return address.slice(0, chars + 2) + "..." + address.slice(42 - chars);
  return "";
};

export const handleError = (error: any, defaultMsg?: string) => {
  let errorMsg = "";
  if (isArray(error?.response?.data?.message))
    errorMsg = error?.response?.data?.message[0];
  else errorMsg = error?.response?.data?.message;
  toast.error(
    errorMsg.charAt(0).toUpperCase() + errorMsg.slice(1) ||
      defaultMsg ||
      "Something went wrong"
  );
};

export const sleep = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
