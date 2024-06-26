import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { storageService } from "@/services/storage";
import BigNumber from "bignumber.js";
import { Web3Provider } from "@ethersproject/providers";

interface AuthState {
  email: string;
  address: string;
  token?: string;
  wrongNetwork?: boolean;
  balance: number | undefined;
  linkedAddress?: string;
}

const initialState: AuthState = {
  email: "",
  address: "",
  token: "",
  wrongNetwork: false,
  balance: 0,
  linkedAddress: "",
};

/**
 * Get user balance
 * @param {string} userAddress
 * @param {Web3Provider} library
 * @returns {Promise<number | undefined>} user balance
 */

export const getUserBalance = createAsyncThunk(
  "GET_USER_BALANCE",
  async (query: { userAddress: string; library: Web3Provider }) => {
    const { userAddress, library } = query;
    const response = await library.getBalance(userAddress);
    if (response) {
      return new BigNumber(response._hex).dividedBy("1e18").toNumber();
    }
    return undefined;
  }
);

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    saveAccount: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    saveLinkedAddress: (state, action: PayloadAction<string>) => {
      state.linkedAddress = action.payload;
    },
    saveEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    saveToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setWrongNetwork: (state, action: PayloadAction<boolean>) => {
      state.wrongNetwork = action.payload;
    },

    logout: (state) => {
      state.address = "";
      state.token = "";
      state.linkedAddress = "";
      storageService.removeAccount();
    },
  },
  extraReducers: (build) => {
    build.addCase(getUserBalance.fulfilled, (state, action) => {
      state.balance = action.payload || 0;
    });
  },
});

export const { saveAccount, saveToken, logout, setWrongNetwork, saveEmail, saveLinkedAddress } =
  authSlice.actions;

export default authSlice.reducer;
