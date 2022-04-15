import { UserType } from "./user.d";
import { PostType, CommentType, RepliesType, DetailPostType } from "./post.d";
import { ChatRoomList, ChatRoom } from "./chat";

// * user redux state
export type UserState = UserType & {
  isLogged: boolean;
};

// * auth redux state
export type AuthState = {
  authMode: "signup" | "login";
};

// * common redux state
export type CommonState = {
  validateMode: boolean;
};

// * board redux state
export type BoardState = {
  postlist: PostType[];
  commentlist: CommentType[];
  replieslist: RepliesType[];
  detail: DetailPostType | null;
};

// * chat redux state
export type ChatState = {
  chatlist: ChatRoomList[];
  chatRoom: ChatRoom | null;
};
