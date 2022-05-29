import { NextApiRequest } from "next";
import { NextApiResponseServerIO, EmitMessage } from "../../../types/chat";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import useTimeStamp from "../../../components/views/chat/useTimeStamp";
import EVENTS from "../../../utils/socket/events";
import { InitiateSocketProps } from "../../../lib/api/socket";

export const config = {
  api: {
    bodyParser: false,
  },
};

interface UseStringTimeStamp {
  (date: Date): string;
}

const useStringTimeStamp: UseStringTimeStamp = (date: Date) => {
  const { ampm, hours, minutes } = useTimeStamp(date);
  return `${ampm} ${hours}:${minutes}`;
};

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    console.log("New Socket.io server...✅");

    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: "/api/chats/socketio",
    });

    io.on(EVENTS.connection, async (socket) => {
      console.log("🌏 io connected : ", socket.rooms);
      let socketRoomId: undefined | string;

      socket.on(
        EVENTS.CLIENT.JOIN_ROOM,
        ({ room, user }: InitiateSocketProps) => {
          console.log(`🌏 ${socket.id} joining ${room}`);
          socketRoomId = room;
          socket.data.name = user.name;
          socket.join(room);

          const message = {
            username: "SYSTEM",
            message: `${socket.data.name} 유저가 접속했습니다.`,
            timestamp: useStringTimeStamp(new Date(Date.now())),
            roomId: socketRoomId,
          };
          io.to(socketRoomId as string).emit(
            EVENTS.SERVER.ROOM_MESSAGE,
            message
          );
          io.to(socketRoomId as string).emit(EVENTS.SERVER.JOINED_ROOM, user);
        }
      );

      socket.on(EVENTS.CLIENT.LEAVE_ROOM, (userId: string) => {
        console.log("🌏 LEAVED_ROOM : ", userId);
        io.to(socketRoomId as string).emit(EVENTS.SERVER.LEAVED_ROOM, userId);
      });

      socket.on(EVENTS.CLIENT.SEND_ROOM_MESSAGE, (message: EmitMessage) => {
        console.log("💬 Client send Message : ", message);
        io.to(message.roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, message);
      });

      socket.on("disconnect", () => {
        console.log("🌏 socket disconnect : ", socket.id);
        const message = {
          username: "SYSTEM",
          message: `${socket.data.name} 유저가 나갔습니다.`,
          timestamp: useStringTimeStamp(new Date(Date.now())),
          roomId: socketRoomId,
        };
        io.to(socketRoomId as string).emit(EVENTS.SERVER.ROOM_MESSAGE, message);
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
