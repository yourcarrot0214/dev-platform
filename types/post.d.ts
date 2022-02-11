export type PostType = {
  _id: string;
  author: object;
  title: string;
  content: string;
  hashtags: string[];
  photos: string[];
  createdAt: string;
  updatedAt: string;
  comment: string[];
  replies: string[];
};

export type CommentType = {
  _id: string;
  responseTo: string;
  author: object;
  content: string;
  craetedAt: string;
  updatedAt: string;
};

export type RepliesType = {
  _id: string;
  responseTo: string;
  author: object;
  content: string;
  createdAt: string;
  updatedAt: string;
};
