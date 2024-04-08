import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SystemState {
  loadingModal: boolean;
}

const initialState: SystemState = {
  loadingModal: false,
};

export const systemSlice = createSlice({
  name: "systemSlice",
  initialState,
  reducers: {
    setLoadingModal: (state, action: PayloadAction<boolean>) => {
      state.loadingModal = action.payload;
    },
  },
});

export const { setLoadingModal } = systemSlice.actions;

export default systemSlice.reducer;
