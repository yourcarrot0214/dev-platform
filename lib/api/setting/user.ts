import axios from "../index";

const API_SETTING_USER = "/api/setting/user";

export type PatchProfileImageAPI = {
  userId: string;
  imageLocation: string;
};

export const patchProfileImageAPI = ({
  userId,
  imageLocation,
}: PatchProfileImageAPI) =>
  axios.patch(API_SETTING_USER, { userId, imageLocation });
