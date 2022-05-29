import React from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";
import {
  frontendBadges,
  backendBadges,
  utilsBadges,
} from "../../../lib/data/skillBadges";

const Container = styled.div`
  .skill-section-wrapper {
    width: 65%;
    .skill-section {
      margin-bottom: 1rem;
      width: 450px;
      .card-name {
        margin: 0;
        font-size: 2.5rem;
        font-weight: 800;
        padding: 1rem;
        font-family: Bebas Neue;
        color: ${palette.black};
      }
      .card-list {
        padding-left: 1rem;
      }
    }
  }
  @media screen and (max-width: 800px) {
    .skill-section-wrapper {
      width: 100%;
      .skill-section {
        width: 100%;
      }
    }
  }
`;

const SkillSection = () => {
  return (
    <Container>
      <div className="skill-section-wrapper">
        <div className="skill-section">
          <h3 className="card-name">Front-End</h3>
          <div className="card-list front-end">
            {frontendBadges.map((skill) => (
              <img src={skill.src} alt={skill.alt} key={skill.id} />
            ))}
          </div>
        </div>
        <div className="skill-section">
          <h3 className="card-name">Server & DB</h3>
          <div className="card-list">
            {backendBadges.map((skill) => (
              <img src={skill.src} alt={skill.alt} key={skill.id} />
            ))}
          </div>
        </div>
        <div className="skill-section">
          <h3 className="card-name">Utils</h3>
          <div className="card-list">
            {utilsBadges.map((skill) => (
              <img src={skill.src} alt={skill.alt} key={skill.id} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default React.memo(SkillSection);
