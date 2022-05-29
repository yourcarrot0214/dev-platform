import React from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";
import Link from "next/link";

import {
  frontendBadges,
  backendBadges,
  utilsBadges,
} from "../../../lib/data/skillBadges";

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
        color: ${palette.black};
      }
    }
  }

  .sales-section {
    display: flex;
    flex-direction: row;

    .card-section-wrapper {
      width: 65%;

      .card-section {
        margin-bottom: 1rem;
        width: 450px;
        .card-name {
          /* font-color */
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

    .user-section-wrapper {
      width: 35%;

      .user-profile-image-wrapper {
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
        font-family: Bebas Neue;
        width: 100%;

        .user-name {
          text-align: center;
          margin: 0;
          font-size: 3rem;
          font-weight: 800;
          color: ${palette.black};
        }

        .user-description {
          .info {
            text-align: center;
            margin: 1rem 0;
            font-size: 1.5rem;
            color: ${palette.black};
          }
        }
      }
    }
  }

  .makes-wrapper {
    width: 35%;
    margin-top: 356px;

    .implements-wrapper,
    .projects-wrapper {
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
        display: flex;
        flex-direction: row;
        .widget {
          width: 120px;
          transition: 0.5s;
          :hover {
            transform: translateY(-5px);
          }

          .widget-logo {
            font-size: 4rem;
            text-align: center;
            margin: 0;
            :hover {
              cursor: pointer;
            }
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
  }

  @media screen and (max-width: 1440px) {
    flex-direction: column;

    .title-wrapper {
      width: 100%;
      margin-bottom: 3rem;
      margin: 0 auto;
      .title-header {
        margin-bottom: 1rem;
      }
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
    .title-wrapper {
      .title-header {
        text-align: center;
        h1 {
          font-size: 5.5rem;
          padding: 0;
        }
        h2 {
          font-size: 2rem;
          padding: 0;
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

        .card-section {
          width: 100%;
        }
      }
    }

    .makes-wrapper {
      flex-direction: column;
      padding: 0;
    }
  }

  @media screen and (max-width: 500px) {
    .title-wrapper {
      .title-header {
        text-align: center;
        h1 {
          font-size: 4rem;
        }
        h2 {
          font-size: 1.7rem;
        }
      }
      .sales-section {
        margin-bottom: 2rem;
      }
    }

    .makes-wrapper {
      .implements-wrapper {
        .widgets-wrapper {
          .widget {
            width: 90px;
            .widget-logo {
              font-size: 3rem;
            }
            .widget-name {
              font-size: 0.9rem;
            }
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
                  <img src={skill.src} alt={skill.alt} key={skill.id} />
                ))}
              </div>
            </div>
            <div className="card-section">
              <h3 className="card-name">Server & DB</h3>
              <div className="card-list">
                {backendBadges.map((skill) => (
                  <img src={skill.src} alt={skill.alt} key={skill.id} />
                ))}
              </div>
            </div>
            <div className="card-section">
              <h3 className="card-name">Utils</h3>
              <div className="card-list">
                {utilsBadges.map((skill) => (
                  <img src={skill.src} alt={skill.alt} key={skill.id} />
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
              <Link href="/board">
                <div className="widget-logo">
                  📝
                  <a>
                    <p className="widget-name">Board</p>
                  </a>
                </div>
              </Link>
            </div>
            <div className="widget">
              <Link href="/board">
                <div className="widget-logo">
                  💬
                  <a>
                    <p className="widget-name">Chat</p>
                  </a>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="projects-wrapper">
          <h3 className="card-name">deployed Project</h3>
          <div className="project-card">
            <div className="project-name">
              <a
                href="https://yourcarrot0214.github.io/carrotfield/#/"
                target="_blank"
              >
                CarrotField 🔗
              </a>
            </div>
            <p className="project-description">
              트위터의 트윗 기능을 클론한 서비스 입니다. Firebase API에 기반한
              회원가입, 소셜 로그인, 게시글 CRUD 기능을 제공합니다.
            </p>
          </div>
          <div className="project-card">
            <div className="project-name">
              <a
                href="https://devcarrot-skilltree.herokuapp.com/"
                target="_blank"
              >
                Skill Tree 🔗
              </a>
            </div>
            <p className="project-description">
              React, Node, Express, MongoDB를 기반으로 한 스터디&프로젝트
              커뮤니티 서비스 입니다.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LandingPage;
