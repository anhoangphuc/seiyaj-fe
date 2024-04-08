import { backendAPI } from "./api";

export const userService = {
  login: (token: string) => {
    return backendAPI
      .post(
        "/users/login",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
};
