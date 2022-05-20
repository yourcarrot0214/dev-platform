import React, { useState } from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import useModal from "../../hooks/useModal";
import { authActions } from "../../store/auth";
import { useDispatch } from "react-redux";
import AuthModal from "./AuthModal";

import OutsideClickHandler from "react-outside-click-handler";
import HamburgerIcon from "../../public/static/svg/header/hamburger.svg";

const Container = styled.div`
  .header-auth-buttons {
    .header-sign-up-button {
      height: 42px;
      margin-right: 8px;
      padding: 0 16px;
      border: 0;
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
    .header-login-button {
      height: 42px;
      padding: 0 16px;
      border: 0;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      &:hover {
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
      }
    }
  }

  .header-menu-icon {
    display: none;
  }

  @media screen and (max-width: 500px) {
    .header-auth-buttons {
      display: none;
    }

    .header-menu-icon {
      display: block;
      border: none;
      background: none;
      padding: 0 1rem;
    }

    .header-menu {
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
  }
`;

const HeaderAuth: React.FC = () => {
  const dispatch = useDispatch();
  const { openModal, closeModal, ModalPortal } = useModal();
  const [isUsermenuOpened, setIsUsermenuOpened] = useState(false);
  return (
    <Container>
      <div className="header-auth-buttons">
        <button
          className="header-sign-up-button"
          type="button"
          onClick={() => {
            dispatch(authActions.setAuthMode("signup"));
            openModal();
          }}
        >
          회원가입
        </button>
        <button
          className="header-login-button"
          type="button"
          onClick={() => {
            dispatch(authActions.setAuthMode("login"));
            openModal();
          }}
        >
          로그인
        </button>
      </div>
      <button
        className="header-menu-icon"
        onClick={() => setIsUsermenuOpened(true)}
      >
        <HamburgerIcon />
      </button>
      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
      {isUsermenuOpened && (
        <OutsideClickHandler
          onOutsideClick={() => {
            if (isUsermenuOpened) {
              setIsUsermenuOpened(false);
            }
          }}
        >
          <ul className="header-menu">
            <li
              onClick={() => {
                dispatch(authActions.setAuthMode("signup"));
                openModal();
              }}
            >
              회원가입
            </li>
            <li
              onClick={() => {
                dispatch(authActions.setAuthMode("login"));
                openModal();
              }}
            >
              로그인
            </li>
          </ul>
        </OutsideClickHandler>
      )}
    </Container>
  );
};

export default HeaderAuth;
