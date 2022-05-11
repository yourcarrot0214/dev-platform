import React from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";
import { useDispatch } from "react-redux";
import { useSelector } from "../../../store";
import { getChatRoomAPI, joinChatRoomAPI } from "../../../lib/api/chat";
import { chatActions } from "../../../store/chat";

// * MUI
import { Avatar, AvatarGroup } from "@mui/material";

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
  const user = useSelector((state) => state.user);

  const validateRoomMembers = () =>
    members.find((member) => member._id === user._id);

  const getChatRoomData = async () => {
    if (!validateRoomMembers()) {
      await joinChatRoomAPI({ roomId: _id, userId: user._id });
      let updateData = {
        _id,
        members: [
          ...members,
          { _id: user._id, name: user.name, profileImage: user.profileImage },
        ],
      };
      dispatch(chatActions.updateChatMembers(updateData));
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
