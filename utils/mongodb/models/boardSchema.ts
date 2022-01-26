import mongoose from "mongoose";
const { Schema } = mongoose;

const boardSchema = new mongoose.Schema({
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
});

export default boardSchema;
