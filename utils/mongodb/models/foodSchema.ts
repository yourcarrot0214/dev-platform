import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sales: {
    quantity: {
      type: Number,
      default: 0,
    },
    time: {
      type: Object,
    },
  },
});

export default foodSchema;
