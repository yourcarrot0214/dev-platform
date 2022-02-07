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
    try {
      const { Board } = await connect();

      const newPost = {
        ...req.body,
        updatedAt: new Date(),
      };
      return res.status(200).send(
        await Board.findOneAndUpdate({ _id: id }, newPost, {
          new: true,
        })
      );
    } catch (error) {
      console.log(">> post patch error :: ", error);
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.query;

    try {
      const { Board } = await connect();
      return res.status(200).send(await Board.findOneAndDelete({ _id: id }));
    } catch (error) {
      console.log(">> post delete error :: ", error);
    }
  }

  res.statusCode = 405;
  return res.end();
};
