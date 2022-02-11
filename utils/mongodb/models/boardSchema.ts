import mongoose from "mongoose";
import commentSchema from "./commentSchema";
const { Schema } = mongoose;

const boardSchema = new mongoose.Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    hashtags: {
      type: Array,
      default: [],
    },
    photos: {
      type: Array,
      default: [],
    },
    comment: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

export default boardSchema;
