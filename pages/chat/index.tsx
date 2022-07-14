import Head from "next/head";
import { NextPage } from "next";
import styled from "styled-components";
import wrapper from "../../store";
import { Store } from "redux";
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
    <>
      <Head>
        <title>DEV-Platform :: Chat</title>
      </Head>
      <Container>
        <Rooms />
        <Chatting />
      </Container>
    </>
  );
};

index.getInitialProps = wrapper.getInitialPageProps(
  (store: Store) => async () => {
    const { data } = await getChatListAPI();
    store.dispatch(chatActions.setChatList(data));
    return {};
  }
);

export default index;

/*
  TODO 1. production 환경에서 notice page 출력하기
    ? chat 기능 시연 영상과 이유에 대해서 설명하는 컴포넌트 출력하기
*/
