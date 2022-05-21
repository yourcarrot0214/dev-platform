import axios from ".";

export const API_FILES_UPLOAD = "/api/files/upload";

export const uploadFileAPI = (file: FormData) =>
  axios.post(API_FILES_UPLOAD, file);
