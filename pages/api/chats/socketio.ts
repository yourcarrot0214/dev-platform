import { NextApiRequest } from "next";
import { NextApiResponseServerIO, SendRoomMessage } from "../../../types/chat";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import useTimeStamp from "../../../components/views/chat/useTimeStamp";
import EVENTS from "../../../utils/socket/events";
import { connect } from "../../../utils/mongodb/mongodb";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    console.log("New Socket.io server...✅");

    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: "/api/chats/socketio",
    });
    const { Chat } = await connect();
    const catcher = (error: Error) => res.status(400).json({ error });

    io.on(EVENTS.connection, async (socket) => {
      console.log("🌏 io connected : ", socket.rooms);

      const { data } = await Chat.find({}).catch(catcher);
      socket.emit(EVENTS.SERVER.ROOMS, data);

      socket.on(EVENTS.CLIENT.JOIN_ROOM, ({ roomId, user }) => {
        socket.data.name = user;
        socket.join(roomId);
        console.log(`🥕 ${user} joined ${roomId}...`);
        console.log(socket.rooms);
        socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
      });

      socket.on(EVENTS.CLIENT.LEAVE_ROOM, (roomId: string) => {
        socket.leave(roomId);
        console.log("🌏 user leaved room : ", roomId);
        console.log(socket.rooms);
      });

      socket.on(
        EVENTS.CLIENT.SEND_ROOM_MESSAGE,
        ({ message, roomId }: SendRoomMessage) => {
          console.log("🌏 EVENTS.CLIENT.SEND_ROOM_MESSAGE", {
            message,
            roomId,
          });
          socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, message);
        }
      );

      socket.on("disconnect", () => {
        console.log("🌏 socket disconnect : ", socket.rooms);
        const { ampm, hours, minutes } = useTimeStamp(new Date(Date.now()));
        const message = {
          user: "SYSTEM",
          message: `${socket.data.name} 유저가 나갔습니다.`,
          timestamp: `${ampm} ${hours}:${minutes}`,
        };
        socket.broadcast.emit(EVENTS.SERVER.ROOM_MESSAGE, message);
      });
    });

    res.socket.server.io = io;
  }

  res.end();
};

/*
  TODO : join message
    ? user가 접속하면 message 전달
*/
