import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../../../types/chat";
import { connect } from "../../../../utils/mongodb/mongodb";

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  const { Chat, Message } = await connect();
  const catcher = (error: Error) => res.status(400).json({ error });

  // * sendMessageAPI ✅
  if (req.method === "POST") {
    const { userId, message, roomId } = req.body;

    const chatroom = await Chat.findById({ _id: roomId }).catch(catcher);
    const newMessage = await Message.create({
      author: userId,
      message: message,
      roomId: roomId,
    }).catch(catcher);
    chatroom.messages.push(newMessage._id);
    chatroom.save();

    return res.status(201).send(newMessage);
  }

  // * 임시 socket response
  if (req.method === "PATCH") {
    console.log(">> socketio API");
    const message = req.body;
    res.socket.server.io.emit("message", message);

    res.status(201).send(message);
  }

  return res.status(400).end();
};
