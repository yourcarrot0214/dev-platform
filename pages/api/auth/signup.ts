import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/mongodb/mongodb";
import { ResponseFuncs } from "../../../types/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { StoredUserType } from "../../../types/user.d";

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;

//   const catcher = (error: Error) => res.status(400).json({ error });

//   const handleCase: ResponseFuncs = {
//     // ? RESPONSE FOR POST REQUEST
//     POST: async (req: NextApiRequest, res: NextApiResponse) => {
//       console.log("POST RESPONSE");
//       try {
//         // * 1. request data 검증
//         const { email, password, name } = req.body;
//         console.log(req.body);
//         if (!email || !password || !name) {
//           res.statusCode = 400;
//           console.log("회원가입에 필요한 필수 데이터가 없습니다.");
//           return res.send("회원가입에 필요한 필수 데이터가 없습니다.");
//         }

//         // * 2. 이미 가입된 회원 여부 검증
//         const { User } = await connect();
//         const userExist = await User.findOne({ email: email });

//         if (userExist) {
//           res.statusCode = 409;
//           res.send("이미 가입된 이메일 주소 입니다.");
//         }

//         // * 3. 비밀번호 암호화 및 유저 정보 생성
//         const hashedPassword = bcrypt.hashSync(password, 8);
//         const userId = uuidv4();

//         const newUser: StoredUserType = {
//           _id: userId,
//           email,
//           name,
//           password: hashedPassword,
//           profileImage: "/static/image/user/default_user_profile_image.jpeg",
//         };

//         return res.status(200).json(await User.create(newUser).catch(catcher));
//       } catch (error) {
//         console.log("signup error : ", error.message);
//         res.statusCode = 500;
//         return res.send(error);
//       }
//     },
//   };

//   const response = handleCase[method];
//   console.log("response : ", response);
//   if (response) response(req, res);
//   else res.status(400).json({ error: "No Response for This Request" });
// };

// export default handler;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    // * 1. request data 검증
    const { email, password, name } = req.body;
    console.log(req.body);
    if (!email || !password || !name) {
      res.statusCode = 400;
      console.log("회원가입에 필요한 필수 데이터가 없습니다.");
      return res.send("회원가입에 필요한 필수 데이터가 없습니다.");
    }

    // * 2. 이미 가입된 회원 여부 검증
    const { User } = await connect();
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      res.statusCode = 409;
      res.send("이미 가입된 이메일 주소 입니다.");
    }

    // * 3. 비밀번호 암호화 및 유저 정보 생성
    const hashedPassword = bcrypt.hashSync(password, 8);
    const userId = uuidv4();

    const newUser = {
      email,
      name,
      password: hashedPassword,
      profileImage: "/static/image/user/default_user_profile_image.jpg",
    };

    const catcher = (error: Error) => res.status(400).json({ error });
    const userData: StoredUserType = await User.create(newUser).catch(catcher);

    await new Promise((resolve) => {
      const token = jwt.sign(String(userData._id), process.env.JWT_SECRET!);
      res.setHeader(
        "Set-Cookie",
        `access_token=${token}; Path=/; Expires=${new Date(
          Date.now() + 60 * 60 * 24 * 1000
        ).toUTCString()}; HttpOnly`
      );
      resolve(token);
    });

    const userDataWithoutPassword: Partial<Pick<
      StoredUserType,
      "password"
    >> = userData;
    delete userDataWithoutPassword.password;

    res.statusCode = 200;
    return res.send(userDataWithoutPassword);
  }
  res.statusCode = 405;
  return res.end();
};
