import axios from ".";
import {
  PostType,
  CommentType,
  RepliesType,
  DetailPostType,
} from "../../types/post";

interface PostingRequestBody {
  title: string;
  hashtags: string[];
  content: string;
  userId: string;
  photos: string[];
}

const API_POSTING = "/api/posting";

export const postingAPI = (requestBody: PostingRequestBody) =>
  axios.post<PostType>(API_POSTING, requestBody);

export const getBoardListAPI = () => axios.get<PostType[]>(API_POSTING);

export const getPostAPI = (postId: string) =>
  axios.get<DetailPostType>(`${API_POSTING}/${postId}`);

export const updatePostingAPI = (
  postId: string,
  requestBody: PostingRequestBody
) => axios.patch<DetailPostType>(`${API_POSTING}/${postId}`, requestBody);

export const deletePostingAPI = (postId: string) =>
  axios.delete(`${API_POSTING}/${postId}`);

interface CommentRequestBody {
  content: string;
}

const API_COMMENT = "/api/comment";

export const getCommentListAPI = () => axios.get<CommentType[]>(API_COMMENT);

export const commentAPI = (requestBody: CommentRequestBody) =>
  axios.post<CommentType[]>(API_COMMENT, requestBody);

export const updateCommentAPI = (
  commentId: string,
  requestBody: CommentRequestBody
) => axios.patch(`${API_COMMENT}/${commentId}`, requestBody);

export const deleteCommentAPI = (commentId: string) =>
  axios.delete(`${API_COMMENT}/${commentId}`);

interface RepliesRequestBody {
  userId: string;
  content: string;
  responseTo: string;
  postId: string;
}

interface UpdateRepliesBody {
  content: string;
}

const API_REPLIES = "/api/replies";

export const getRepliesListAPI = () => axios.get<RepliesType[]>(API_REPLIES);

export const repliesAPI = (requestBody: RepliesRequestBody) =>
  axios.post<RepliesType[]>(API_REPLIES, requestBody);

export const updateRepliesAPI = (
  repliesId: string,
  requestBody: UpdateRepliesBody
) => axios.patch<RepliesType>(`${API_REPLIES}/${repliesId}`, requestBody);

export const deleteRepliesAPI = (repliesId: string) =>
  axios.delete(`${API_REPLIES}/${repliesId}`);
