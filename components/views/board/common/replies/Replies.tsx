import React, { useState, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import palette from "../../../../../styles/palette";
import { useSelector } from "../../../../../store";
import { boardActions } from "../../../../../store/board";

import UserTab from "../UserTab";
import Content from "../Content";
import MenuButtons from "../MenuButtons";

import { Stack } from "@mui/material";
import { RepliesType } from "../../../../../types/post";
import { deleteRepliesAPI } from "../../../../../lib/api/board";

const Container = styled.div`
  width: 100%;
`;

interface IProps {
  replies: RepliesType;
}

const Replies: React.FC<IProps> = ({ replies }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user._id);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [repliesText, setRepliesText] = useState<string>(replies.content);
  const [updatedText, setUpdatedText] = useState<string>(replies.content);

  const onUpdateMode = useCallback(() => setEditMode(!editMode), [editMode]);
  const onDelete = async () => {
    const confirm = window.confirm("댓글을 삭제하시겠습니까?");
    if (confirm) {
      try {
        await deleteRepliesAPI(replies._id);
        dispatch(boardActions.deleteDetailReplies(replies._id));
      } catch (error) {
        console.log(">> replies delete error : ", error);
      }
    }
  };
  const onUpdateReplies = useCallback(() => setEditMode(!editMode), [editMode]);

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUpdatedText(event.target.value);

  return (
    <Container>
      <Stack spacing={2} direction="column">
        <Stack
          spacing={2}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <UserTab author={replies.author} createdAt={replies.createdAt} />
          {userId === replies.author._id && !editMode && (
            <MenuButtons onUpdate={onUpdateMode} onDelete={onDelete} />
          )}
        </Stack>
        <Content
          editMode={editMode}
          text={editMode ? updatedText : repliesText}
          onChange={onChangeText}
          onCancle={onUpdateMode}
          onSubmit={onUpdateReplies}
        />
      </Stack>
    </Container>
  );
};

export default React.memo(Replies);
