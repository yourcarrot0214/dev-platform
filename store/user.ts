import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../types/reduxState";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";

export const initialState: UserState = {
  id: "",
  name: "",
  email: "",
  profileImage: "",
  isLogged: false,
};

export type UserReducerState = typeof initialState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedUser(state: UserState, action: PayloadAction<UserType>) {
      state = { ...action.payload, isLogged: true };
      return state;
    },
    initUser(state: UserState) {
      state = initialState;
      return state;
    },
  },
});

export const userAction = { ...userSlice.actions };

export default userSlice;
