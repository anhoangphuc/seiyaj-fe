// import { ACCOUNT_MARKETPLACE } from "@/constants";

const ACCOUNT_MARKETPLACE = "ACCOUNT_MARKETPLACE";

export const storageService = {
  saveAccount: (data: Account) => {
    localStorage.setItem(ACCOUNT_MARKETPLACE, JSON.stringify(data));
  },
  getAccount: (): Account | undefined => {
    const data = localStorage.getItem(ACCOUNT_MARKETPLACE);
    return data ? JSON.parse(data) : undefined;
  },
  removeAccount: () => {
    localStorage.removeItem(ACCOUNT_MARKETPLACE);
  },
};
