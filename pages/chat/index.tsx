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

/*
  TODO : 채팅방 구조 개선
    ? 현재 -> 접속과 동시에 채팅방 입장.
    ? 개선  로비 / 채팅방 목록 출력 및 신규 개설, 참가
  
  TODO : client
    ? 기존 Chatting Component를 적용
  
  TODO : server
    ? 생성된 채팅방 id를 room name으로 하는 socket server 연결
    ? api/chat/[id].ts -> socket.on("join room", (user) => socket.join(`${req.query.id} room`))
*/
