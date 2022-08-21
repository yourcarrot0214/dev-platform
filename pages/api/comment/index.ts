import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/mongodb/mongodb";

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

    const { userId, content, postId } = req.body;
    if (!userId || !content || !postId) {
      res.statusCode = 400;
      return res.send("필수 데이터가 없습니다.");
    }

    const { Comment } = await connect();
    const catcher = (error: Error) => res.statusCode(400).json({ error });

    const commentData = {
      author: userId,
      content,
      postId,
    };

    await Comment.create(commentData).catch(catcher);

    res.statusCode = 201;
    return res.send(
      await Comment.find({ postId })
        .populate("author", "_id name profileImage")
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
