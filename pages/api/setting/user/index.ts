import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../../utils/mongodb/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PATCH") {
    const { userId, imageLocation } = req.body;
    const { User } = await connect();
    const catcher = (error: Error) => res.status(400).json(error);

    User.findByIdAndUpdate(
      { _id: userId },
      { profileImage: imageLocation },
      { new: true }
    ).catch(catcher);

    res.statusCode = 201;
    return res.end();
  }

  res.statusCode = 405;
  return res.end();
};
