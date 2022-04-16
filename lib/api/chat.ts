import axios from ".";
import { ChatRoomList, ChatMember, ChatRoom, Message } from "../../types/chat";

const API_CHAT = "/api/chat";
const API_CHAT_MESSAGE = "/api/chat/message";

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
*/

// * 채팅방 목록 불러오기
export const getChatListAPI = () => axios.get<ChatRoomList[]>(API_CHAT);

// * 채팅방 정보 불러오기
type ChatRoomAPIBody = {
  roomId: string;
  userId: string;
};
export const getChatRoomAPI = ({ roomId, userId }: ChatRoomAPIBody) =>
  axios.post<ChatRoom>(`${API_CHAT}/${roomId}`, { roomId, userId });

// * 채팅방 퇴장시
export const exitChatRoomAPI = ({ roomId, userId }: ChatRoomAPIBody) => {
  axios.patch(`${API_CHAT}/${roomId}`, { roomId, userId });
};

// * 채팅방 메시지 보내기
type MessageAPIBody = {
  userId: string;
  message: string;
};
export const sendMessageAPI = ({ userId, message }: MessageAPIBody) =>
  axios.post<Message>(API_CHAT_MESSAGE, { userId, message });
