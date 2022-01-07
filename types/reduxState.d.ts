import { UserType } from "./user.d";

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
