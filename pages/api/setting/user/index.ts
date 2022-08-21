import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../../utils/mongodb/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PATCH") {
    const { _id } = req.body;
    const { User } = await connect();
    const catcher = (error: Error) => res.status(400).json(error);

    User.findByIdAndUpdate(
      { _id: _id },
      { [Object.keys(req.body)[1]]: Object.values(req.body)[1] },
      { new: true }
    ).catch(catcher);

    res.statusCode = 204;
    return res.end();
  }

  res.statusCode = 405;
  return res.end();
};
