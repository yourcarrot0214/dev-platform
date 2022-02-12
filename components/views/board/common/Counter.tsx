/*
  TODO : post에 포함된 comment, replies의 총 갯수를 props로 전달받아 출력합니다.
*/

import React from "react";
import styled from "styled-components";
import palette from "../../../../styles/palette";

const Container = styled.div`
  width: 100%;

  h4 {
    font-size: 1rem;
    font-weight: bold;
    color: ${palette.black};
  }
`;

interface IProps {
  counter: number;
}

const Counter: React.FC<IProps> = ({ counter }) => {
  return (
    <Container>
      <h4>{counter}개의 댓글이 있습니다.</h4>
    </Container>
  );
};

export default React.memo(Counter);
