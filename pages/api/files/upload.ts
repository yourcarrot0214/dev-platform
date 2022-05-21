import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const form = new formidable.IncomingForm();
      form.parse(req, async (err, field, files) => {
        console.log(files);
      });
    } catch (error) {
      console.log(error);
      res.end();
    }
  }

  res.statusCode = 405;
  return res.end();
};
