import Head from "next/head";
import Home from "../components/home/Home";

export default function home() {
  return (
    <>
      <Head>
        <title>DEV-Platform 🥕</title>
        <meta name="description" content="Front-end 개발자 정병훈 입니다." />
      </Head>
      <Home />
    </>
  );
}
