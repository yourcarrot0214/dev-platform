import React from "react";
import { NextPage } from "next";
import wrapper from "../../store";
import { Store } from "redux";
import { NextPageContext } from "next/types";
import Chatting from "../../components/views/chat/Chatting";

const index: NextPage = () => {
  return <Chatting />;
};

index.getInitialProps = wrapper.getInitialAppProps(
  (store: Store) => async ({ query }: NextPageContext) => {
    return {};
  }
);

export default index;
