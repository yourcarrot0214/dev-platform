import { connect } from "../../utils/mongodb/mongodb";

// TODO : user model에 관련된 method

// ? 이미 가입된 이메일 주소인지 확인
export const exist = async ({ email }: { email: string }) => {
  const { User } = await connect();
  return await User.findOne({ email: email }).exec();
};
