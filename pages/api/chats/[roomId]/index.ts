import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../../../types/chat";
import { connect } from "../../../../utils/mongodb/mongodb";

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  const { Chat } = await connect();
  const catcher = (error: Error) => res.status(400).json({ error });
  // * getChatRoomAPI ✅
  if (req.method === "GET") {
    const { roomId } = req.query;
    const chatRoom = await Chat.findById(roomId)
      .populate("members", "_id name profileImage")
      .populate({
        path: "messages",
        populate: { path: "author", select: "_id name profileImage" },
      })
      .catch(catcher);

    return res.status(201).send(chatRoom);
  }

  // * joinChatRoomAPI ✅
  if (req.method === "POST") {
    const { roomId } = req.query;
    const { userId } = req.body;

    const chatRoom = await Chat.findById(roomId).catch(catcher);
    chatRoom.members = chatRoom.members.concat(userId);
    chatRoom.save();

    const convertChatRoom = await Chat.findById(roomId)
      .populate("members", "_id name profileImage")
      .populate({
        path: "messages",
        populate: { path: "author", select: "_id name profileImage" },
      })
      .catch(catcher);

    return res.status(201).send(convertChatRoom);
  }

  // * exitChatRoomAPI ✅
  if (req.method === "PATCH") {
    const { roomId } = req.query;
    const { userId } = req.body;

    const chatRoom = await Chat.findById(roomId).catch(catcher);
    chatRoom.members = chatRoom.members.filter(
      (member: string) => String(member) !== userId
    );
    chatRoom.save();

    // ! chatRoom.save() method 검증
    return res.status(201).send(chatRoom);
  }

  res.status(400).end();
};
