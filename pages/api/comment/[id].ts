import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/mongodb/mongodb";
import { DBPostType, DBCommentType, DBRepliesType } from "../../../types/post";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const { id } = req.query;

    try {
      const { Comment, Board, Replies } = await connect();
      const catcher = (error: Error) => res.status(400).json({ error });

      const comment: DBCommentType = await Comment.findById(id).catch(catcher);
      // const post: DBPostType = await Board.findById(comment.responseTo).catch(
      //   catcher
      // );
      // await comment.remove();

      // const updatedPost = await Board.findById(comment.responseTo)
      //   .populate({
      //     path: "comment",
      //     populate: { path: "author", select: "_id name profileImage" },
      //   })
      //   .populate({
      //     path: "replies",
      //     populate: { path: "author", select: "_id name profileImage" },
      //   })
      //   .catch(catcher);

      // return res.status(200).send(updatedPost);

      const post = await Board.findById(comment.responseTo)
        .populate("replies", "responseTo")
        .catch(catcher);

      post.comment = post.comment.filter((commentId) => commentId !== id);

      const filteredReplies = post.replies.filter(
        (reply) => reply.responseTo !== id
      );
      post.replies = filteredReplies.map((reply) => reply._id);

      post.save();

      await Replies.findOneAndDelete({ responseTo: id }).catch(catcher);

      return res.status(200).send(
        await Board.findById(post._id)
          .populate({
            path: "comment",
            populate: { path: "author", select: "_id name profileImage" },
          })
          .populate({
            path: "replies",
            populate: { path: "author", select: "_id name profileImage" },
          })
          .catch(catcher)
      );
    } catch (error) {
      console.log(">> comment delete error :: ", error);
    }
  }
};

/*
  TODO : DELETE
    ? 요청된 id의 comment를 삭제합니다.
    ? post.comment 에서 req.query.id와 일치하는 comment값을 삭제합니다.
    ? post.replies 에서 replies
*/
