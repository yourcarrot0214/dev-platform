import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { BoardType } from "../types/board.d";
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
    setPostlist(state: BoardState, action: PayloadAction<BoardType[]>) {
      state.postlist = action.payload;
    },
    setDetail(state: BoardState, action: PayloadAction<BoardType>) {
      state.detail = action.payload;
    },
  },
});

export const boardActions = { ...board.actions };

export default board;
