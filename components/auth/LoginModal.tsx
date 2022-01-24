import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import CloseXIcon from "../../public/static/svg/modal/modal_colose_x_icon.svg";
import MailIcon from "../../public/static/svg/auth/mail.svg";
import OpenedEyeIcon from "../../public/static/svg/auth/opened_eye.svg";
import ClosedEyeIcon from "../../public/static/svg/auth/closed_eye.svg";
import palette from "../../styles/palette";
import Input from "../common/Input";
import { authActions } from "../../store/auth";
import { loginAPI } from "../../lib/api/auth";
import { userActions } from "../../store/user";
import useValidateMode from "../../hooks/useValidateMode";
import LoadingButton from "@mui/lab/LoadingButton";

const Container = styled.form`
  width: 568px;
  padding: 32px;
  background-color: white;
  z-index: 11;

  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }

  .login-modal-title {
    font-size: 36px;
    font-weight: 800;
    color: ${palette.tawny};
    text-align: center;
    margin-bottom: 20px;
  }

  .login-input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }

  .login-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }

  .login-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${palette.gray_eb};
  }

  .login-modal-set-signup {
    color: ${palette.dark_cyan};
    margin-left: 8px;
    cursor: pointer;
  }
`;

interface IProps {
  closeModal: () => void;
}

const LoginModal: React.FC<IProps> = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { setValidateMode } = useValidateMode();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordHided, setIsPasswordHided] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const togglePasswordHiding = () => setIsPasswordHided(!isPasswordHided);

  const changeToSignUpModal = () => {
    dispatch(authActions.setAuthMode("signup"));
  };

  const onSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidateMode(true);
    setLoading(true);
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해 주세요.");
      setLoading(false);
    } else {
      const loginBody = { email, password };

      try {
        const { data } = await loginAPI(loginBody);
        const userdataWithoutPassword = data;
        delete data.password;
        console.log("userdataWithoutPassword : ", userdataWithoutPassword);
        dispatch(userActions.setLoggedUser(userdataWithoutPassword));
        console.log("loginAPI", data);
        setLoading(false);
        closeModal();
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, []);

  return (
    <Container onSubmit={onSubmitLogin}>
      <CloseXIcon className="modal-close-x-icon" onClick={closeModal} />
      <h2 className="login-modal-title">DEV - PLATFORM</h2>
      <div className="login-input-wrapper">
        <Input
          placeholder="이메일 주소"
          name="email"
          type="email"
          value={email}
          onChange={onChangeEmail}
          icon={<MailIcon />}
          isValid={email !== ""}
          errorMessage="이메일이 필요합니다."
        />
      </div>
      <div className="login-input-wrapper login-password-input-wrapper">
        <Input
          placeholder="비밀번호"
          type={isPasswordHided ? "password" : "text"}
          name="password"
          value={password}
          onChange={onChangePassword}
          icon={
            isPasswordHided ? (
              <ClosedEyeIcon onClick={togglePasswordHiding} />
            ) : (
              <OpenedEyeIcon onClick={togglePasswordHiding} />
            )
          }
          isValid={password !== ""}
          errorMessage="비밀번호를 입력해 주세요."
        />
      </div>
      <div className="login-modal-submit-button-wrapper">
        <LoadingButton
          loading={loading}
          variant="contained"
          color="info"
          size="large"
          fullWidth
          type="submit"
        >
          로그인
        </LoadingButton>
      </div>
      <p>
        <span>DEV - PLATFORM 회원이 아니신가요?</span>
        <span
          className="login-modal-set-signup"
          role="presentation"
          onClick={changeToSignUpModal}
        >
          회원가입
        </span>
      </p>
    </Container>
  );
};

export default LoginModal;
