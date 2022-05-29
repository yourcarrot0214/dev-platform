import React from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";

const Container = styled.div`
  .user-section-wrapper {
    .user-profile-image-wrapper {
      max-width: 500px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      padding: 1rem;
      margin-bottom: 1rem;
      img {
        width: 50%;
        margin: 0 auto;
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
    @media screen and (max-width: 800px) {
      .user-section-wrapper {
        width: 100%;
        .user-profile-image-wrapper {
          width: 60%;
          margin: 0 auto;
        }
      }
    }
  }
`;

const UserSection = () => {
  return (
    <Container>
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
    </Container>
  );
};

export default React.memo(UserSection);
