import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/mongodb/mongodb";
import { CommentType, PostType } from "../../../types/post";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    // TODO : get all comment documents data
    const { Comment } = await connect();
    const catcher = (error: Error) => res.statusCode(400).json({ error });
    return res.status(200).send(await Comment.find({}).catch(catcher));
  }

  if (req.method === "POST") {
    // TODO : create & save new comment data

    const { userId, content, responseTo } = req.body;
    if (!userId || !content || !responseTo) {
      res.statusCode = 400;
      return res.send("필수 데이터가 없습니다.");
    }

    const { Comment } = await connect();
    const catcher = (error: Error) => res.statusCode(400).json({ error });

    const newComment = {
      author: userId,
      content,
      responseTo,
    };

    await Comment.create(newComment).catch(catcher);

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
