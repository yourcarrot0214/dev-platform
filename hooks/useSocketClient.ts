import { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import EVENTS from "../utils/socket/events";

const socket: Socket = io({ path: "/api/chats/socketio" });

interface Messages {
  user: string;
  message: string;
  timestamp: string;
}

const useSocketClient = () => {
  const [roomId, setRoomId] = useState<string>("");
  const [messages, setMessages] = useState<Messages[]>([]);

  useEffect(() => {
    socket.on(EVENTS.connection, () => {
      console.log("🌏 Socket connect");
    });

    socket.on(EVENTS.SERVER.JOINED_ROOM, (joinedRoomId) => {
      console.log("EVENTS.SERVER.JOINED_ROOM : ", joinedRoomId);
      setRoomId(roomId);
    });

    socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({ message, user, timestamp }) => {
      console.log("EVENTS.SERVER.ROOM_MESSAGE : ", {
        message,
        user,
        timestamp,
      });
      messages.push({ message, user, timestamp });
      setMessages([...messages]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return { socket, roomId, setRoomId, messages, setMessages };
};

export default useSocketClient;
