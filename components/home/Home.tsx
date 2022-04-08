import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";

import CardSection from "../common/CardSection";

// * MUI
import { Grid } from "@mui/material";

const Container = styled.div`
  width: 100%;
  padding: 40px 80px;

  .card-wrapper {
    display: flex;
    flex-direction: column;
  }
`;

const Home: React.FC = () => {
  return (
    <Container>
      <h1>HOME</h1>
      <div className="card-wrapper">
        <CardSection />
        <CardSection />
        <CardSection />
      </div>
    </Container>
  );
};

export default Home;
