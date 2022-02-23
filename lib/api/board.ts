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

export const postingAPI = (requestBody: PostingRequestBody) =>
  axios.post<PostType>("/api/posting", requestBody);

export const getBoardListAPI = () => axios.get<PostType[]>("/api/posting");

export const getPostAPI = (postId: string) =>
  axios.get<DetailPostType>(`/api/posting/${postId}`);

export const updatePostingAPI = (
  postId: string,
  requestBody: PostingRequestBody
) => axios.patch<PostType>(`/api/posting/${postId}`, requestBody);

export const deletePostingAPI = (postId: string) =>
  axios.delete(`/api/posting/${postId}`);

interface CommentRequestBody {
  content: string;
}

export const getCommentListAPI = () => axios.get<CommentType[]>(`/api/comment`);

export const commentAPI = (requestBody: CommentRequestBody) =>
  axios.post<CommentType>("/api/comment", requestBody);

export const updateCommentAPI = (
  commentId: string,
  requestBody: CommentRequestBody
) => axios.patch(`/api/comment/${commentId}`, requestBody);

interface DeleteRequestBody {
  repliesIdList: string[] | undefined;
}

export const deleteCommentAPI = (commentId: string) =>
  axios.delete(`/api/comment/${commentId}`);

interface RepliesRequestBody {
  userId: string;
  content: string;
  responseTo: string;
  postId: string;
}

export const getRepliesListAPI = () => axios.get<RepliesType[]>("/api/replies");

export const repliesAPI = (requestBody: RepliesRequestBody) =>
  axios.post<RepliesType>("/api/replies", requestBody);

export const deleteRepliesAPI = (repliesId: string) =>
  axios.delete(`/api/replies/${repliesId}`);
