export type PostType = {
  _id: string;
  author: object;
  title: string;
  content: string;
  hashtags: string[];
  photos: string[];
  createdAt: string;
  updatedAt: string;
};

export type CommentType = {
  _id: string;
  postId: string;
  author: string;
  content: string;
  craetedAt: string;
  updatedAt: string;
};
