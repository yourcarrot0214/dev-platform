import React from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";

const Container = styled.div`
  .project-section {
    width: 100%;
    margin-bottom: 2rem;
    .card-name {
      margin: 0;
      font-size: 2.5rem;
      font-weight: 800;
      padding: 0 1rem;
      font-family: Bebas Neue;
      color: ${palette.black};
    }
    .project-card {
      background: rgba(255, 255, 255, 0.3);
      margin: 1rem;
      padding: 1rem;
      border-radius: 6px;
      .project-name {
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
        transition: 0.3s;
        :hover {
          transform: translateY(-3px);
        }
        a {
          color: ${palette.black};
          text-decoration: none;
          transition: 0.5s;
          :hover {
            color: ${palette.snow};
          }
        }
      }
      .project-description {
        font-size: 0.9rem;
        margin: 0;
      }
      .project-link-button {
      }
    }
  }
`;

const ProjectSection = () => {
  return (
    <Container>
      <div className="project-section">
        <h3 className="card-name">deployed Project</h3>
        <div className="project-card">
          <div className="project-name">
            <a
              rel="noreferrer"
              href="https://yourcarrot0214.github.io/carrotfield/#/"
              target="_blank"
            >
              CarrotField π
            </a>
          </div>
          <p className="project-description">
            νΈμν°μ νΈμ κΈ°λ₯μ ν΄λ‘ ν μλΉμ€ μλλ€. Firebase APIμ κΈ°λ°ν
            νμκ°μ, μμ λ‘κ·ΈμΈ, κ²μκΈ CRUD κΈ°λ₯μ μ κ³΅ν©λλ€.
          </p>
        </div>
        <div className="project-card">
          <div className="project-name">
            <a
              rel="noreferrer"
              href="https://devcarrot-skilltree.herokuapp.com/"
              target="_blank"
            >
              Skill Tree π
            </a>
          </div>
          <p className="project-description">
            React, Node, Express, MongoDBλ₯Ό κΈ°λ°μΌλ‘ ν μ€ν°λ&νλ‘μ νΈ μ»€λ?€λν°
            μλΉμ€ μλλ€.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default React.memo(ProjectSection);
