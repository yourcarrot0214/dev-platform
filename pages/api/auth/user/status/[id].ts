import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../../../utils/mongodb/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { id } = req.query;
    const { User } = await connect();

    const friend = await User.findById(id).exec();

    if (!friend) {
      res.status(404).send("Friend Not Found.");
    }

    return res.status(201).json({ status: friend.token !== "" ? true : false });
  }

  res.status(405).end();
};
