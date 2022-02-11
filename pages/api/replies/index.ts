import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/mongodb/mongodb";
import { PostType, RepliesType } from "../../../types/post";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    // TODO : get all replies documents data
    const { Replies } = await connect();
    const catcher = (error: Error) => res.statusCode(400).json({ error });
    return res
      .status(200)
      .send(
        await Replies.find({})
          .populate("author", "_id name profileImage")
          .catch(catcher)
      );
  }

  if (req.method === "POST") {
    // TODO : create & save new replies data

    const { userId, content, responseTo, postId } = req.body;
    if (!userId || !content || !responseTo || !postId) {
      res.statusCode = 400;
      return res.send("필수 데이터가 없습니다.");
    }

    const { Board, Replies } = await connect();
    const catcher = (error: Error) => res.statusCode(400).json({ error });

    const post: PostType = await Board.findById({
      _id: postId,
    }).catch(catcher);

    const repliesData = {
      author: userId,
      content,
      responseTo,
    };

    const newReplies: RepliesType = await Replies.create(repliesData).catch(
      catcher
    );

    await Board.findOneAndUpdate(
      { _id: post._id },
      { replies: post.replies.concat(newReplies._id) },
      { new: true }
    ).catch(catcher);

    res.statusCode = 201;
    return res.end();
  }

  res.status(405);
  return res.end();
};

/*
  ! GET
  ? responseTo === postId 일치하는 목록을 찾아서 리턴
  
*/
