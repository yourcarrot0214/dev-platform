import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/mongodb/mongodb";
import { DBPostType, DBCommentType, DBRepliesType } from "../../../types/post";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PATCH") {
    const { id } = req.query;
    const { repliesIdList } = req.body;

    try {
      const { Comment, Board, Replies } = await connect();
      const catcher = (error: Error) => res.status(400).json({ error });

      const comment: DBCommentType = await Comment.findById(id).catch(catcher);
      const post: DBPostType = await Board.findById(comment.responseTo).catch(
        catcher
      );
      post.comment = post.comment.filter((commentId) => commentId !== id);

      if (repliesIdList.length !== 0) {
        repliesIdList.forEach((repliesId) => {
          Replies.findOneAndDelete({ _id: repliesId }).catch(catcher);
          post.replies.filter((id) => id !== repliesId);
        });
      }

      post.save();
      comment.remove();

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
    ? post.replies 에서 req.body.repliesIdList에 있는 id 값들을 삭제합니다.
    ? Replies document에 있는 repliesId 값과 일치하는 replies를 삭제합니다.
    ? update된 post 정보를 리턴합니다.
*/
