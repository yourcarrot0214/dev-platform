import Head from "next/head";
import { NextPage } from "next";
import { useSelector } from "../../../store";
import Write from "../../../components/views/board/Write";

const Index: NextPage = () => {
  const userId = useSelector((state) => state.user._id);

  return (
    <>
      <Head>
        <title>DEV-Platform :: 새 글 작성 ✍🏼</title>
      </Head>
      {userId ? <Write /> : <div>접근 권한이 없습니다.</div>}
    </>
  );
};

export default Index;

/*
  TODO 1. auth
  ? login 되지 않은 유저의 접근을 제한합니다.
*/
