import mongoose from "mongoose";
const { Schema } = mongoose;

const repliesSchema = new mongoose.Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
    },
    responseTo: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
    },
  },
  { timestamps: true }
);

export default repliesSchema;
