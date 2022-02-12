/*
  TODO : comment counter, comment input, comment list의 부모 컴포넌트 입니다.
*/

import React, { useState } from "react";
import styled from "styled-components";
import palette from "../../../../styles/palette";
import { useSelector } from "../../../../store";

// * children component
import Counter from "./Counter";
import CommentInput from "./CommentInput";

// * MUI component
import { Stack } from "@mui/material";

const Container = styled.div`
  width: 100%;
`;

const CommentBoard: React.FC = () => {
  const comment = useSelector((state) => state.board.detail?.comment);
  const replies = useSelector((state) => state.board.detail?.replies);
  const [text, setText] = useState<string>("");

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const onSubmitComment = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setText("");
  };

  return (
    <Container>
      <Stack spacing={2} direction="column">
        <Counter counter={comment.length + replies.length} />
        <CommentInput
          value={text}
          onChange={onChangeText}
          onSubmitComment={onSubmitComment}
        />
      </Stack>
    </Container>
  );
};

export default React.memo(CommentBoard);
