import React, { useState, useMemo } from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";
import { useSelector } from "../../../store";

// * MUI
import { Avatar, Stack, Button } from "@mui/material";

const Container = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: row;

  .user-name {
    font-size: 2rem;
    font-weight: bold;
    color: ${palette.black};
  }
`;

const UserProfile: React.FC = () => {
  const user = useSelector((state) => state.user);
  return (
    <Container>
      <Stack spacing={2} direction="column" sx={{ width: 100, mr: 2 }}>
        <Avatar
          alt={user.name}
          src={user.profileImage}
          sx={{ width: 56, height: 56 }}
        />
        <Button variant="contained" color="info" size="small">
          이미지 업로드
        </Button>
        <Button variant="text" color="error" size="small">
          이미지 제거
        </Button>
      </Stack>
      <Stack spacing={2} direction="column" alignItems="flex-start">
        <h1 className="user-name">{user.name}</h1>
        <p className="user-email">{user.email}</p>
        <Button variant="text" size="small" color="success">
          수정
        </Button>
      </Stack>
    </Container>
  );
};

export default React.memo(UserProfile);
