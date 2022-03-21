import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import Mui from "./Mui";
import Board from "./Board";
import Chat from "./Chat";

const Container = styled.div`
  width: 100px;
  height: 600px;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;

  a {
    margin-bottom: 6px;
  }
`;

const WidgetBar: React.FC = () => {
  return (
    <Container>
      <Mui />
      <Board />
      <Chat />
    </Container>
  );
};

export default WidgetBar;
