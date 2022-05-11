import mongoose from "mongoose";
const { Schema } = mongoose;

const chatSchema = new mongoose.Schema(
  {
    members: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    messages: {
      type: [Schema.Types.ObjectId],
      ref: "Message",
      default: [],
    },
    title: {
      type: String,
    },
  },
  {
    timestamps: {
      currentTime: () => new Date(Date.now() + 60 * 60 * 1000 * 9),
    },
  }
);

export default chatSchema;
