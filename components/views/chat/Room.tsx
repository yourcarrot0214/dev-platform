import React from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";
import { useDispatch } from "react-redux";
import { useSelector } from "../../../store";
import { getChatRoomAPI } from "../../../lib/api/chat";
import { chatActions } from "../../../store/chat";

// * MUI
import { Avatar, AvatarGroup } from "@mui/material";
import { ChatRoomList } from "../../../types/chat";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid gray;
  border-radius: 6px;

  .title-wrapper {
    margin: 1rem 0;
    font-size: 1.2rem;
  }
  .members-wrapper {
  }
`;

type Member = {
  _id: string;
  name: string;
  profileImage: string;
};

type Props = {
  _id: string;
  title: string;
  members: Member[];
};

const Room: React.FC<Props> = ({ _id, title, members }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user._id);

  const validateRoomMembers = () =>
    members.find((member) => member._id === userId);

  const getChatRoomData = async () => {
    if (!validateRoomMembers()) {
      // * members에 로그인한 유저의 정보가 없는 경우
      console.log("db members에 userid를 추가하는 api");
    }
    const { data } = await getChatRoomAPI(_id);
    dispatch(chatActions.setChatRoom(data));
  };

  return (
    <Container onClick={getChatRoomData}>
      <div className="title-wrapper">
        <h3>{title}</h3>
      </div>
      <div className="members-wrapper">
        <AvatarGroup max={4}>
          {members.map((member, index) => (
            <Avatar key={index} alt={member.name} src={member.profileImage} />
          ))}
        </AvatarGroup>
      </div>
    </Container>
  );
};

export default React.memo(Room);
