import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/mongodb/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { StoredUserType } from "../../../types/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // * 1. API Method Check
  if (req.method === "POST") {
    try {
      // * 2. Request Body data Check
      const { email, password } = req.body;
      console.log({ email, password });
      if (!email || !password) {
        res.statusCode = 400;
        return res.send("필수 정보가 없습니다.");
      }

      // * 3. user data check in database
      const { User } = await connect();
      const user: StoredUserType = await User.findOne({ email: email }).exec();
      console.log("> user : ", user);
      if (!user) {
        res.statusCode = 404;
        return res.send("해당 이메일에 해당하는 유저가 없습니다.");
      }

      const comparePassword = async (password: string) =>
        await bcrypt.compareSync(password, user.password);

      // * 4. user password check
      if (user && !comparePassword(password)) {
        res.statusCode = 403;
        return res.send("비밀번호가 일치하지 않습니다.");
      }

      // * 5. create token
      const token = jwt.sign(String(user._id), process.env.JWT_SECRET!);

      // * 6. token data setup in response header
      res.setHeader(
        "Set-Cookie",
        `access_token=${token}; path=/; expires=${new Date(
          Date.now() + 60 * 60 * 1000
        ).toUTCString()}; httponly`
      );

      // * 7. delete user password for response
      const userWithoutPassword: Partial<Pick<
        StoredUserType,
        "password"
      >> = user;
      // ! delete 명령이 적용되지 않아 비밀번호 정보 임시 초기화
      userWithoutPassword.password = "";
      delete userWithoutPassword.password;
      console.log("userWithoutPassword : ", userWithoutPassword);

      res.statusCode = 200;
      return res.send(userWithoutPassword);
    } catch (error) {
      console.log("loginAPI error : ", error);
      res.statusCode = 500;
      return res.send(error);
    }
  }

  res.statusCode = 405;
  return res.end();
};
