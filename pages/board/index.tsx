import React from "react";
import { NextPage } from "next";
import Board from "../../components/views/board/Board";
import wrapper from "../../store";
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

export const getStaticProps = wrapper.getStaticProps(
  (store: Store) => async () => {
    console.log("getStaticProps ✅");
    const boardList = await getBoardListAPI();
    const commentList = await getCommentListAPI();
    const repliesList = await getRepliesListAPI();

    store.dispatch(boardActions.setPostlist(boardList.data));
    store.dispatch(boardActions.setCommentlist(commentList.data));
    store.dispatch(boardActions.setReplieslist(repliesList.data));

    return { props: {} };
  }
);

export default index;
