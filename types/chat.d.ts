import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export type ChatRoomList = {
  _id: string;
  members: ChatMember[];
};

export type ChatMember = {
  _id: string;
  name: string;
  profileImage: string;
};

export type ChatRoom = {
  _id: string;
  members: ChatMember[];
  messages: Message[];
};

export type Message = {
  _id: string;
  author: ChatMember;
  message: string;
  createdAt: string;
  roomId: string;
};

export type ChatDB = {
  _id: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
};
