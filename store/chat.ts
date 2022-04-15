import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { ChatRoomList, ChatRoom, Message } from "../types/chat";
import { ChatState } from "../types/reduxState";

const initialState: ChatState = {
  chatlist: [],
  chatRoom: null,
};

export type ChatReducerState = typeof initialState;

const chat = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatList(state: ChatState, action: PayloadAction<ChatRoomList[]>) {
      state.chatlist = action.payload;
    },
    setChatRoom(state: ChatState, action: PayloadAction<ChatRoom>) {
      state.chatRoom = action.payload;
    },
    setChatMessage(state: ChatState, action: PayloadAction<Message>) {
      state.chatRoom!.messages = state.chatRoom!.messages.concat(
        action.payload
      );
    },
    setInitChatRoom(state: ChatState) {
      state.chatRoom = null;
    },
  },
});

export const chatActions = { ...chat.actions };

export default chat;
