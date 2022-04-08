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
  width: 100%;
  border-radius: 6px;
  border: 1px solid black;
  margin-bottom: 1rem;
  padding: 1rem 0;

  h1 {
    font-size: 2rem;
    font-weight: 900;
    padding: 2rem 1rem;
    border: 1px solid black;
  }

  p {
    padding: 0.5rem 1rem;
    line-height: 1.2;
  }

  .wrapper {
    padding: 0.5rem 1rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    .chip {
      margin-right: 0.5rem;
      border-radius: 1rem;
      background-color: #0fbcf9;
      padding: 0.5rem 1rem;
      color: white;
    }
  }
`;

const CardSection: React.FC = () => {
  return (
    <Container>
      <h1>Card Section Title</h1>
      <p>구현한 기능에 대한 간단한 요약 설명을 표시하는 공간입니다.</p>
      <div className="wrapper">
        <div className="chip">Next.js</div>
        <div className="chip">TypeScript</div>
        <div className="chip">MongoDB</div>
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
