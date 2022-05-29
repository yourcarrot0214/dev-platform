import React from "react";
import styled from "styled-components";

import TitleHeader from "./TitleHeader";
import UserSection from "./UserSection";
import SkillSection from "./SkillSection";
import ImplementSection from "./ImplementSection";
import ProjectSection from "./ProjectSection";

const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  .title-wrapper {
    display: flex;
    flex-direction: column;
    width: 65%;
  }
  .sales-section {
    display: flex;
    flex-direction: row;
  }
  .makes-wrapper {
    width: 35%;
    margin-top: 356px;
  }

  @media screen and (max-width: 1440px) {
    flex-direction: column;
    .title-wrapper {
      width: 100%;
      margin-bottom: 3rem;
      margin: 0 auto;
    }
    .makes-wrapper {
      margin-top: 0;
      padding: 2rem;
      width: 100%;
      display: flex;
      flex-direction: row;
    }
  }

  @media screen and (max-width: 800px) {
    .sales-section {
      flex-direction: column;
    }
    .makes-wrapper {
      flex-direction: column;
      padding: 0;
    }
  }

  @media screen and (max-width: 500px) {
    .title-wrapper {
      .sales-section {
        margin-bottom: 2rem;
      }
    }
  }
`;

const LandingPage = () => {
  return (
    <Container>
      <div className="title-wrapper">
        <TitleHeader />
        <div className="sales-section">
          <UserSection />
          <SkillSection />
        </div>
      </div>
      <div className="makes-wrapper">
        <ImplementSection />
        <ProjectSection />
      </div>
    </Container>
  );
};

export default LandingPage;
