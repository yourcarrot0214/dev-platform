import axios from ".";
import { ChatRoomList, ChatMember, ChatRoom, Message } from "../../types/chat";

const API_CHAT = "/api/chats";
const API_CHAT_MESSAGE = "/api/chats/messages";

/*
  TODO. API 호출 상황 정리
    ? 유저가 /chat page에 접근할 때.
      * `${API_CHAT}`
      * GET
      * db에서 chat document의 _id, members값이 담긴 정보를 받아온다.
    ? 유저가 채팅방 목록 중 하나를 클릭해서 입장할 때.
      * `${API_CHAT}/${roomId}`
      * POST
      * {roomId, userId}
      * chat document의 members 배열에 userId를 추가한다.
      * update된 chat document를 받아온다.
    ? 유저가 채팅방에서 퇴장할 때.(socket.disconnection())
      * `${API_CHAT}/${roomId}`
      * PATCH
      * chat document의 members 배열에 userId를 삭제한다.
    ? 유저가 채팅방에서 메시지를 보낼 때.
      * `${API_CHAT_MESSAGE}`
      * POST
      * {userId, message}
      * 생성된 message document를 받아온다.
    ? 유저가 채팅방을 생성할 때.
      * `${API_CHAT}`
      * POST
      * {userId}
      * 신규 Chat document를 생성하고 생성된 document를 받아온다.
*/

// * 채팅방 목록 불러오기 ✅
export const getChatListAPI = () => axios.get<ChatRoomList[]>(API_CHAT);

// * 채팅방 입장하기
type JoinChatRoomAPI = {
  roomId: string;
  userId: string;
};
export const joinChatRoomAPI = ({ roomId, userId }: JoinChatRoomAPI) =>
  axios.post(`${API_CHAT}/${roomId}`, userId);

// * 채팅방 생성하기 ✅
type CreateChatRoom = {
  userId: string;
};
export const createChatRoomAPI = (userId: CreateChatRoom) =>
  axios.post<ChatRoom>(API_CHAT, { userId });

// * 채팅방 정보 불러오기 ✅
export const getChatRoomAPI = (roomId: string) =>
  axios.get<ChatRoom>(`${API_CHAT}/${roomId}`);

// * 채팅방 퇴장시 ✅
type ExitChatRoomAPI = {
  roomId: string;
  userId: string;
};
export const exitChatRoomAPI = ({ roomId, userId }: ExitChatRoomAPI) => {
  axios.patch(`${API_CHAT}/${roomId}`, { userId });
};

// * 채팅방 메시지 보내기 ✅
type MessageAPIBody = {
  userId: string;
  message: string;
  roomId: string;
};
export const sendMessageAPI = ({ userId, message, roomId }: MessageAPIBody) =>
  axios.post<Message>(API_CHAT_MESSAGE, { userId, message, roomId });
