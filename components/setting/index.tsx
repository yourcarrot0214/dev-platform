import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";

const Container = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  box-sizing: border-box;
  border: 1px solid ${palette.cardinal};
`;

const Index: React.FC = () => {
  return (
    <Container>
      <div>setting page</div>
    </Container>
  );
};

export default Index;
