import React from "react";
import Link from "next/link";
import styled from "styled-components";
import palette from "../../styles/palette";
import HeaderAuth from "./HeaderAuth";
import HeaderUserProfile from "./HeaderUserProfile";
import { useSelector } from "../../store";

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  @media screen and (max-width: 500px) {
    justify-content: center;
    height: 60px;
  }

  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  background-color: none;

  .header-title-wrapper {
    display: flex;
    align-items: center;

    .header-title {
      font-weight: 800;
      font-size: 1.5rem;
      color: ${palette.black};
      font-family: Bebas Neue;
    }
  }

  /* react-outside-click-handler */
  .header-title-wrapper + div {
    position: relative;
  }
`;

const Header: React.FC = () => {
  const isLogged = useSelector((state) => state.user.isLogged);
  return (
    <Container>
      <Link href="/">
        <a className="header-title-wrapper">
          <p className="header-title">DEV PLATFORM</p>
        </a>
      </Link>
      {!isLogged && <HeaderAuth />}
      {isLogged && <HeaderUserProfile />}
    </Container>
  );
};

export default Header;
