import mongoose from "mongoose";
const { Schema } = mongoose;

const boardSchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

export default boardSchema;
