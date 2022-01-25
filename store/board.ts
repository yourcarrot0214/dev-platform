import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { PostType } from "../types/post";
import { BoardState } from "../types/reduxState";

// * initialState
const initialState: BoardState = {
  postlist: [],
  detail: null,
};

export type BoardReducerState = typeof initialState;

const board = createSlice({
  name: "board",
  initialState,
  reducers: {
    setPostlist(state: BoardState, action: PayloadAction<PostType[]>) {
      state.postlist = action.payload;
    },
    setDetail(state: BoardState, action: PayloadAction<PostType>) {
      state.detail = action.payload;
    },
  },
});

export const boardActions = { ...board.actions };

export default board;
