/*
  TODO : RepliesInput, Replies의 부모 컴포넌트 입니다.
    ? replies 입력 컴포넌트를 출력합니다.
    ? replies의 갯수만큼 Replies 컴포넌트를 출력합니다.
*/

import React, { useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import palette from "../../../../../styles/palette";
import { useDispatch } from "react-redux";
import { useSelector } from "../../../../../store";
import { RepliesType } from "../../../../../types/post";
import { repliesAPI } from "../../../../../lib/api/board";
import { Stack } from "@mui/material";
import RepliesInput from "./RepliesInput";
import Replies from "./Replies";

// * constant
import { REGEX } from "../../../../../components/auth/constant";
import { boardActions } from "../../../../../store/board";

const Container = styled.div`
  width: 100%;
  .replies-wrapper {
    padding-left: 50px;
  }
`;

interface IProps {
  repliesList: RepliesType[] | undefined;
  commentId: string;
}

const RepliesBoard: React.FC<IProps> = ({ repliesList, commentId }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user._id);
  const postId = useSelector((state) => state.board.detail!.post._id);
  const isLogged = useSelector((state) => state.user.isLogged);

  const [editMode, setEditMode] = useState<boolean>(false);
  const [repliesText, setRepliesText] = useState<string>("");

  const onChangeRepliesText = (event: React.ChangeEvent<HTMLInputElement>) =>
    setRepliesText(event.target.value);

  const isRepliesTextHasString = useMemo(() => repliesText.match(REGEX), [
    repliesText,
  ]);

  const onSubmitReplies = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    if (isRepliesTextHasString === null) {
      return;
    }

    const requestBody = {
      userId,
      content: repliesText,
      responseTo: commentId,
      postId,
    };
    const { data } = await repliesAPI(requestBody);
    dispatch(boardActions.setDetailReplies(data));

    setRepliesText("");
  };

  return (
    <Container>
      <Stack spacing={2} direction="column">
        <div className="replies-wrapper">
          {repliesList?.map((reply) => (
            <Replies key={reply._id} replies={reply} />
          ))}
        </div>
        {isLogged && (
          <RepliesInput
            value={repliesText}
            onChange={onChangeRepliesText}
            onSubmit={onSubmitReplies}
          />
        )}
      </Stack>
    </Container>
  );
};

export default React.memo(RepliesBoard);
