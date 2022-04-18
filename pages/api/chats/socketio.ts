import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../../types/chat";
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

    io.on("connection", async (socket) => {
      console.log("🌏 io connected : ", socket.rooms);

      // ! SOCKET TEST CODE
      const { data } = await Chat.find({}).catch(catcher);
      socket.emit(EVENTS.SERVER.ROOMS, data);

      socket.on(EVENTS.CLIENT.JOIN_ROOM, (roomId) => {
        socket.join(roomId);
        socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
      });

      // socket.on("join room", (user) => {
      //   socket.join("test room");
      //   console.log(`${user.name} join test room. 🎫`);
      //   socket.rooms.add(`${socket.id}`);
      //   console.log("🥕 socket.rooms : ", socket.rooms);

      //   io.to(`${socket.id}`).emit("test room message", {
      //     user: "SYSTEM",
      //     message: "test room joined. 🎫",
      //   });
      // });

      socket.on("login", (data) => {
        console.log("client login 🙋‍♂️ ", data.name);
        socket.data.name = data.name;
        socket.data._id = data._id;
        socket.data.profileImage = data.profileImage;

        io.emit("login", data);
      });

      socket.on("message", (data) => {
        console.log("message from client 📨");
        const message = {
          user: socket.data.name,
          profileImage: socket.data.profileImage,
          message: data.message,
        };

        socket.broadcast.emit("message", message);
      });

      socket.on("disconnect", () => {
        console.log("🌏 socket disconnect : ", socket.rooms);
        const { ampm, hours, minutes } = useTimeStamp(new Date(Date.now()));
        const message = {
          user: "SYSTEM",
          message: `${socket.data.name} 유저가 나갔습니다.`,
          timestamp: `${ampm} ${hours}:${minutes}`,
        };
        socket.broadcast.emit("message", message);
      });
    });

    res.socket.server.io = io;
  }

  res.end();
};

/*
  TODO : Room 기능 적용하기
    ? server -> io.of('pathname'), pathname.on('connect', (socket) => { ... something to do})
    ? pages/api/[pathname].ts 경로에 위 로직 작성
*/
