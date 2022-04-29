import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useSelector } from "../../../store";
import { ChatRoomList } from "../../../types/chat";
import { getChatRoomAPI } from "../../../lib/api/chat";
import { chatActions } from "../../../store/chat";

import Room from "./Room";

const Container = styled.div`
  min-width: 250px;
  padding: 2rem 0.5rem;
  max-width: 400px;

  ul {
    list-style: none;

    li {
      margin-bottom: 1rem;
    }
  }
`;

const Rooms: React.FC = () => {
  const dispatch = useDispatch();
  const rooms: ChatRoomList[] = useSelector((state) => state.chat.chatlist);

  const getChatRoomData = async (currentRoomId: string) => {
    const { data } = await getChatRoomAPI(currentRoomId);
    dispatch(chatActions.setChatRoom(data));
  };

  return (
    <Container>
      <ul>
        {rooms.map((room) => (
          <li key={room._id} onClick={() => getChatRoomData(room._id)}>
            <Room title={room.title} members={room.members} />
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Rooms;

/*
  TODO : create room
    - 신규 채팅방을 생성하고 목록에 추가하기
  TODO : room routing
    - room 클릭시 해당 roomId의 정보를 받아와서 리덕스에 업데이트 하기 ✅
    - Chatting component가 store.cath.chatRoom 정보를 구독하게 만들기 ✅
*/
