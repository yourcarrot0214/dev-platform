import mongoose, { Model } from "mongoose";
import userSchema from "./models/userSchema";
import boardSchema from "./models/boardSchema";
import commentSchema from "./models/commentSchema";
import repliesSchema from "./models/repliesSchema";
import chatSchema from "./models/chatSchema";
import messageSchema from "./models/messageSchema";

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
  const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);
  const Message =
    mongoose.models.Message || mongoose.model("Message", messageSchema);

  return { connectDB, User, Board, Comment, Replies, Chat, Message };
};
