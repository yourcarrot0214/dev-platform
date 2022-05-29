import React from "react";
import styled from "styled-components";
import { useSelector } from "../../../store";
import { ChatRoomList } from "../../../types/chat";

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
  const rooms: ChatRoomList[] = useSelector((state) => state.chat.chatlist);

  return (
    <Container>
      <ul>
        {rooms.map((room) => (
          <li key={room._id}>
            <Room _id={room._id} title={room.title} members={room.members} />
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Rooms;

/*
  TODO : logic 수정
    ? client user id 값이 members에 포함되어 있는지 여부를 검증한다.
    ? 없으면 chat db의 members 배열에 userId를 포함하는 API를 호출한다.
    ? response 값을 store에 update 한다.
*/
