import React from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";
import Button from "./component/Button";
import Typography from "@mui/material/Typography";

const Container = styled.div`
  width: 100%;
  padding: 0 80px;
`;

const MaterialUI: React.FC = () => {
  return (
    <Container>
      <Typography variant="h3" component="div" gutterBottom>
        Material UI Component Kit
      </Typography>
      <Button />
    </Container>
  );
};

export default MaterialUI;
