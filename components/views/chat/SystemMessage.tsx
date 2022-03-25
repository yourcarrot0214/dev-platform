import React from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0.5rem;

  .message {
    text-align: center;
    font-size: 0.8rem;
    color: ${palette.gray_71};
    margin-bottom: 0.5rem;
  }
`;

// ! socket timestamp 추가 후 props 추가
interface IProps {
  message: string;
  timestamp: string;
}

const SystemMessage: React.FC<IProps> = ({ message, timestamp }) => {
  return (
    <Container>
      <h3 className="message">📣 {message}</h3>
      <h3 className="message">🕓 {timestamp}</h3>
    </Container>
  );
};

export default React.memo(SystemMessage);
