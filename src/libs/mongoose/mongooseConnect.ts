import mongoose from "mongoose";

export const mongooseConnect = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL || "");
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Connection to MongoDB failed: ${e.message}`);
    } else {
      throw new Error(`Connection to MongoDB failed: Unknown error`);
    }
  }
};
