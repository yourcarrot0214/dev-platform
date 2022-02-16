/*
  TODO : replies를 입력하고 정보를 db에 전달합니다.
*/
import React from "react";
import styled from "styled-components";
import palette from "../../../../../styles/palette";

// * MUI
import { TextField, Stack, Button } from "@mui/material";

const Container = styled.div`
  width: 100%;
  padding-left: 50px;
`;

interface IProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const RepliesInput: React.FC<IProps> = ({ value, onChange, onSubmit }) => {
  return (
    <Container>
      <Stack spacing={2} direction="column" alignItems="flex-end">
        <TextField
          id="replies"
          label="replies"
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
          color="success"
          size="large"
          onClick={onSubmit}
        >
          댓글 작성
        </Button>
      </Stack>
    </Container>
  );
};

export default React.memo(RepliesInput);
