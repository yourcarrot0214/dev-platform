import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../types/reduxState";
import { UserType } from "../types/user.d";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";

export const initialState: UserState = {
  _id: "",
  name: "",
  email: "",
  profileImage: "",
  isLogged: false,
};

export type UserReducerState = typeof initialState;

const user = createSlice({
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
    setProfileImage(state: UserState, action: PayloadAction<string>) {
      state.profileImage = action.payload;
      return state;
    },
  },
});

export const userActions = { ...user.actions };

export default user;
