import React from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";

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
  title: string;
  members: Member[];
};

const Room: React.FC<Props> = ({ title, members }) => {
  return (
    <Container>
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
