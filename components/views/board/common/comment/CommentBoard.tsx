/*
  TODO : comment counter, comment input, comment list의 부모 컴포넌트 입니다.
*/

import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useSelector } from "../../../../../store";
import { boardActions } from "../../../../../store/board";

// * children component
import Counter from "../Counter";
import CommentInput from "./CommentInput";

// * MUI component
import { Stack, Alert } from "@mui/material";
import Comment from "./Comment";

// * API
import { commentAPI } from "../../../../../lib/api/board";

// * constant
import { REGEX } from "../../../../../components/auth/constant";
import { CommentType, RepliesType } from "../../../../../types/post";

const Container = styled.div`
  width: 100%;
`;

const CommentBoard: React.FC = () => {
  const dispatch = useDispatch();
  const commentState: CommentType[] | undefined = useSelector(
    (state) => state.board.detail?.comment
  );
  const repliesState: RepliesType[] | undefined = useSelector(
    (state) => state.board.detail?.replies
  );
  const isLogged: boolean = useSelector((state) => state.user.isLogged);
  const userId: string = useSelector((state) => state.user._id);
  const postId: string | undefined = useSelector(
    (state) => state.board.detail?.post._id
  );

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
      postId: postId as string,
    };
    const { data } = await commentAPI(requestBody);
    dispatch(boardActions.setDetailComment(data));
    setCommentText("");
  };

  return (
    <Container>
      <Stack spacing={2} direction="column">
        <Counter counter={commentState!.length + repliesState!.length} />
        {isLogged ? (
          <CommentInput
            value={commentText}
            onChange={onChangeCommentText}
            onSubmitComment={onSubmitComment}
          />
        ) : (
          <Alert severity="warning" variant="filled">
            댓글 작성은 로그인 된 유저에게만 제공됩니다.
          </Alert>
        )}
      </Stack>
      <Stack spacing={0} direction="column">
        {commentState?.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </Stack>
    </Container>
  );
};

export default React.memo(CommentBoard);
