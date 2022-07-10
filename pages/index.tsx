import { useEffect } from "react";
import Home from "../components/home/Home";

export default function home(props) {
  useEffect(() => {
    document.title = "DEV Platform 🥕";
  }, []);
  return <Home />;
}
