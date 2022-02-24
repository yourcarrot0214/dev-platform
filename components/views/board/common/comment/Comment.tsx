/*
  TODO : Comment 정보를 출력하는 컴포넌트 입니다.
    ? UserTab, Content, MenuButtons, Replies의 부모 컴포넌트 입니다.
*/

import React, { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import palette from "../../../../../styles/palette";
import { useDispatch } from "react-redux";
import { useSelector } from "../../../../../store";
import { CommentType } from "../../../../../types/post";
import {
  deleteCommentAPI,
  getCommentListAPI,
  updateCommentAPI,
} from "../../../../../lib/api/board";
import { boardActions } from "../../../../../store/board";

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
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user._id);
  const isLogged = useSelector((state) => state.user.isLogged);
  const repliesState = useSelector((state) => state.board.detail?.replies);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>(comment.content);
  const [updatedText, setUpdatedText] = useState<string>(comment.content);
  const [repliesOpen, setRepliesOpen] = useState<boolean>(false);

  const onUpdate = useCallback(() => setEditMode(!editMode), [editMode]);

  const onDelete = async () => {
    const confirm = window.confirm("댓글을 삭제하시겠습니까?");
    if (confirm) {
      try {
        await deleteCommentAPI(comment._id);
        dispatch(boardActions.deleteDetailComment(comment._id));
      } catch (error) {
        console.log(">> comment delete error : ", error);
      }
    }
  };
  const onChangeCommentText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedText(event.target.value);
  };
  const onRepliesToggle = useCallback(() => setRepliesOpen(!repliesOpen), [
    !repliesOpen,
  ]);
  const repliesList = useMemo(
    () => repliesState?.filter((replies) => replies.responseTo === comment._id),
    [repliesState]
  );

  const onUpdateComment = async () => {
    if (!updatedText || commentText === updatedText) {
      return alert("변경된 내용을 입력해 주세요.");
    }

    try {
      const requestBody = {
        content: updatedText,
      };
      const { data } = await updateCommentAPI(comment._id, requestBody);
      dispatch(boardActions.updateDetailComment(data));
      setCommentText(data.content);
      setEditMode(false);
    } catch (error) {
      console.log(">> comment update error : ", error);
    }
  };

  return (
    <Container>
      <Stack spacing={2} direction="column">
        <Stack
          spacing={2}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <UserTab
            author={comment.author}
            createdAt={comment.createdAt}
            updatedAt={comment.updatedAt}
          />
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
        {repliesList.length === 0 && !isLogged ? null : (
          <RepliesButton
            onClick={onRepliesToggle}
            open={repliesOpen}
            count={repliesList.length}
          />
        )}
        {repliesOpen && (
          <RepliesBoard repliesList={repliesList} commentId={comment._id} />
        )}
      </Stack>
    </Container>
  );
};

export default React.memo(Comment);
