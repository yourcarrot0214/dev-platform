import mongoose from "mongoose";
const { Schema } = mongoose;

const chatSchema = new mongoose.Schema(
  {
    members: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    messages: {
      type: [Schema.Types.ObjectId],
      ref: "Message",
      default: [],
    },
  },
  {
    timestamps: {
      currentTime: () => new Date(Date.now() + 60 * 60 * 1000 * 9),
    },
  }
);

export default chatSchema;
