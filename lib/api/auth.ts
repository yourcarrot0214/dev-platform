import axios from ".";
import { UserType } from "../../types/user.d";

interface SignUpAPIBody {
  email: string;
  name: string;
  password: string;
}

export const signupAPI = (body: SignUpAPIBody) =>
  axios.post<UserType>("/api/auth/signup", body);

interface LoginAPIBody {
  email: string;
  password: string;
}

export const loginAPI = (body: LoginAPIBody) =>
  axios.post<UserType>("/api/auth/login", body);

export const authAPI = () => axios.get<UserType>("/api/auth/auth");
