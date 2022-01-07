import axios from "axios";
import { UserType } from "../../types/user.d";

interface SignUpAPIBody {
  email: string;
  name: string;
  password: string;
}

export const signupAPI = (body: SignUpAPIBody) =>
  axios.post<UserType>("/api/auth/signup", body);
