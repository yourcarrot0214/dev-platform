import React from "react";
import SignUpModal from "../auth/SignUpModal";
import { useSelector } from "../../store";

interface IProps {
  closeModal: () => void;
}

const AuthModal: React.FC<IProps> = ({ closeModal }) => {
  const authMode = useSelector((state) => state.auth.authMode);
  return (
    <>
      {authMode === "signup" && <SignUpModal closeModal={closeModal} />}
      {authMode === "login" && <div> Login Modal</div>}
    </>
  );
};

export default AuthModal;
