import mongoose, { Model } from "mongoose";
import userSchema from "./models/userSchema";
import boardSchema from "./models/boardSchema";
import commentSchema from "./models/commentSchema";
import repliesSchema from "./models/repliesSchema";

export const connect = async () => {
  const connectDB = await mongoose
    .connect(process.env.MONGODB_URI as string)
    .catch((err) => console.log("CONNECT ERROR :: ", err));
  console.log("Mongoose Connection Established");

  const User = mongoose.models.User || mongoose.model("User", userSchema);
  const Board = mongoose.models.Board || mongoose.model("Board", boardSchema);
  const Comment =
    mongoose.models.Comment || mongoose.model("Comment", commentSchema);
  const Replies =
    mongoose.models.Replies || mongoose.model("Replies", repliesSchema);

  return { connectDB, User, Board, Comment, Replies };
};
