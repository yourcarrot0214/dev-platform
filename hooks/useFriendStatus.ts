/*
  TODO : 친구의 ID를 통해 on-off line 결과를 boolean으로 리턴합니다.
*/

import React, { useState } from "react";
import axios from "../lib/api/";

interface IProps {
  userId: string;
}

const useFriendStatus = async (userId: string) => {
  const [status, setStatus] = useState<boolean>(false);

  if (userId) {
    try {
      // userId로 api 요청을 보내서 결과를 받습니다.
      const { data } = await axios.get<boolean>(
        `/api/auth/user/status/${userId}`
      );
      setStatus(data);
    } catch (error) {
      console.log(">> userFriendStatus hooks Error :: ", error);
    }
  }

  return status;
};

export default useFriendStatus;
