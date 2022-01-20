/*
  TODO : MUI design Widget Component
*/
import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import MaterialUI from "../../public/static/svg/logo/material_ui.svg";
import Link from "next/link";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  background-color: ${palette.gray_f7};
  border: 5px solid ${palette.gray_dd};
  border-radius: 21.67px;
  box-sizing: border-box;
  :hover {
    box-shadow: 0px 0px 10px #d2d2d2, 0px 0px 0px #ffffff;
  }

  .mui-logo-wrapper {
    width: 35px;
    height: 35px;

    svg {
      width: 100%;
      height: 100%;
    }
  }
`;

const Mui: React.FC = () => {
  return (
    <Link href="/widget/mui">
      <a>
        <Container>
          <div className="mui-logo-wrapper">
            <MaterialUI />
          </div>
        </Container>
      </a>
    </Link>
  );
};

export default Mui;
