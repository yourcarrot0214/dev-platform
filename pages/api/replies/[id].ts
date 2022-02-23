import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/mongodb/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const { id } = req.query;

    try {
      const { Replies } = await connect();
      const catcher = (error: Error) => res.status(400).json({ error });

      await Replies.findByIdAndDelete(id).catch(catcher);

      return res.status(200).end();
    } catch (error) {
      console.log(">> replies delete error :: ", error);
    }
  }

  if (req.method === "PATCH") {
    const { id } = req.query;

    try {
      const { Replies } = await connect();
      const catcher = (error: Error) => res.status(400).json({ error });

      return res
        .status(200)
        .send(
          await Replies.findOneAndUpdate(
            { _id: id },
            { content: req.body.content },
            { new: true }
          )
            .populate("author", "_id name profileImage")
            .catch(catcher)
        );
    } catch (error) {
      console.log(">> replies update error :: ", error);
    }
  }

  return res.status(405).end();
};
