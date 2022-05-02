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

/*
  TODO 1. 채팅방 목록 및 채팅창 출력 변경
    ? /chat
      * [채팅방 생성하기]
        -> popup form으로 title 정보 입력받기
        -> store에 정보 업데이트 하기
        -> db에 신규 채팅방 생성 요청 보내기
        -> /chat/[roomId].tsx 페이지로 이동하기
      * 채팅방 목록 출력하기
        -> ✅ db에서 채팅방 목록 가져오기
        -> ✅ title, members avatar로 목록 출력하기
    ? /chat/[roomId].tsx
      * <Chatting /> 출력
        -> ✅ chatRoom 데이터가 없을 때 출력할 Info 컴포넌트 만들기
      * [채팅방 나가기]
        -> db members 배열에서 id값 제거하기
        -> state.chat.chatRoom 초기화
      * [채팅방 삭제하기]
        -> /chat route로 이동하기
        -> db document 삭제하기
        -> state.chat.chatRoom 초기화
*/
