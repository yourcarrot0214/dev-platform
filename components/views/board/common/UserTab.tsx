/*
  TODO : comment, replies author의 정보와 action button을 출력합니다.
*/

import React from "react";
import styled from "styled-components";
import palette from "../../../../styles/palette";

// * MUI
import { Avatar, Button, Stack } from "@mui/material";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding: 0.5rem 0;

  .author-name {
    font-weight: bold;
  }
  .created-at {
    font-size: 12px;
    color: ${palette.gray_76};
  }
`;

type AuthorType = {
  _id: string;
  name: string;
  profileImage: string;
};

interface IProps {
  author: AuthorType;
  createdAt: string;
}

const UserTab: React.FC<IProps> = ({ author, createdAt }) => {
  return (
    <Container>
      <Stack
        spacing={2}
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Avatar
          alt={author.name}
          src={author.profileImage}
          sx={{ width: 48, height: 48 }}
        />
        <Stack spacing={1} direction="column">
          <span className="author-name">{author.name}</span>
          <span className="created-at">{createdAt}</span>
        </Stack>
      </Stack>
    </Container>
  );
};

export default React.memo(UserTab);
