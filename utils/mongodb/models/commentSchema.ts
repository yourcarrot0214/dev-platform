import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new mongoose.Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
    },
  },
  { timestamps: true }
);

export default commentSchema;
