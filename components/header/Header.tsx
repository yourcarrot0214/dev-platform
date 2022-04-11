import React from "react";
import Link from "next/link";
import styled from "styled-components";
import palette from "../../styles/palette";
import HeaderAuth from "./HeaderAuth";
import HeaderUserProfile from "./HeaderUserProfile";
import { useSelector } from "../../store";

const Container = styled.div`
  @media screen and (max-width: 500px) {
    justify-content: center;
    height: 60px;
  }

  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
  z-index: 10;

  .header-title-wrapper {
    display: flex;
    align-items: center;

    .header-title {
      font-weight: 800;
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
