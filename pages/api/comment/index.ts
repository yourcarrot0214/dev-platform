import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/mongodb/mongodb";
import {
  CommentType,
  PostType,
  DBPostType,
  DBCommentType,
} from "../../../types/post";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    // TODO : get all comment documents data
    const { Comment } = await connect();
    const catcher = (error: Error) => res.statusCode(400).json({ error });
    return res
      .status(200)
      .send(
        await Comment.find({})
          .populate("author", "_id name profileImage")
          .catch(catcher)
      );
  }

  if (req.method === "POST") {
    // TODO : create & save new comment data

    const { userId, content, responseTo } = req.body;
    if (!userId || !content || !responseTo) {
      res.statusCode = 400;
      return res.send("필수 데이터가 없습니다.");
    }

    const { Comment, Board } = await connect();
    const catcher = (error: Error) => res.statusCode(400).json({ error });

    const post: DBPostType = await Board.findById({ _id: responseTo }).catch(
      catcher
    );

    const commentData = {
      author: userId,
      content,
      responseTo,
    };

    const newComment: DBCommentType = await Comment.create(commentData).catch(
      catcher
    );

    await Board.findOneAndUpdate(
      { _id: post._id },
      { comment: post.comment.concat(newComment._id) },
      { new: true }
    ).catch(catcher);

    res.statusCode = 200;
    return res.send(
      await Board.findById({ _id: responseTo })
        .populate("author", "_id name profileImage")
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
  }

  res.status(405);
  return res.end();
};

/*
  ! GET
  ? responseTo === postId 일치하는 목록을 찾아서 리턴
  
*/
