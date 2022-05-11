import io, { Socket } from "socket.io-client";
import EVENTS from "../../utils/socket/events";
let socket: undefined | Socket;

export type InitiateSocketProps = {
  room: string;
  user: {
    _id: string;
    name: string;
    profileImage: string;
  };
};

export const initiateSocket = ({ room, user }: InitiateSocketProps) => {
  socket = io({ path: "/api/chats/socketio" });
  console.log("🌏 Socket Connected ...", socket);
  if (socket && room) socket.emit(EVENTS.CLIENT.JOIN_ROOM, { room, user });
};

export const disconnectSocket = () => {
  console.log("🌏 Socket Disconnected ...");
  if (socket) socket.disconnect();
};

export const subscribeToChat = (cb: Function) => {
  if (!socket) return true;

  socket.on(EVENTS.SERVER.ROOM_MESSAGE, (message) => {
    console.log("🌏 socket event received.");
    return cb(null, message);
  });
};

export const subscribeToChatMember = (cb: Function) => {
  if (!socket) return true;

  socket.on(EVENTS.SERVER.JOINED_ROOM, (user) => {
    console.log("🌏 USER JOINED ROOM : ", user);
    return cb(null, user);
  });
};

type EmitMessage = {
  username: string;
  message: string;
  timestamp: string;
  roomId: string;
};

export const emitMessage = (message: EmitMessage) => {
  if (socket) socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, message);
};
