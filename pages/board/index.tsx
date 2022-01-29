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
    console.log(">> query : ", query);
    // TODO : board data 불러와서 redux store에 업데이트
    const boardList = await getBoardListAPI();
    console.log(">> boardList :: ", boardList.data);
    store.dispatch(boardActions.setPostlist(boardList.data));
    return {};
  }
);

export default index;
