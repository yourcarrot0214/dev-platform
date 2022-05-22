import axios from "../index";

const API_SETTING_USER = "/api/setting/user";

export type PatchProfileImageAPI = {
  userId: string;
  imageLocation: string;
};

export type UserProps = {
  _id: string;
  name?: string;
  profileImage?: string;
};

export const updateProfileImageAPI = ({ _id, profileImage }: UserProps) =>
  axios.patch(API_SETTING_USER, { _id, profileImage });

export const updateUserNameAPI = ({ _id, name }: UserProps) =>
  axios.patch(API_SETTING_USER, { _id, name });
