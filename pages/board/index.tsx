import React from "react";
import { NextPage } from "next";
import Board from "../../components/views/board/Board";
import wrapper from "../../store";
import { NextPageContext } from "next/types";
import { Store } from "redux";
import { boardActions } from "../../store/board";
import { getBoardListAPI } from "../../lib/api/board";

const index: NextPage = () => {
  return <Board />;
};

index.getInitialProps = wrapper.getInitialAppProps(
  (store: Store) => async ({ query }: NextPageContext) => {
    const boardList = await getBoardListAPI();
    store.dispatch(boardActions.setPostlist(boardList.data));
    return {};
  }
);

export default index;
