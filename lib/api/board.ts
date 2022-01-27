import axios from ".";
import { PostType } from "../../types/post";

interface PostingRequestBody {
  title: string;
  hashtags: string[];
  content: string;
  userId: string;
  username: string;
  photos: string[];
}

export const postingAPI = (requestBody: PostingRequestBody) =>
  axios.post<PostType>("/api/posting", requestBody);

export const getBoardListAPI = () => axios.get<PostType[]>("/api/posting");
