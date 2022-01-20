import React from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";
import Button from "./component/Button";

const Container = styled.div`
  width: 100%;
  padding: 0 80px;
`;

const MaterialUI: React.FC = () => {
  return (
    <Container>
      <h1>Material UI Component</h1>
      <Button />
    </Container>
  );
};

export default MaterialUI;
