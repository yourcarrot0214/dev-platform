import React from "react";
import Home from "../components/home/Home";

export default function home({ isConnected }: { isConnected: boolean }) {
  console.log("isConnected : ", isConnected);
  return <Home />;
}
