import { UserType } from "./user.d";
import { PostType } from "./post.d";

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
  detail: PostType | null;
};
