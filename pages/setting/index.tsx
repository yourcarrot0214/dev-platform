import React from "react";
import { NextPage } from "next";
import wrapper from "../../store";
import { Store } from "redux";
import { NextPageContext } from "next/types";
import Index from "../../components/setting/Index";

const index: NextPage = () => {
  return <Index />;
};

index.getInitialProps = wrapper.getInitialPageProps(
  (store: Store) => async ({ query }: NextPageContext) => {
    console.log(">> user page query ::", query);

    return {};
  }
);

export default index;

/*
  TODO : 1. route setup
  ? path : /user
  ? query: id=userid

  TODO : 2. <ProfileMain /> setup
  ? user profile을 관리할 수 있는 컴포넌트를 출력한다.
  ? password, name 수정 기능 및 회원 탈퇴 기능을 구현한다.
*/
