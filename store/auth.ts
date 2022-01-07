import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { AuthState } from "../types/reduxState";

const initialState: AuthState = {
  authMode: "signup",
};

export type AuthReducerState = typeof initialState;

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthMode(state: AuthState, action: PayloadAction<"signup" | "login">) {
      state.authMode = action.payload;
    },
  },
});

export const authActions = { ...auth.actions };

export default auth;
