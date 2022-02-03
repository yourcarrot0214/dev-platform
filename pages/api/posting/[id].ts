import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/mongodb/mongodb";
import { PostType } from "../../../types/post";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { id } = req.query;
    console.log(">> postId :: ", id.split("=")[1]);
    const convertId = id.split("=")[1];

    try {
      const { Board } = await connect();
      const post: PostType = await Board.findById(convertId).exec();
      console.log(post);
      return res.status(200).send(post);
    } catch (error) {
      console.log(">> post get error.");
    }
  }

  res.statusCode = 405;
  return res.end();
};
