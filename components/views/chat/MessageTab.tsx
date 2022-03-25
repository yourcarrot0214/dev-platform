import React from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";

// * MUI
import { Avatar, Stack } from "@mui/material";

const Container = styled.div<{ isMine: boolean }>`
  /* border: 1px solid red; */
  margin-left: ${(props) => (props.isMine ? "50%" : "0")};
  margin-right: ${(props) => (props.isMine ? "0" : "50%")};

  .wrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;

    .user-name {
      font-size: 0.8rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
      color: ${palette.gray_48};
    }

    .message {
      border-radius: 8px;
      padding: 1rem;
      background-color: ${palette.gray_eb};
      font-size: 0.8rem;
      line-height: 1.5;
    }
  }

  .time-stamp-wrapper {
    display: flex;
    flex-direction: column-reverse;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    margin-bottom: 1rem;
    font-size: 0.7rem;
  }
`;

interface IProps {
  name: string;
  profileImage: string;
  message: string;
  isMine: boolean;
  timestamp: string;
}

const MessageTab: React.FC<IProps> = ({
  name,
  profileImage,
  message,
  isMine,
  timestamp,
}) => {
  return (
    <Container isMine={isMine}>
      <Stack direction="row" spacing={1}>
        <Avatar
          alt={name}
          src={profileImage}
          variant="rounded"
          sx={{ width: 32, height: 32 }}
        />
        <div className="wrapper">
          <span className="user-name">{name}</span>
          <span className="message">{message}</span>
        </div>
        <div className="time-stamp-wrapper">
          <span className="time-stamp">
            {/* ! dummy data -> props로 전달받은 데이터로 변경 */}
            {timestamp}
          </span>
        </div>
      </Stack>
    </Container>
  );
};

export default React.memo(MessageTab);
