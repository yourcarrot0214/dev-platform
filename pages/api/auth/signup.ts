import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../utils/mongodb/models/User";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, email, password, profileImage } = req.body;
    if (!email || !password || !name || !profileImage) {
      res.statusCode = 400;
      return res.send("필수 데이터가 없습니다.");
    }

    // console.log("User : ", User);
    // ! User model을 import하여 호출하면 error가 발생
    // ! OverwriteModelError: Cannot overwrite `User` model once compiled.
    // ! 컴파일된 'User' 모델을 덮어쓸 수 없습니다.

    return res.send("request success");

    // console.log(userExist);
  }
};
