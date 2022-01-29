import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useSelector } from "../../store";
import Write from "../../components/views/board/Write";

const write: NextPage = () => {
  const router = useRouter();
  const userId = useSelector((state) => state.user._id);

  return userId ? <Write /> : <div>접근 권한이 없습니다.</div>;
};

export default write;

/*
  TODO 1. auth
  ? login 되지 않은 유저의 접근을 제한합니다.
*/
