import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../../types/chat";

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "POST") {
    console.log(">> socketio API");
    const message = req.body;
    res.socket.server.io.emit("message", message);

    res.status(201).json(message);
  }
};
