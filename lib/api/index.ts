import Axios from "axios";

const axios = Axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_API_URL
      : "https://dev-platform.vercel.app/",
});

export default axios;
