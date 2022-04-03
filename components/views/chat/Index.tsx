import React from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";

const Index: React.FC = () => {
  return (
    <div>
      <h1>Chatting Index Page</h1>
    </div>
  );
};

export default Index;

/*
  TODO 1. 채팅방 목록 출력
    TODO : client
      ? 제목, 생성자, tag 3가지 노출
      ? api method 정의
    TODO : server
      ? db chatting document setup
      ? route 요청에 따른 socket.io server, room 연결

  TODO 2. 채팅방 개설 기능 구현
    ? 신규 채팅방 개설을 위한 Modal 출력
    ? title, tag 3가지 입력
    ? db chatting document 생성 및 해당 page route 연결하기
*/
