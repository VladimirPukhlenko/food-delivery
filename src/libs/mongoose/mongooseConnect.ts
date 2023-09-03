import mongoose from "mongoose";

export const mongooseConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL!);
    // console.log("mongoose connected");
  } catch (e) {
    console.log("mongoose connect error =>", e);
  }
};
