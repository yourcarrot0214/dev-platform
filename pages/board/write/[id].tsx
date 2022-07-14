import { NextPage } from "next";
import Head from "next/head";
import Update from "../../../components/views/board/Update";

const postUpdate: NextPage = () => {
  return (
    <>
      <Head>
        <title>DEV-Platform :: 수정하기 ✍🏼</title>
      </Head>
      <Update />
    </>
  );
};

export default postUpdate;
