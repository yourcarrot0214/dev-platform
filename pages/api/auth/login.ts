import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/mongodb/mongodb";
import { ResponseFuncs } from "../../../types/config";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;

  const catcher = (error: Error) => res.status(400).json({ error });

  const handleCase: ResponseFuncs = {
    // ? RESPONSE FOR GET REQUEST
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { User } = await connect();
      res.json(await User.find({}).catch(catcher));
      res.end();
    },
  };

  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: "No Response for This Request" });
};

export default handler;
