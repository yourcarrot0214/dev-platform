/*
  TODO : 댓글 수정시 취소, 수정하기 버튼을 출력합니다.
    ? props : editMode, onUpdate, onDelete
*/

import React from "react";
import { Button, Stack } from "@mui/material";

interface IProps {
  onCancle: () => void;
  onSubmit: () => void;
}

const CommentUpdateOptionButtons: React.FC<IProps> = ({
  onCancle,
  onSubmit,
}) => {
  console.log("MenuButtons Component rendering");
  return (
    <Stack spacing={2} direction="row">
      <Stack spacing={0} direction="row">
        <Button size="small" variant="text" color="info" onClick={onCancle}>
          취소
        </Button>
        <Button
          size="small"
          variant="contained"
          color="info"
          onClick={onSubmit}
        >
          댓글 수정
        </Button>
      </Stack>
    </Stack>
  );
};

export default React.memo(CommentUpdateOptionButtons);
