import React from "react";
import { NextPage } from "next";
import styled from "styled-components";
import wrapper from "../../store";
import { Store } from "redux";
import { NextPageContext } from "next/types";
import Chatting from "../../components/views/chat/Chatting";
import { getChatListAPI } from "../../lib/api/chat";
import { chatActions } from "../../store/chat";

import Rooms from "../../components/views/chat/Rooms";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 1440px;
  display: flex;
  flex-direction: row;
`;

const index: NextPage = () => {
  return (
    <Container>
      <Rooms />
      <Chatting />
    </Container>
  );
};

index.getInitialProps = wrapper.getInitialAppProps(
  (store: Store) => async ({ query }: NextPageContext) => {
    const { data } = await getChatListAPI();
    store.dispatch(chatActions.setChatList(data));
    return {};
  }
);

export default index;
