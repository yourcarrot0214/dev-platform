import React, { useState, useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import CloseXIcon from "../../public/static/svg/modal/modal_colose_x_icon.svg";
import MailIcon from "../../public/static/svg/auth/mail.svg";
import PersonIcon from "../../public/static/svg/auth/person.svg";
import OpenedEyeIcon from "../../public/static/svg/auth/opened_eye.svg";
import ClosedEyeIcon from "../../public/static/svg/auth/closed_eye.svg";
import Input from "../common/Input";
import palette from "../../styles/palette";
import Button from "../common/Button";
import { signupAPI } from "../../lib/api/auth";
import { userActions } from "../../store/user";
import useValidateMode from "../../hooks/useValidateMode";
import PasswordWarning from "./PasswordWarning";
import { SYMBOL, NUMBER } from "./constant";
import { authActions } from "../../store/auth";

const Container = styled.form`
  width: 568px;
  height: 614px;
  padding: 32px;
  background-color: white;
  z-index: 11;

  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 20px auto;
  }

  .sign-up-modal-title {
    font-size: 36px;
    font-weight: 800;
    color: ${palette.tawny};
    text-align: center;
    margin-bottom: 20px;
  }

  .input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }

  .sign-up-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }

  .sign-up-notice-label {
    font-size: 16px;
    font-weight: 600;
    margin-top: 16px;
    margin-bottom: 16px;
    color: ${palette.black};
  }
  .sign-up-notice-info {
    margin-bottom: 8px;
    color: ${palette.gray_48};
  }

  .sign-up-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding: 16px 0;
    border-bottom: 1px solid ${palette.gray_eb};
  }

  .sign-up-modal-set-login {
    color: ${palette.dark_cyan};
    margin-left: 8px;
    cursor: pointer;
  }
`;

interface IProps {
  closeModal: () => void;
}

const PASSWORD_MIN_LENGTH = 8;

const SignUpModal: React.FC<IProps> = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const [passwordFocused, setPasswordFocused] = useState(false);

  const onFocusPassword = () => {
    setPasswordFocused(true);
  };

  // * password??? email?????? ????????? ??????????????? ??????
  const isPasswordHasNameOrEmail = useMemo(
    () =>
      !password ||
      !name ||
      password.includes(name) ||
      password.includes(email.split("@")[0]),
    [password, name, email]
  );

  // * password??? ?????? ????????? ???????????? ??????
  const isPasswordOverMinLength = useMemo(
    () => !!password && password.length >= PASSWORD_MIN_LENGTH,
    [password]
  );

  // * password??? ?????????????????? ???????????? ????????? ??????
  const isPasswordHasNumberOrSymbol = useMemo(
    () => !(SYMBOL.test(password) || NUMBER.test(password)),
    [password]
  );

  // * ???????????? ??? ?????? ??? ??????
  const validateSignUpForm = () => {
    // * input value check
    if (!email || !name || !password) {
      return false;
    }

    // * password check
    if (
      isPasswordHasNameOrEmail ||
      !isPasswordOverMinLength ||
      isPasswordHasNumberOrSymbol
    ) {
      return false;
    }

    return true;
  };

  const dispatch = useDispatch();
  const { setValidateMode } = useValidateMode();

  const onChangeEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  const onChangeName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value),
    [setName]
  );

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const toggleHidePassword = useCallback(() => {
    setHidePassword(!hidePassword);
  }, [hidePassword]);

  const ChangeToLoginModal = () => {
    dispatch(authActions.setAuthMode("login"));
  };

  const onSubmitSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setValidateMode(true);

    if (validateSignUpForm()) {
      try {
        const signUpBody = {
          email,
          name,
          password,
        };
        const { data } = await signupAPI(signUpBody);
        const userdataWithoutPassword = data;
        dispatch(userActions.setLoggedUser(userdataWithoutPassword));
        closeModal();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const emailInput = useMemo(
    () => (
      <Input
        placeholder="????????? ??????"
        type="email"
        name="email"
        icon={<MailIcon />}
        onChange={onChangeEmail}
        useValidation
        isValid={!!email}
        errorMessage="????????? ????????? ???????????????."
      />
    ),
    [email, onChangeEmail]
  );

  const usernameInput = useMemo(
    () => (
      <Input
        placeholder="??????"
        icon={<PersonIcon />}
        onChange={onChangeName}
        useValidation
        isValid={!!name}
        errorMessage="????????? ???????????????."
      />
    ),
    [name, onChangeName]
  );

  const passwordInput = useMemo(
    () => (
      <Input
        placeholder="???????????? ????????????"
        type={hidePassword ? "password" : "text"}
        icon={
          hidePassword ? (
            <ClosedEyeIcon onClick={toggleHidePassword} />
          ) : (
            <OpenedEyeIcon onClick={toggleHidePassword} />
          )
        }
        onChange={onChangePassword}
        useValidation
        isValid={
          !isPasswordHasNameOrEmail &&
          isPasswordOverMinLength &&
          !isPasswordHasNumberOrSymbol
        }
        errorMessage="??????????????? ???????????????."
        onFocus={onFocusPassword}
      />
    ),
    [
      hidePassword,
      toggleHidePassword,
      isPasswordHasNameOrEmail,
      isPasswordOverMinLength,
      isPasswordHasNumberOrSymbol,
    ]
  );

  return (
    <Container onSubmit={onSubmitSignUp}>
      <CloseXIcon className="modal-close-x-icon" onClick={closeModal} />

      <h2 className="sign-up-modal-title">DEV - PLATFORM</h2>

      <div className="input-wrapper">{emailInput}</div>
      <div className="input-wrapper">{usernameInput}</div>
      <div className="input-wrapper sign-up-password-input-wrapper">
        {passwordInput}
        {passwordFocused && (
          <>
            <PasswordWarning
              isValid={isPasswordHasNameOrEmail}
              text="??????????????? ???????????? ????????? ????????? ????????? ??? ????????????."
            />
            <PasswordWarning
              isValid={!isPasswordOverMinLength}
              text="??????????????? ?????? 8??? ??????????????? ?????????."
            />
            <PasswordWarning
              isValid={isPasswordHasNumberOrSymbol}
              text="????????? ????????? ???????????? ?????????."
            />
          </>
        )}
      </div>
      <p className="sign-up-notice-label">???? ???????????? ????????????</p>
      <p className="sign-up-notice-info">
        ???? ???????????? ????????? MongoDB??? ???????????????.
      </p>
      <p className="sign-up-notice-info">
        ???? ????????? ?????? ????????? ?????? ???????????? ???????????? ????????????.
      </p>
      <p className="sign-up-notice-info">
        ???? ????????? ????????? ???????????? ????????? ??????????????? ?????? ???????????????.
      </p>
      <div className="sign-up-modal-submit-button-wrapper">
        <Button color="bittersweet" type="submit">
          ????????????
        </Button>
      </div>
      <p>
        ?????? ????????? ??????????
        <span
          className="sign-up-modal-set-login"
          role="presentation"
          onClick={ChangeToLoginModal}
        >
          ?????????
        </span>
      </p>
    </Container>
  );
};

export default SignUpModal;
