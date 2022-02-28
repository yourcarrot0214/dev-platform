import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../../utils/mongodb/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    try {
      const { User } = await connect();
      await User.findByIdAndUpdate(req.query.id, { token: "" }).exec();

      res.setHeader("Set-cookie", "access_token=; path=/; expires=; httponly");
      return res.status(200).end();
    } catch (error) {
      console.log(">> user logout error :: ", error);
    }
  }
};
