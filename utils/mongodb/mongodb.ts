import mongoose, { Model } from "mongoose";
import userSchema from "./models/userSchema";

export const connect = async () => {
  const connectDB = await mongoose
    .connect(process.env.MONGODB_URI as string)
    .catch((err) => console.log("CONNECT ERROR :: ", err));
  console.log("Mongoose Connection Established");

  const User = mongoose.models.User || mongoose.model("User", userSchema);

  return { connectDB, User };
};
