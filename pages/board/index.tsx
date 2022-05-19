import React from "react";
import { NextPage } from "next";
import Board from "../../components/views/board/Board";
import wrapper from "../../store";
import { NextPageContext } from "next/types";
import { Store } from "redux";
import { boardActions } from "../../store/board";
import {
  getBoardListAPI,
  getCommentListAPI,
  getRepliesListAPI,
} from "../../lib/api/board";

const index: NextPage = () => {
  return <Board />;
};

index.getInitialProps = wrapper.getInitialPageProps(
  (store: Store) => async (context: NextPageContext) => {
    console.log("getInitialProps ✅");
    const boardList = await getBoardListAPI();
    const commentList = await getCommentListAPI();
    const repliesList = await getRepliesListAPI();

    store.dispatch(boardActions.setPostlist(boardList.data));
    store.dispatch(boardActions.setCommentlist(commentList.data));
    store.dispatch(boardActions.setReplieslist(repliesList.data));
    return {};
  }
);

export default index;
