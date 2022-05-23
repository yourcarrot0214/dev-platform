import React, { useState, useMemo, useRef } from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";
import { useSelector } from "../../../store";
import { uploadFileAPI } from "../../../lib/api/file";
import { useDispatch } from "react-redux";
import { useRouter } from "next/dist/client/router";

// * MUI
import { Avatar, Stack, Button, IconButton } from "@mui/material";
import { userActions } from "../../../store/user";
import {
  updateProfileImageAPI,
  updateUserNameAPI,
} from "../../../lib/api/setting/user";
import EditIcon from "@mui/icons-material/Edit";
import { secessionAPI } from "../../../lib/api/auth";

const Container = styled.div`
  width: 80%;
  margin: 1rem auto;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  background: ${palette.gray_eb};
  border-radius: 6px;

  .upload {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  .user-name-wrapper {
    display: flex;
    flex-direction: row;
    width: 100%;

    .user-name {
      width: auto;
      height: 46px;
      outline: none;
      border: none;
      font-size: 1.7rem;
      font-weight: bold;
      background: none;
      & :focus {
        border-color: ${palette.charcoal};
      }
    }
  }
`;

const UserProfile: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const nameRef = useRef(null);
  const router = useRouter();

  const [username, setUsername] = useState<string>(user.name);
  const [updateMode, setUpdateMode] = useState<boolean>(false);

  const onChangeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const toggleUpdateMode = () => {
    setUpdateMode((prev) => !prev);
    nameRef.current.focus();
  };

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files && files.length > 0) {
      const file = files[0];
      const formdata = new FormData();
      formdata.append("file", file);

      try {
        const { data } = await uploadFileAPI(formdata);
        if (data) dispatch(userActions.setProfileImage(data));
        await updateProfileImageAPI({ _id: user._id, profileImage: data });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const initProfileImage = async () => {
    dispatch(userActions.initProfileImage());
    await updateProfileImageAPI({
      _id: user._id,
      profileImage: "/static/image/user/default_user_profile_image.jpg",
    });
  };

  const updateUserName = async () => {
    dispatch(userActions.setUserName(username));
    await updateUserNameAPI({ _id: user._id, name: username });
  };

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      updateUserName();
      setUpdateMode(false);
    }
  };

  // ? 회원 탈퇴하기
  const secession = async () => {
    const confirm = window.confirm(
      "회원님의 모든 정보가 삭제됩니다. 탈퇴하시겠습니까?"
    );

    if (confirm) {
      await secessionAPI(user._id);
      dispatch(userActions.initUser());
      router.push("/");
    } else {
      return;
    }
  };

  return (
    <Container>
      <Stack
        spacing={2}
        direction="column"
        alignItems="center"
        sx={{ width: "200px" }}
      >
        <Avatar
          alt={user.name}
          src={user.profileImage}
          sx={{ width: 100, height: 100 }}
        />
        <Button variant="contained" color="info" size="small">
          <input
            className="upload"
            type="file"
            accept="image/*"
            onChange={uploadImage}
          />
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
      <Stack
        spacing={2}
        direction="column"
        alignItems="flex-start"
        sx={{ width: "100%" }}
      >
        <div className="user-name-wrapper">
          <input
            className="user-name"
            value={username}
            readOnly={!updateMode}
            onChange={onChangeUserName}
            autoFocus={updateMode}
            ref={nameRef}
            onKeyPress={onKeyPress}
            onSubmit={updateUserName}
          />
          <IconButton
            aria-label="edit name"
            color="info"
            onClick={toggleUpdateMode}
          >
            <EditIcon />
          </IconButton>
        </div>
        <p className="user-email">{user.email}</p>
        <Button
          color="error"
          variant="outlined"
          size="small"
          onClick={secession}
        >
          회원탈퇴하기
        </Button>
      </Stack>
    </Container>
  );
};

export default React.memo(UserProfile);

/*
  TODO 1. 회원 이름 변경 기능 구현
    ? function
      * change button -> name element updatedMode toggle -> readonly true/false
      * name element -> update db api, store dispatch api, updateMode false
    ? api
  TODO 2. 회원탈퇴 기능 구현
    ? JSX Button
    ? function
      * await secessionAPI(user._id)
      * dispatch(userActions.setInit())
      * router.push("/")
      * delete token
    ? api
      * method -> DELETE
      * path -> /api/auth/user/[id].ts

  TODO 3. css update
    ? CARD design -> figma search
*/
