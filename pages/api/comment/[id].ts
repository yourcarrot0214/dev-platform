import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/mongodb/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const { id } = req.query;

    try {
      const { Comment, Replies } = await connect();
      const catcher = (error: Error) => res.status(400).json({ error });

      const comment = await Comment.findById(id).catch(catcher);
      await comment.remove();
      await Replies.deleteMany({ responseTo: id }).catch(catcher);

      return res.status(204).end();
    } catch (error) {
      console.log(">> comment delete error :: ", error);
    }
  }

  if (req.method === "PATCH") {
    // * comment id
    const { id } = req.query;

    try {
      const { Comment } = await connect();
      const catcher = (error: Error) => res.status(400).json({ error });

      return res
        .status(200)
        .send(
          await Comment.findOneAndUpdate(
            { _id: id },
            { content: req.body.content },
            { new: true }
          )
            .populate("author", "_id name profileImage")
            .catch(catcher)
        );
    } catch (error) {
      console.log("comment update error :: ", error);
    }
  }

  return res.status(405).end();
};
