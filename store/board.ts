import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import {
  PostType,
  CommentType,
  RepliesType,
  DetailPostType,
} from "../types/post";
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
    setDetail(state: BoardState, action: PayloadAction<DetailPostType>) {
      state.detail = action.payload;
    },
    setDetailPost(state: BoardState, action: PayloadAction<DetailPostType>) {
      state.detail.post = action.payload;
    },
    setDetailComment(state: BoardState, action: PayloadAction<CommentType[]>) {
      state.detail.comment = action.payload;
    },
    deleteDetailComment(state: BoardState, action: PayloadAction<string>) {
      state.detail.comment = state.detail.comment.filter(
        (comment) => comment._id !== action.payload
      );
      state.detail.replies = state.detail?.replies.filter(
        (replies) => replies.responseTo !== action.payload
      );
    },
    setDetailReplies(state: BoardState, action: PayloadAction<RepliesType[]>) {
      state.detail.replies = action.payload;
    },
    deleteDetailReplies(state: BoardState, action: PayloadAction<string>) {
      state.detail.replies = state.detail?.replies.filter(
        (replies) => replies._id !== action.payload
      );
    },
  },
});

export const boardActions = { ...board.actions };

export default board;
