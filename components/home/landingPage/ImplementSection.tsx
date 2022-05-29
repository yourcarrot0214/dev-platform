import React from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";
import Link from "next/link";

const Container = styled.div`
  .implement-section {
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
  }

  @media screen and (max-width: 500px) {
    .implement-section {
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
`;

const ImplementSection = () => {
  return (
    <Container>
      <div className="implement-section">
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
    </Container>
  );
};

export default React.memo(ImplementSection);
