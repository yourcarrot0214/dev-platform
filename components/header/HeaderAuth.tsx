import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import useModal from "../../hooks/useModal";
import { authActions } from "../../store/auth";
import { useDispatch } from "react-redux";
import AuthModal from "./AuthModal";

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
`;

const HeaderAuth: React.FC = () => {
  const dispatch = useDispatch();
  const { openModal, closeModal, ModalPortal } = useModal();
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
      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </Container>
  );
};

export default HeaderAuth;
