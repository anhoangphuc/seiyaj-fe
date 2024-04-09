import { backendAPI } from "./api";
import {BigNumber} from 'ethers';

export const userService = {
  login: (email: string, password: string) => {
    return backendAPI
      .post(
        "/auth/login",
        {
          email,
          password,
        },
      )
      .then((data) => Promise.resolve(data.data));
  },

  register: (email: string, password: string) => {
    return backendAPI
      .post("/auth/register", {
        email,
        password,
      })
      .then((data) => Promise.resolve(data.data));
  },

  linkAddress: (address: string, signature: string, token: string) => {
    return backendAPI
      .post("users/link-address", {
        address,
        signature,
      }, { headers: { Authorization: `Bearer ${token}`} })
      .then((data) => Promise.resolve(data.data));
  },

  requestWhitelist: (token: string) =>  {
    return backendAPI
      .post("/users/request-whitelist", {},
        { headers: { Authorization: `Bearer ${token}`}})
      .then((data) => Promise.resolve(data.data));
  },
};
