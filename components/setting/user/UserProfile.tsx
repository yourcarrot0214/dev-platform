import React, { useState, useMemo } from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";
import { useSelector } from "../../../store";
import { uploadFileAPI } from "../../../lib/api/file";
import { useDispatch } from "react-redux";

// * MUI
import { Avatar, Stack, Button } from "@mui/material";
import { userActions } from "../../../store/user";
import { patchProfileImageAPI } from "../../../lib/api/setting/user";

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

  input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`;

const UserProfile: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files && files.length > 0) {
      const file = files[0];
      const formdata = new FormData();
      formdata.append("file", file);

      try {
        const { data } = await uploadFileAPI(formdata);
        if (data) dispatch(userActions.setProfileImage(data));
        await patchProfileImageAPI({ userId: user._id, imageLocation: data });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const initProfileImage = async () => {
    dispatch(userActions.initProfileImage());
    await patchProfileImageAPI({
      userId: user._id,
      imageLocation: "/static/image/user/default_user_profile_image.jpg",
    });
  };

  return (
    <Container>
      <Stack
        spacing={2}
        direction="column"
        alignItems="center"
        sx={{ width: 300, pl: 1, pr: 1 }}
      >
        <Avatar
          alt={user.name}
          src={user.profileImage}
          sx={{ width: 100, height: 100 }}
        />
        <Button variant="contained" color="info" size="small">
          <input type="file" accept="image/*" onChange={uploadImage} />
          이미지 업로드
        </Button>
        <Button
          variant="text"
          color="error"
          size="small"
          onClick={initProfileImage}
        >
          이미지 초기화
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

/*
  TODO 1. Avatar
    ? Avatar Profile Image 출력
    ? Badge button update 기능 구현
      * Badge를 클릭하면 Modal이 호출되고, Modal에 이미지 업로드, 이미지 제거 버튼 제공
    
  TODO 2. Name
    ? Name 과 Pen Icon을 출력. row 정렬로.
    ? Pen Icon 클릭시 Name 수정 기능을 제공
*/
