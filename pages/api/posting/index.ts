import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/mongodb/mongodb";
import { PostType } from "../../../types/post";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      // TODO 1. request body를 검증합니다.
      // ? hashtags와 photos는 required값이 아니기 때문에 검증에서 제외합니다.
      const { title, content, userId, photos, hashtags } = req.body;
      if (!title || !content || !userId) {
        res.statusCode = 400;
        return res.send("필수 값이 없습니다.");
      }

      // TODO 2. DB에 connect 하고 board document 정보를 불러옵니다.
      const { Board } = await connect();

      // TODO 3. DB에 저장하기 위한 정보들을 생성합니다.
      const newPosting = {
        author: userId,
        title,
        content,
        photos,
        hashtags,
      };

      // TODO 4. board에 포스팅 정보를 저장합니다.
      const catcher = (error: Error) => res.statusCode(400).json({ error });
      const newPost = await Board.create(newPosting).catch(catcher);

      res.statusCode = 201;
      return res.send(newPost._id);
    } catch (error) {
      console.log(">> posting error :: ", error);
    }
  }

  if (req.method === "GET") {
    try {
      const { Board } = await connect();

      const catcher = (error: Error) => res.statusCode(400).json({ error });
      res.statusCode = 200;
      return res.json(
        await Board.find({})
          .populate("author", "_id name profileImage")
          .catch(catcher)
      );
    } catch (error) {
      console.log(">> error :: ", error);
    }
  }
  res.statusCode = 405;
  return res.end();
};
