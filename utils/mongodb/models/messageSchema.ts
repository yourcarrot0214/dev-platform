import mongoose from "mongoose";
const { Schema } = mongoose;

const messageSchema = new mongoose.Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    },
  },
  {
    timestamps: {
      currentTime: () => new Date(Date.now() + 60 * 60 * 1000 * 9),
    },
  }
);

export default messageSchema;
