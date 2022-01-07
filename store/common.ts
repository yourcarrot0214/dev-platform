import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { CommonState } from "../types/reduxState";

const initialState: CommonState = {
  validateMode: false,
};

export type CommonReducerState = typeof initialState;

const common = createSlice({
  name: "common",
  initialState,
  reducers: {
    // * validateMode 변경하기
    setValidateMode(state: CommonState, action: PayloadAction<boolean>) {
      state.validateMode = action.payload;
    },
  },
});

export const commonActions = { ...common.actions };

export default common;
