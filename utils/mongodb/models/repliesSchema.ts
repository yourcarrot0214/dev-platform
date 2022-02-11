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
  },
  { timestamps: true }
);

export default repliesSchema;
