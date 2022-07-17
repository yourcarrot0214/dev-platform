import Head from "next/head";
import { NextPage } from "next";
import Setting from "../../components/setting/Setting";

const index: NextPage = () => {
  return (
    <>
      <Head>
        <title>DEV-Platform :: Setting</title>
      </Head>
      <Setting />
    </>
  );
};

export default index;

/*
  TODO : 1. route setup
  ? path : /user
  ? query: id=userid

  TODO : 2. <ProfileMain /> setup
  ? user profile을 관리할 수 있는 컴포넌트를 출력한다.
  ? password, name 수정 기능 및 회원 탈퇴 기능을 구현한다.
*/
