import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/mongodb/mongodb";
import { PostType, CommentType, RepliesType } from "../../../types/post";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { id } = req.query;

    try {
      const { Board, Comment, Replies } = await connect();
      const catcher = (error: Error) => res.status(400).json({ error });
      const post: PostType = await Board.findById(id)
        .populate("author", "_id name profileImage")
        .catch(catcher);
      const comment: CommentType = await Comment.find({ postId: id })
        .populate("author", "_id name profileImage")
        .catch(catcher);
      const replies: RepliesType = await Replies.find({ postId: id })
        .populate("author", "_id name profileImage")
        .catch(catcher);

      return res
        .status(200)
        .send({ post: post, comment: comment, replies: replies });
    } catch (error) {
      console.log(">> post get error.");
    }
  }

  if (req.method === "PATCH") {
    const { id } = req.query;
    try {
      const { Board } = await connect();
      const catcher = (error: Error) => res.status(400).json({ error });

      const newPost = {
        ...req.body,
      };
      return res.status(200).send(
        await Board.findOneAndUpdate({ _id: id }, newPost, {
          new: true,
        })
          .populate("author", "_id name profileImage")
          .catch(catcher)
      );
    } catch (error) {
      console.log(">> post patch error :: ", error);
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.query;

    try {
      const { Board, Comment, Replies } = await connect();
      const catcher = (error: Error) => res.status(400).json({ error });
      const post = await Board.findById(id).catch(catcher);
      await post.remove();

      await Comment.deleteMany({ postId: id }).catch(catcher);
      await Replies.deleteMany({ postId: id }).catch(catcher);

      return res.status(204).end();
    } catch (error) {
      console.log(">> post delete error :: ", error);
    }
  }

  res.statusCode = 405;
  return res.end();
};
