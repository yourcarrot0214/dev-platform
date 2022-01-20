import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  box-sizing: border-box;
  border: 1px solid ${palette.cardinal};
`;

const Profile: React.FC = () => {
  return (
    <Container>
      <h2>Profile Page</h2>
    </Container>
  );
};

export default Profile;
