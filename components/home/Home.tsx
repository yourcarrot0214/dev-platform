import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import Mui from "../widgets/Mui";

const Container = styled.div`
  width: 100%;
  padding: 0 80px;
`;

const Home: React.FC = () => {
  return (
    <Container>
      <h1>HOME</h1>
    </Container>
  );
};

export default Home;
