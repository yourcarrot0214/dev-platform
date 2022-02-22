import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { PostType, CommentType, RepliesType } from "../types/post";
import { BoardState } from "../types/reduxState";

// * initialState
const initialState: BoardState = {
  postlist: [],
  commentlist: [],
  replieslist: [],
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
    setCommentlist(state: BoardState, action: PayloadAction<CommentType[]>) {
      state.commentlist = action.payload;
    },
    setReplieslist(state: BoardState, action: PayloadAction<RepliesType[]>) {
      state.replieslist = action.payload;
    },
    setDetail(state: BoardState, action: PayloadAction<PostType>) {
      state.detail = action.payload;
    },
  },
});

export const boardActions = { ...board.actions };

export default board;
