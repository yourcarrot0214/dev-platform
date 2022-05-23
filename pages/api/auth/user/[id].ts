import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../../utils/mongodb/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { User, Board, Comment, Replies } = await connect();
  const catcher = (err: Error) => res.status(401).json(err);
  const { id } = req.query;

  if (req.method === "DELETE") {
    await User.deleteOne({ _id: id }).catch(catcher);
    await Board.deleteMany({ author: id }).catch(catcher);
    await Comment.deleteMany({ author: id }).catch(catcher);
    await Replies.deleteMany({ author: id }).catch(catcher);

    res.setHeader("Set-cookie", "access_token=; path=/; expires=; httponly");
    return res.end();
  }
};
