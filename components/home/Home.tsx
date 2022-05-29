import React from "react";
import styled from "styled-components";

import LandingPage from "./landingPage/Index";

const Container = styled.div`
  padding: 96px 1rem 1rem;
  margin-top: -80px;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(
    132deg,
    #24c6dc,
    #3494e6,
    #ec6ead,
    #f80759,
    #bc4e9c
  );
  background-size: 400% 400%;
  animation: Gradient 60s ease infinite;

  @keyframes Gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .card-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 0 auto;
    width: 100%;
    margin-bottom: 2rem;

    @media screen and (min-width: 800px) {
      max-width: 1440px;
      margin: 0 auto;
      margin-bottom: 2rem;
      align-items: flex-start;
    }

    .title {
      font-size: 2.5rem;
      font-weight: bold;
      margin-left: 1rem;
      margin-bottom: 2rem;
      color: #222222;
    }

    .card-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-wrap: wrap;

      @media screen and (min-width: 800px) {
        flex-direction: row;
      }
    }
  }
`;

const Home: React.FC = () => {
  return (
    <Container>
      <LandingPage />
    </Container>
  );
};

export default Home;
