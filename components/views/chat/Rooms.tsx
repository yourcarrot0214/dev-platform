import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useSelector } from "../../../store";
import { ChatRoomList } from "../../../types/chat";
import { getChatRoomAPI } from "../../../lib/api/chat";
import { chatActions } from "../../../store/chat";

import useSocketClient from "../../../hooks/useSocketClient";
import EVENTS from "../../../utils/socket/events";

const Container = styled.div`
  width: 30%;
  padding: 2rem 0;
  max-width: 250px;

  ul {
    list-style: none;
    border: 1px solid gray;

    li {
      padding: 1rem;
      border: 1px dashed tomato;
    }
  }
`;

const Rooms: React.FC = () => {
  const dispatch = useDispatch();
  const rooms: ChatRoomList[] = useSelector((state) => state.chat.chatlist);
  const roomId = useSelector((state) => state.chat.chatRoom?._id);
  const username = useSelector((state) => state.user.name);
  const { socket, setRoomId } = useSocketClient();

  const getChatRoomData = async (currentRoomId: string) => {
    const { data } = await getChatRoomAPI(currentRoomId);
    dispatch(chatActions.setChatRoom(data));
    socket.emit(EVENTS.CLIENT.JOIN_ROOM, {
      roomId: currentRoomId,
      user: username,
    });
    setRoomId(currentRoomId);
  };

  return (
    <Container>
      <ul>
        {rooms.map((room) => (
          <li key={room._id} onClick={() => getChatRoomData(room._id)}>
            {room.members[0].name} 님의 채팅방
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
