import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/mongodb/mongodb";
import { ResponseFuncs } from "../../../types/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { StoredUserType } from "../../../types/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password } = req.body;
    console.log({ email, password });
    if (!email || !password) {
      res.statusCode = 400;
      return res.send("필수 정보가 없습니다.");
    }

    const { User } = await connect();
    const user: StoredUserType = await User.findOne({
      email: email,
    });
    console.log("user : ", user);

    if (!user) {
      res.statusCode = 404;
      return res.send("해당 이메일에 해당하는 유저가 없습니다.");
    }

    // ! 비밀번호 불일치
    const isPasswordMatched = bcrypt.compareSync(password, user.password);
    console.log("isPasswordMatched : ", isPasswordMatched);
    if (!isPasswordMatched) {
      res.statusCode = 403;
      return res.send("비밀번호가 일치하지 않습니다.");
    }

    const token = jwt.sign(String(user._id), process.env.JWT_SECRET!);
    res.setHeader(
      "Set-cookie",
      `access_token=${token}; path=/; expires=${new Date(
        Date.now() + 60 * 60 * 1000 * 24
      ).toUTCString()}; httponly`
    );

    const userWithoutPassword: Partial<Pick<StoredUserType, "password">> = user;
    delete userWithoutPassword.password;

    res.statusCode = 200;
    return res.send(userWithoutPassword);
  }

  res.statusCode = 405;
  return res.end();
};
