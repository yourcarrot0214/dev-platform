import React from "react";
import styled from "styled-components";

// * component
import UserProfile from "./user/UserProfile";

const Container = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const Index: React.FC = () => {
  return (
    <Container>
      <UserProfile />
    </Container>
  );
};

export default Index;

/*
  TODO : 설정 페이지를 출력합니다.
    ? 유저의 정보를 출력합니다.
      - name, email, profileImage
    ? 수정 기능을 제공합니다.
      - name: 수정 버튼
      - profileImage: 업로드, 제거 버튼
    ? 회원 탈퇴 기능을 제공합니다.
      - 회원탈퇴 버튼
      - db 데이터 삭제 안내 메시지를 출력합니다.
*/
