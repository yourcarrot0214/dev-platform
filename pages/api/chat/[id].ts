import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../../types/chat";
import { connect } from "../../../utils/mongodb/mongodb";

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "POST") {
    const { Chat } = await connect();

    const chat = {
      members: [req.body._id],
    };

    const catcher = (error: Error) => res.statusCode(400).json({ error });
    const newChat = await Chat.create(chat).catch(catcher);

    res.statusCode = 201;
    return res.send(newChat);
  }

  if (req.method === "PATCH") {
    const { Chat, Message } = await connect();

    const catcher = (error: Error) => res.statusCode(400).json({ error });
    const chatroom = await Chat.findOne({ _id: req.query.id }).catch(catcher);
    const newMessage = await Message.create(req.body).catch(catcher);
    chatroom.message.push(newMessage._id);
    chatroom.save();

    return res.status(200).send(chatroom);
  }

  res.status(400).end();
};
