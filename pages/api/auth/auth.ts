import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { StoredUserType } from "../../../types/user";
import { connect } from "../../../utils/mongodb/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const accessToken = req.headers.cookie;
      console.log("✅ req.headers : ", req.headers);
      if (!accessToken) {
        res.statusCode = 400;
        return res.send("access_token이 없습니다.");
      }
      const userId = jwt.verify(accessToken, process.env.JWT_SECRET!);
      const { User } = await connect();
      const user: StoredUserType = await User.findOne({ _id: userId }).exec();
      if (!user) {
        res.statusCode = 404;
        return res.send("해당 유저가 없습니다.");
      }

      const userWithoutPassword: Partial<Pick<
        StoredUserType,
        "password"
      >> = user;
      userWithoutPassword.password = "";
      delete userWithoutPassword.password;

      res.statusCode = 200;
      return res.send(userWithoutPassword);
    } catch (error) {
      console.log("meAPI error : ", error);
      res.statusCode = 500;
      return res.send(error);
    }
  }

  res.statusCode = 405;
  return res.end();
};
