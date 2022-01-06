import { connect } from "../../utils/mongodb/mongodb";

// TODO : user model에 관련된 method

// ? 이미 가입된 이메일 주소인지 확인
const exist = async ({ email }: { email: string }) => {
  const { User } = await connect();
};

// GET: async (req: NextApiRequest, res: NextApiResponse) => {
//   const { User } = await connect();
//   res.json(await User.find({}).catch(catcher));
//   res.end();
// },
