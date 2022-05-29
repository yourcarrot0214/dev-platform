import React, { useState, useMemo, useCallback, useEffect } from "react";
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

  // * password가 email이나 이름을 포함하는지 검증
  const isPasswordHasNameOrEmail = useMemo(
    () =>
      !password ||
      !name ||
      password.includes(name) ||
      password.includes(email.split("@")[0]),
    [password, name, email]
  );

  // * password가 최소 자릿수 이상인지 검증
  const isPasswordOverMinLength = useMemo(
    () => !!password && password.length >= PASSWORD_MIN_LENGTH,
    [password]
  );

  // * password가 정규표현식을 포함하고 있는지 검증
  const isPasswordHasNumberOrSymbol = useMemo(
    () => !(SYMBOL.test(password) || NUMBER.test(password)),
    [password]
  );

  // * 회원가입 폼 입력 값 검증
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
        placeholder="이메일 주소"
        type="email"
        name="email"
        icon={<MailIcon />}
        onChange={onChangeEmail}
        useValidation
        isValid={!!email}
        errorMessage="이메일 주소가 필요합니다."
      />
    ),
    [email, onChangeEmail]
  );

  const usernameInput = useMemo(
    () => (
      <Input
        placeholder="이름"
        icon={<PersonIcon />}
        onChange={onChangeName}
        useValidation
        isValid={!!name}
        errorMessage="이름을 입력하세요."
      />
    ),
    [name, onChangeName]
  );

  const passwordInput = useMemo(
    () => (
      <Input
        placeholder="비밀번호 설정하기"
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
        errorMessage="비밀번호를 입력하세요."
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

  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, [setValidateMode]);

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
              text="비밀번호에 이름이나 이메일 주소를 포함할 수 없습니다."
            />
            <PasswordWarning
              isValid={!isPasswordOverMinLength}
              text="비밀번호는 최소 8자 이상이어야 합니다."
            />
            <PasswordWarning
              isValid={isPasswordHasNumberOrSymbol}
              text="숫자나 기호를 포함해야 합니다."
            />
          </>
        )}
      </div>
      <p className="sign-up-notice-label">📣 회원가입 공지사항</p>
      <p className="sign-up-notice-info">
        📌 회원가입 정보는 MongoDB에 저장됩니다.
      </p>
      <p className="sign-up-notice-info">
        📌 로그인 기능 이외에 다른 기능으로 활용되지 않습니다.
      </p>
      <p className="sign-up-notice-info">
        📌 언제든 탈퇴가 가능하며 탈퇴시 회원정보는 영구 삭제됩니다.
      </p>
      <div className="sign-up-modal-submit-button-wrapper">
        <Button color="bittersweet" type="submit">
          가입하기
        </Button>
      </div>
      <p>
        이미 계정이 있나요?
        <span
          className="sign-up-modal-set-login"
          role="presentation"
          onClick={ChangeToLoginModal}
        >
          로그인
        </span>
      </p>
    </Container>
  );
};

export default SignUpModal;
