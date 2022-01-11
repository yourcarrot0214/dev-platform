import React from "react";
import { NextPage } from "next";
import { AppContext } from "next/app";
import Home from "../components/home/Home";

export default function home({ isConnected }: { isConnected: boolean }) {
  console.log("isConnected : ", isConnected);
  return <Home />;
}

export async function getServerSideProps(context: AppContext) {
  try {
    // client.db() will be the default database passed in the MONGODB_URI
    // You can change the database by calling the client.db() function and specifying a database like:
    // const db = client.db("myDatabase");
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}
