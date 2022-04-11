import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// axios.defaults.headers.common["cookie"] = "";

export default axios;
