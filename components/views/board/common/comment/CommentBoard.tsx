/*
  TODO : comment counter, comment input, comment list의 부모 컴포넌트 입니다.
*/

import React, { useState } from "react";
import styled from "styled-components";
import palette from "../../../../../styles/palette";
import { useSelector } from "../../../../../store";

// * children component
import Counter from "../Counter";
import CommentInput from "./CommentInput";

// * MUI component
import { Stack } from "@mui/material";
import Comment from "./Comment";

const Container = styled.div`
  width: 100%;
`;

const CommentBoard: React.FC = () => {
  const comment = useSelector((state) => state.board.detail?.comment);
  const replies = useSelector((state) => state.board.detail?.replies);
  const [commentText, setCommentText] = useState<string>("");
  const [repliesText, setRepliesText] = useState<string>("");

  const onChangeCommentText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value);
  };

  const onSubmitComment = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setCommentText("");
  };

  const onChangeRepliesText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepliesText(event.target.value);
  };

  const onSubmitReplies = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setRepliesText("");
  };

  return (
    <Container>
      <Stack spacing={2} direction="column">
        <Counter counter={comment.length + replies.length} />
        <CommentInput
          value={commentText}
          onChange={onChangeCommentText}
          onSubmitComment={onSubmitComment}
        />
      </Stack>
      <Stack spacing={0} direction="column">
        {comment?.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </Stack>
    </Container>
  );
};

export default React.memo(CommentBoard);
