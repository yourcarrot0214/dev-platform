import { UserType } from "./user.d";

// * user redux state
export type UserState = UserType & {
  isLogged: boolean;
};
