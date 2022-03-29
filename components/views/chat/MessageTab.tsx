import React from "react";
import styled, { css } from "styled-components";
import palette from "../../../styles/palette";

const Container = styled.div<{ isMine: boolean }>`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => (props.isMine ? "flex-end" : "flex-start")};
  font-size: 0.8rem;
  ${(props) =>
    props.isMine &&
    css`
      margin-left: 40%;
    `};

  ${(props) =>
    !props.isMine &&
    css`
      margin-right: 40%;
    `};

  .stack {
    min-width: 30%;
    display: flex;
    flex-direction: row;

    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 6px;
    }

    .wrapper {
      margin-left: 0.5rem;
      width: 100%;

      .name-space {
        margin-bottom: 0.5rem;
        .name {
          font-weight: bold;
          font-size: 1rem;
          color: ${palette.gray_48};
        }
        .time-stamp {
          color: ${palette.gray_71};
        }
      }

      .message {
        font-size: 0.9rem;
        border-radius: 8px;
        background-color: #2196f3;
        padding: 0.7rem;
        color: white;
        line-height: 1.5;
      }
    }
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
      <div className="stack">
        <img className="avatar" src={profileImage} alt="profile" />
        <div className="wrapper">
          <div className="name-space">
            <span className="name">{name} ✍🏼 </span>
            <span className="time-stamp">{timestamp}</span>
          </div>
          <p className="message">{message}</p>
        </div>
      </div>
    </Container>
  );
};

export default React.memo(MessageTab);
