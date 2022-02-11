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
    responseTo: {
      type: Schema.Types.ObjectId,
      ref: "Board",
    },
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Replies",
      },
      { default: [] },
    ],
  },
  { timestamps: true }
);

export default commentSchema;
