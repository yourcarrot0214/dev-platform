import React from "react";
import styled from "styled-components";
// import HeadLine from "./header/HeadLine.tsx"
// import WidgetList from "./widget/WidgetList.tsx"
import palette from "../../styles/palette";

const Container = styled.div`
  width: 100%;
  padding: 0 80px;
`;

const Home: React.FC = () => {
  return (
    <Container>
      <h2>HOME</h2>
    </Container>
  );
};

export default Home;
