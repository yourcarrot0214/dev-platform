/*
  TODO : comment를 입력하고 db에 업데이트 합니다.
*/

import React from "react";
import styled from "styled-components";
import palette from "../../../../../styles/palette";

// * MUI
import { TextField, Stack, Button } from "@mui/material";

const Container = styled.div`
  width: 100%;
`;

interface IProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitComment: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CommentInput: React.FC<IProps> = ({
  value,
  onChange,
  onSubmitComment,
}) => {
  return (
    <Container>
      <Stack spacing={2} direction="column" alignItems="flex-end">
        <TextField
          id="comment"
          label="comment"
          variant="outlined"
          value={value}
          onChange={onChange}
          margin="normal"
          fullWidth
          multiline
          rows={3}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={(event) => onSubmitComment(event)}
        >
          댓글 작성
        </Button>
      </Stack>
    </Container>
  );
};

export default React.memo(CommentInput);
