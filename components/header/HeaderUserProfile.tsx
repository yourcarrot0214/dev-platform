import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import palette from "../../styles/palette";
import { useSelector } from "../../store";
import { useDispatch } from "react-redux";
import OutsideClickHandler from "react-outside-click-handler";
import HamburgerIcon from "../../public/static/svg/header/hamburger.svg";
import { userActions } from "../../store/user";
import { logoutAPI } from "../../lib/api/auth";

const Container = styled.div`
  @media screen and (max-width: 500px) {
    .header-user-profile-image {
      display: none;
    }
    .header-user-profile > p {
      display: none;
    }
  }

  .header-user-profile {
    display: flex;
    align-items: center;
    height: 42px;
    padding: 0 6px 0 16px;
    border: 0;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
    border-radius: 21px;
    background: none;
    cursor: pointer;
    outline: none;
    &:hover {
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
    }
    .header-user-profile-image {
      margin-left: 8px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }

    @media screen and (max-width: 500px) {
      border: none;
      box-shadow: none;
      border-radius: none;
      padding: 0 1rem;
      &:hover {
        box-shadow: none;
      }
    }
  }

  .header-usermenu {
    position: absolute;
    right: 0;
    top: 52px;
    width: 240px;
    padding: 8px 0;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    background-color: white;
    li {
      display: flex;
      align-items: center;
      width: 100%;
      height: 42px;
      padding: 0 16px;
      cursor: pointer;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
    .header-usermenu-divider {
      width: 100%;
      height: 1px;
      margin: 8px 0;
      background-color: ${palette.gray_dd};
    }
  }
`;

interface SystemError {
  code: string;
  message: string;
}

const HeaderUserProfile: React.FC = () => {
  const [isUsermenuOpened, setIsUsermenuOpened] = useState(false);
  const userProfileImage = useSelector((state) => state.user.profileImage);
  const username = useSelector((state) => state.user.name);
  const userId = useSelector((state) => state.user._id);
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await logoutAPI(userId);
      dispatch(userActions.initUser());
    } catch (error) {
      const err = error as SystemError;
      console.log(err.message);
    }
  };

  return (
    <Container>
      <OutsideClickHandler
        onOutsideClick={() => {
          if (isUsermenuOpened) {
            setIsUsermenuOpened(false);
          }
        }}
      >
        <button
          className="header-user-profile"
          type="button"
          onClick={() => setIsUsermenuOpened(true)}
        >
          <HamburgerIcon />
          <img
            src={userProfileImage}
            className="header-user-profile-image"
            alt="user-profile-image"
          />
          <p style={{ margin: "0 10px" }}>{username}</p>
        </button>
        {isUsermenuOpened && (
          <ul className="header-usermenu">
            {/* <div className="header-usermenu-divider" /> */}
            <Link href="/setting " passHref>
              <a>
                <li onClick={() => setIsUsermenuOpened(false)}>설정</li>
              </a>
            </Link>
            <li role="presentation" onClick={logout}>
              로그아웃
            </li>
          </ul>
        )}
      </OutsideClickHandler>
    </Container>
  );
};

export default HeaderUserProfile;
