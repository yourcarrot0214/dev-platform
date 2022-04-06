/*
  TODO : comment에 대한 replies 버튼을 출력합니다.
    ? props : repliesOpen
    ? repliesOpen ? "숨기기" : ${comment.replies.length}개의 답글
*/

import React from "react";
import { Button, Stack } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";

interface IProps {
  onClick: () => void;
  count: number;
  open: boolean;
}

const RepliesButton: React.FC<IProps> = ({ onClick, count, open }) => {
  return (
    <Stack spacing={2} direction="row">
      <Stack spacing={0} direction="row">
        <Button
          size="small"
          variant="text"
          color="info"
          onClick={onClick}
          startIcon={<AddBoxIcon />}
        >
          {open ? "숨기기" : count !== 0 ? `${count}개의 답글` : "답글 달기"}
        </Button>
      </Stack>
    </Stack>
  );
};

export default React.memo(RepliesButton);
