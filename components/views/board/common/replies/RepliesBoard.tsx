/*
  TODO : RepliesInput, Replies의 부모 컴포넌트 입니다.
    ? replies 입력 컴포넌트를 출력합니다.
    ? replies의 갯수만큼 Replies 컴포넌트를 출력합니다.
*/

import React, { useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import palette from "../../../../../styles/palette";
import { useSelector } from "../../../../../store";
import { RepliesType } from "../../../../../types/post";
import { Stack } from "@mui/material";
import RepliesInput from "./RepliesInput";
import Replies from "./Replies";

const Container = styled.div`
  width: 100%;
  .replies-wrapper {
    padding-left: 50px;
  }
`;

interface IProps {
  repliesList: RepliesType[] | undefined;
}

const RepliesBoard: React.FC<IProps> = ({ repliesList }) => {
  const userId = useSelector((state) => state.user._id);

  const [editMode, setEditMode] = useState<boolean>(false);
  const [repliesText, setRepliesText] = useState<string>("");

  const onChangeRepliesText = (event: React.ChangeEvent<HTMLInputElement>) =>
    setRepliesText(event.target.value);

  const onSubmitReplies = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setRepliesText("");
  };

  return (
    <Container>
      <Stack spacing={2} direction="column">
        <div className="replies-wrapper">
          {repliesList.map((reply) => (
            <Replies key={reply._id} replies={reply} />
          ))}
        </div>
        <RepliesInput
          value={repliesText}
          onChange={onChangeRepliesText}
          onSubmit={onSubmitReplies}
        />
      </Stack>
    </Container>
  );
};

export default React.memo(RepliesBoard);
