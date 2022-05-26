import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";

import {
  frontendBadges,
  backendBadges,
  utilsBadges,
} from "../../lib/data/skillBadges";

const Container = styled.div`
  .title-wrapper {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    border: 1px dashed black;
    display: flex;
    flex-direction: column;

    h1 {
      background: linear-gradient(to right, #330867 0%, #0072f5 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 10rem;
      font-weight: 800;
      padding: 1rem;
      font-family: Bebas Neue;
      margin: 0;
    }

    h2 {
      /* font-color */
      margin: 0;
      font-size: 5rem;
      font-weight: 800;
      padding: 1rem;
      font-family: Bebas Neue;
      color: #161616;
    }
  }

  .sales-section {
    display: flex;
    flex-direction: row;

    .card-section-wrapper {
      border: 1px dashed black;
      .card-section {
        margin-bottom: 1rem;
        .card-name {
          /* font-color */
          margin: 0;
          font-size: 2.5rem;
          font-weight: 800;
          padding: 1rem;
          font-family: Bebas Neue;
          color: ${palette.snow};
        }
        .card-list {
          padding-left: 1rem;
        }
      }
    }

    .user-section-wrapper {
      width: 300px;
      border: 1px dashed black;

      .user-profile-image-wrapper {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 1rem;
        margin-bottom: 1rem;
        img {
          width: 50%;
          margin: 0 auto;
          /* guide line */
          border: 3px solid white;
          border-radius: 50%;
        }
      }

      .user-description-wrapper {
        /* guide line */
        border: 1px dashed black;
        font-family: Bebas Neue;

        width: 100%;

        .user-name {
          text-align: center;
          margin: 0;
          font-size: 2.5rem;
          font-weight: 800;
          color: #161616;
        }

        .user-description {
          .info {
            text-align: center;
            margin: 0;
            font-size: 1.5rem;
            color: #161616;
          }
        }
      }
    }
  }
`;

const LandingPage = () => {
  return (
    <Container>
      <div className="title-wrapper">
        <h1>Hello, World!</h1>
        <h2>sale for Front-End Developer!</h2>
        <div className="sales-section">
          {/* user section */}
          <div className="user-section-wrapper">
            <div className="user-profile-image-wrapper">
              <img src="/static/svg/avatar32.png" alt="profile" />
            </div>
            <div className="user-description-wrapper">
              <h3 className="user-name">Carrot</h3>
              <div className="user-description">
                <h3 className="info">self driven developer</h3>
                <h3 className="info">💰 2.5M / month</h3>
              </div>
            </div>
          </div>

          {/* card section */}
          <div className="card-section-wrapper">
            <div className="card-section">
              <h3 className="card-name">Front-End</h3>
              <div className="card-list">
                {frontendBadges.map((skill) => (
                  <img src={skill.src} alt={skill.alt} />
                ))}
              </div>
            </div>
            <div className="card-section">
              <h3 className="card-name">Back-End</h3>
              <div className="card-list">
                {backendBadges.map((skill) => (
                  <img src={skill.src} alt={skill.alt} />
                ))}
              </div>
            </div>
            <div className="card-section">
              <h3 className="card-name">Utils</h3>
              <div className="card-list">
                {utilsBadges.map((skill) => (
                  <img src={skill.src} alt={skill.alt} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LandingPage;
