/*
  TODO. Main Page에 노출시키는 Thumbnail
    ? DEV-PLATFORM에서 구현한 기능을 노출하는 Card 컴포넌트 입니다.
    ? 기능명, 간단한 부연설명, 기술 태그 정보를 출력합니다.
    ? Card 클릭시 해당 기능 페이지로 route를 연결 합니다.
*/

import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";

const Container = styled.div`
  width: 20rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  padding: 1rem 0;
  box-sizing: border-box;
  background-color: #222222;
  color: ${palette.snow};

  transition: all 0.3s;

  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 100%;

  @media screen and (min-width: 500px) {
    width: 20rem;
    max-width: 365px;
    margin: 1rem;
    padding: 1rem;
    flex-basis: auto;
  }

  :hover {
    transform: translateY(-5px);
    box-shadow: 0px 0px 5px #202020, 0px 0px 5px #242424;
  }

  h1 {
    font-size: 2rem;
    font-weight: 900;
    padding: 1rem 0;
    color: #0fbcf9;

    @media screen and (min-width: 500px) {
      font-size: 2.7rem;
    }
  }

  p {
    padding: 0.5rem 0;
    line-height: 1.2;

    @media screen and (min-width: 500px) {
      font-size: 1.1rem;
      padding: 1rem 0;
    }
  }

  .wrapper {
    padding: 1rem 0;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    justify-content: center;

    .chip {
      margin-right: 0.5rem;
      border-radius: 1rem;
      background-color: #0fbcf9;
      padding: 0.5rem 0.7rem;
      color: #222222;
      font-size: 0.8rem;
      font-weight: bold;

      :last-child {
        margin-right: 0;
      }

      @media screen and (min-width: 500px) {
        font-size: 0.9rem;
        padding: 0.5rem 0.7rem;
      }
    }
  }
`;

interface IProps {
  title: string;
  summary: string;
  tags: string[];
}

const CardSection: React.FC<IProps> = ({ title, summary, tags }) => {
  return (
    <Container>
      <h1>{title}</h1>
      <p>{summary}</p>
      <div className="wrapper">
        {tags.map((tag, index) => (
          <div className="chip" key={index}>
            {tag}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default React.memo(CardSection);

/*
  TODO. design
    ? 한 개의 라인에 3개의 카드를 출력
    ? grid는 Home 컴포넌트에서 관리
*/
