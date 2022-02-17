/*
  TODO : Comment 정보를 출력하는 컴포넌트 입니다.
    ? UserTab, Content, MenuButtons, Replies의 부모 컴포넌트 입니다.
*/

import React, { useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import palette from "../../../../../styles/palette";
import { useSelector } from "../../../../../store";
import { CommentType } from "../../../../../types/post";

// * children component
import UserTab from "../UserTab";
import Content from "../Content";
import MenuButtons from "../MenuButtons";
import RepliesButton from "../RepliesButton";
import RepliesBoard from "../replies/RepliesBoard";

// * MUI
import { Stack } from "@mui/material";

const Container = styled.div`
  width: 100%;
`;

interface IProps {
  comment: CommentType;
}

const Comment: React.FC<IProps> = ({ comment }) => {
  const userId = useSelector((state) => state.user._id);
  const replies = useSelector((state) => state.board.detail?.replies);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>(comment.content);
  const [updatedText, setUpdatedText] = useState<string>(comment.content);
  const [repliesOpen, setRepliesOpen] = useState<boolean>(false);

  const onUpdate = useCallback(() => setEditMode(!editMode), [editMode]);
  const onDelete = useCallback(() => setEditMode(!editMode), [editMode]);
  const onChangeCommentText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedText(event.target.value);
  };
  const onRepliesToggle = useCallback(() => setRepliesOpen(!repliesOpen), [
    !repliesOpen,
  ]);
  const repliesList = useMemo(
    () => replies?.filter((reply) => reply.responseTo === comment._id),
    [replies]
  );

  // ! API 구현
  const onUpdateComment = useCallback(() => setEditMode(!editMode), [editMode]);

  return (
    <Container>
      <Stack spacing={2} direction="column">
        <Stack
          spacing={2}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <UserTab author={comment.author} createdAt={comment.createdAt} />
          {userId === comment.author._id && !editMode && (
            <MenuButtons onUpdate={onUpdate} onDelete={onDelete} />
          )}
        </Stack>
        <Content
          editMode={editMode}
          text={editMode ? updatedText : commentText}
          onChange={onChangeCommentText}
          onCancle={onUpdate}
          onSubmit={onUpdateComment}
        />
        <RepliesButton
          onClick={onRepliesToggle}
          open={repliesOpen}
          count={repliesList.length}
        />
        {repliesOpen && <RepliesBoard repliesList={repliesList} />}
      </Stack>
    </Container>
  );
};

export default React.memo(Comment);

/*
  TODO 1. Replies Input Component
  TODO 2. Replies Component
  TODO 3. Replies Board Component
*/
