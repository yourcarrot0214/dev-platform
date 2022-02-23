import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/mongodb/mongodb";
import { DBPostType, DBCommentType, DBRepliesType } from "../../../types/post";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const { id } = req.query;

    try {
      const { Comment, Replies } = await connect();
      const catcher = (error: Error) => res.status(400).json({ error });

      const comment = await Comment.findById(id).catch(catcher);
      await comment.remove();
      await Replies.deleteMany({ responseTo: id }).catch(catcher);

      return res.status(200).end();
    } catch (error) {
      console.log(">> comment delete error :: ", error);
    }
  }
};
