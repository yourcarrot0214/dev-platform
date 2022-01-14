import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    try {
      res.setHeader("Set-cookie", "access_token=; path=/; expires=; httponly");
      res.statusCode = 200;
      return res.end();
    } catch (error) {
      console.log(error);
      return res.send(error.message);
    }
  }

  res.statusCode = 405;
  return res.end();
};
