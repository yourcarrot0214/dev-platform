/*
  TODO : 댓글의 수정, 삭제 버튼을 출력합니다.
    ? props : editMode, onUpdate, onDelete
*/

import React from "react";
import { Button, Stack } from "@mui/material";

interface IProps {
  onUpdate: () => void;
  onDelete: () => void;
}

const MenuButtons: React.FC<IProps> = ({ onUpdate, onDelete }) => {
  console.log("MenuButtons Component rendering");
  return (
    <Stack spacing={2} direction="row">
      <Stack spacing={0} direction="row">
        <Button size="small" variant="text" color="info" onClick={onUpdate}>
          수정
        </Button>
        <Button size="small" variant="text" color="info" onClick={onDelete}>
          삭제
        </Button>
      </Stack>
    </Stack>
  );
};

export default React.memo(MenuButtons);
