import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";

import {
  frontendBadges,
  backendBadges,
  utilsBadges,
} from "../../lib/data/skillBadges";

// * MUI
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import ChatIcon from "@mui/icons-material/Chat";

const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;

  border: 1px dashed black;
  flex-direction: row;

  .title-wrapper {
    display: flex;
    flex-direction: column;
    width: 65%;
    border: 1px dashed black;

    .title-header {
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
        font-size: 4rem;
        font-weight: 800;
        padding: 1rem;
        font-family: Bebas Neue;
        /* color: #161616; */
        color: ${palette.snow};
      }
    }
  }

  .sales-section {
    display: flex;
    flex-direction: row;

    border: 1px dashed blue;
    flex: 1 1 35%;

    .card-section-wrapper {
      border: 1px dashed blue;
      width: 65%;

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
      border: 1px dashed red;
      width: 35%;

      .user-profile-image-wrapper {
        /* width: 100%; */
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
        font-family: Bebas Neue;
        width: 100%;

        .user-name {
          text-align: center;
          margin: 0;
          font-size: 3rem;
          font-weight: 800;
          color: #161616;
        }

        .user-description {
          .info {
            text-align: center;
            margin: 1rem 0;
            font-size: 1.5rem;
            color: #161616;
          }
        }
      }
    }
  }

  .makes-wrapper {
    border: 1px solid white;
    width: 35%;

    .implements-wrapper,
    .projects-wrapper {
      /* border: 1px dashed black; */
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
      .widgets-wrapper {
        /* background: rgba(255, 255, 255, 0.3); */
        /* border-radius: 6px; */
        display: flex;
        flex-direction: row;
        .widget {
          width: 120px;
          /* padding: 1rem; */
          /* border: 1px solid black; */

          .widget-logo {
            font-size: 4rem;
            text-align: center;
            margin: 0;
          }
          .widget-name {
            font-size: 1rem;
            font-weight: bold;
            margin: 0;
            text-align: center;
            color: ${palette.snow};
          }
        }
      }
    }
  }

  @media screen and (max-width: 1440px) {
    flex-direction: column;

    .title-wrapper {
      width: 100%;
    }
  }

  @media screen and (max-width: 800px) {
    .title-wrapper {
      .title-header {
        h1 {
          font-size: 5rem;
        }
        h2 {
          font-size: 2.4rem;
        }
      }
    }

    .sales-section {
      flex-direction: column;

      .user-section-wrapper {
        width: 100%;
        .user-profile-image-wrapper {
          width: 60%;
          margin: 0 auto;
        }
      }

      .card-section-wrapper {
        width: 100%;
      }
    }
  }

  @media screen and (max-width: 500px) {
    .title-wrapper {
      background: pink;

      .title-header {
        h1 {
          font-size: 4rem;
        }
        h2 {
          font-size: 1.7rem;
        }
      }
    }
  }
`;

const LandingPage = () => {
  return (
    <Container>
      <div className="title-wrapper">
        <div className="title-header">
          <h1>Hello, World!</h1>
          <h2>📣 sale for Front-End Developer!</h2>
        </div>
        <div className="sales-section">
          {/* user section */}
          <div className="user-section-wrapper">
            <div className="user-profile-image-wrapper">
              <img src="/static/svg/avatar32.png" alt="profile" />
            </div>
            <div className="user-description-wrapper">
              <h3 className="user-name">Carrot🥕</h3>
              <div className="user-description">
                <h3 className="info">
                  subscribe to <br />
                  self-evolving developer <br /> just💰2.5M / month!
                </h3>
              </div>
            </div>
          </div>

          {/* card section */}
          <div className="card-section-wrapper">
            <div className="card-section">
              <h3 className="card-name">Front-End</h3>
              <div className="card-list front-end">
                {frontendBadges.map((skill) => (
                  <img src={skill.src} alt={skill.alt} />
                ))}
              </div>
            </div>
            <div className="card-section">
              <h3 className="card-name">Server & DB</h3>
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
      {/* implement & project section */}
      <div className="makes-wrapper">
        <div className="implements-wrapper">
          <h3 className="card-name">Implement API</h3>
          <div className="widgets-wrapper">
            <div className="widget">
              <div className="widget-logo">📝</div>
              <p className="widget-name">Board</p>
            </div>
            <div className="widget">
              <div className="widget-logo">💬</div>
              <p className="widget-name">Chatting</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LandingPage;

/*
  TODO 1. .card-name font style, color
    ? box-shadow, hover?, emoji?

  TODO 2. navigation menu
    ? board, chat widget
    ? right side, 30%
    ? 구조
      * implement
        * logo, logo
      * project
        * twitter, skilltree
    ? flex-direction default -> row, responsive -> column

  ! background size auto resizing!
*/
