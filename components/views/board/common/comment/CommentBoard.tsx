/*
  TODO : comment counter, comment input, comment list의 부모 컴포넌트 입니다.
*/

import React, { useState, useMemo } from "react";
import styled from "styled-components";
import palette from "../../../../../styles/palette";
import { useDispatch } from "react-redux";
import { useSelector } from "../../../../../store";
import { boardActions } from "../../../../../store/board";

// * children component
import Counter from "../Counter";
import CommentInput from "./CommentInput";

// * MUI component
import { Stack } from "@mui/material";
import Comment from "./Comment";

// * API
import { commentAPI } from "../../../../../lib/api/board";

// * constant
import { REGEX } from "../../../../../components/auth/constant";

const Container = styled.div`
  width: 100%;
`;

const CommentBoard: React.FC = () => {
  const dispatch = useDispatch();
  const comment = useSelector((state) => state.board.detail?.comment);
  const replies = useSelector((state) => state.board.detail?.replies);
  const isLogged = useSelector((state) => state.user.isLogged);
  const userId = useSelector((state) => state.user._id);
  const postId = useSelector((state) => state.board.detail?._id);

  const [commentText, setCommentText] = useState<string>("");

  const onChangeCommentText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value);
  };

  const isCommentTextHasString = useMemo(() => commentText.match(REGEX), [
    commentText,
  ]);

  const onSubmitComment = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    // * 댓글에 내용이 없는 경우 submit을 중단합니다.
    if (isCommentTextHasString === null) {
      return;
    }
    // * request body를 생성하고 api를 호출한 결과를 store에 업데이트 합니다.
    const requestBody = {
      userId,
      content: commentText,
      responseTo: postId as string,
    };
    const { data } = await commentAPI(requestBody);
    dispatch(boardActions.setDetail(data));
    setCommentText("");
  };

  return (
    <Container>
      <Stack spacing={2} direction="column">
        <Counter counter={comment.length + replies.length} />
        {isLogged && (
          <CommentInput
            value={commentText}
            onChange={onChangeCommentText}
            onSubmitComment={onSubmitComment}
          />
        )}
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
