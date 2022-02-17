export type PostType = {
  _id: string;
  author: object;
  title: string;
  content: string;
  hashtags: string[];
  photos: string[];
  createdAt: string;
  updatedAt: string;
  comment: CommentType[];
  replies: RepliesType[];
};

export type CommentType = {
  _id: string;
  responseTo: string;
  author: object;
  content: string;
  createdAt: string;
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

export type DBPostType = {
  _id: string;
  author: string;
  title: string;
  content: string;
  hashtags: string[];
  photos: string[];
  createdAt: string;
  updatedAt: string;
  comment: string[];
  replies: string[];
};

export type DBCommentType = {
  _id: string;
  author: string;
  content: string;
  responseTo: string;
  createdAt: string;
  updatedAt: string;
};

export type DBRepliesType = {
  _id: string;
  author: string;
  content: string;
  responseTo: string;
  createdAt: string;
  updatedAt: string;
};
