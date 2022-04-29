import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../../types/chat";
import { connect } from "../../../utils/mongodb/mongodb";
import { ChatDB } from "../../../types/chat";

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  // * createChatRoomAPI ✅
  if (req.method === "POST") {
    const { Chat } = await connect();
    const catcher = (error: Error) => res.status(400).json({ error });
    const newChatRoom = await Chat.create({ members: [req.body.userId] }).catch(
      catcher
    );

    return res.status(201).send(newChatRoom);
  }

  // * getChatListAPI ✅
  if (req.method === "GET") {
    const { Chat } = await connect();
    const catcher = (error: Error) => res.status(400).json({ error });
    const chatlist = await Chat.find({})
      .populate("members", "_id name profileImage")
      .catch(catcher);

    return res.status(201).send(
      chatlist.map((chat: ChatDB) => {
        return { _id: chat._id, members: chat.members, title: chat.title };
      })
    );
  }
};
