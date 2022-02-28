export type UserType = {
  _id: string;
  name: string;
  email: string;
  profileImage: string;
};

export type StoredUserType = {
  _id: string;
  name: string;
  email: string;
  password: string;
  profileImage: string;
  token: string;
};
