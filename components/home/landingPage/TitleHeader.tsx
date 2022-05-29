import React from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";

const Container = styled.div`
  margin-bottom: 2rem;
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
      margin: 0;
      font-size: 4rem;
      font-weight: 800;
      padding: 0 1rem;
      font-family: Bebas Neue;
      color: ${palette.black};
    }
  }
  @media screen and (max-width: 800px) {
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
  @media screen and (max-width: 500px) {
    .title-header {
      text-align: center;
      h1 {
        font-size: 4rem;
      }
      h2 {
        font-size: 1.7rem;
      }
    }
  }
`;

const TitleHeader = () => {
  return (
    <Container>
      <div className="title-header">
        <h1>Hello, World!</h1>
        <h2>📣 sale for Front-End Developer!</h2>
      </div>
    </Container>
  );
};

export default React.memo(TitleHeader);
