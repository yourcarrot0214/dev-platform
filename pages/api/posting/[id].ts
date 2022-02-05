import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/mongodb/mongodb";
import { PostType } from "../../../types/post";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { id } = req.query;
    const convertId = id.split("=")[1];

    try {
      const { Board } = await connect();
      const post: PostType = await Board.findById(convertId).exec();

      return res.status(200).send(post);
    } catch (error) {
      console.log(">> post get error.");
    }
  }

  if (req.method === "PATCH") {
    const { id } = req.query;
    const convertId = id.split("=")[1];
    console.log(">> req.body", req.body);
    try {
      const { Board } = await connect();
      console.log(">> ID :: ", req.body._id);
      const newPost = {
        ...req.body,
        updatedAt: new Date(),
      };
      return res
        .status(200)
        .send(
          await Board.findOneAndUpdate({ _id: req.body._id }, newPost, {
            new: true,
          })
        );
    } catch (error) {
      console.log(">> patch error :: ", error);
    }
  }

  res.statusCode = 405;
  return res.end();
};
