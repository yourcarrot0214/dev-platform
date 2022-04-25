import { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import EVENTS from "../utils/socket/events";
import useTimeStamp from "../components/views/chat/useTimeStamp";

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
    socket.on("connect", () => {
      console.log("🌏 Socket connect : ", socket);
      socket.connect();
    });

    socket.on(EVENTS.SERVER.JOINED_ROOM, (joinedRoomId: string) => {
      console.log("EVENTS.SERVER.JOINED_ROOM : ", joinedRoomId);
      setRoomId(joinedRoomId);
      setMessages([]);
    });

    socket.on(EVENTS.SERVER.LEAVED_ROOM, (leavedRoomId: string) => {
      console.log("EVENTS.SERVER.LEAVERD_ROOM : ", leavedRoomId);
      setRoomId("");
    });

    socket.on(
      EVENTS.SERVER.ROOM_MESSAGE,
      ({ message, user, timestamp }: Messages) => {
        console.log("EVENTS.SERVER.ROOM_MESSAGE : ", {
          message,
          user,
          timestamp,
        });
        setMessages((messages) => [...messages, { message, user, timestamp }]);
      }
    );

    return () => {
      console.log("DISCONNECT");
      socket.disconnect();
    };
  }, [socket]);

  return { socket, roomId, setRoomId, messages, setMessages };
};

export default useSocketClient;
