import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is missing");
}

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error; 
  }
};