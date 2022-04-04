import axios from ".";
import { UserType } from "../../types/user.d";

interface SignUpAPIBody {
  email: string;
  name: string;
  password: string;
}

const API_AUTH_SIGN_UP = "/api/auth/signup";
const API_AUTH_LOG_IN = "/api/auth/login";
const API_AUTH_LOG_OUT = "/api/auth/logout";
const API_AUTH_AUTH = "/api/auth/auth";

export const signupAPI = (body: SignUpAPIBody) =>
  axios.post<UserType>(API_AUTH_SIGN_UP, body);

interface LoginAPIBody {
  email: string;
  password: string;
}

export const loginAPI = (body: LoginAPIBody) =>
  axios.post<UserType>(API_AUTH_LOG_IN, body);

export const authAPI = () => axios.get<UserType>(API_AUTH_AUTH);

export const logoutAPI = (userId: string) =>
  axios.delete(`${API_AUTH_LOG_OUT}/${userId}`);
