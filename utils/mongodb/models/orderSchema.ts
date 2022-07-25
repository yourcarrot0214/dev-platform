import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new mongoose.Schema({
  menus: {
    type: [Schema.Types.ObjectId],
    ref: "Food",
    default: [],
  },
  orderer: {
    type: String,
  },
  timestamps: {
    currentTime: () => new Date(Date.now() + 60 * 60 * 1000 * 9),
  },
});

export default orderSchema;
