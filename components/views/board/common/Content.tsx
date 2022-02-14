/*
  TODO 1. comment, replies의 content를 출력합니다.
  TODO 2. 부모 컴포넌트에서 editMode toggle시 출력/입력 컴포넌트가 전환됩니다.
*/

import React from "react";
import styled from "styled-components";
import palette from "../../../../styles/palette";

// * MUI
import { TextField, Button } from "@mui/material";

const Container = styled.div`
  width: 100%;

  .MuiFormControl-root {
    margin: 0;
  }
`;

interface IProps {
  editMode: boolean;
  text: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Content: React.FC<IProps> = ({ editMode, text, onChange }) => {
  return (
    <Container className="content-container">
      {editMode ? (
        <TextField
          variant="outlined"
          multiline
          minRows={3}
          fullWidth
          margin="normal"
          value={text}
          onChange={onChange}
        />
      ) : (
        // CommentUpdateOptionButtons 적용
        <TextField
          variant="standard"
          multiline
          minRows={3}
          fullWidth
          margin="normal"
          inputProps={{ readOnly: true }}
          value={text}
        />
      )}
    </Container>
  );
};

export default React.memo(Content);
