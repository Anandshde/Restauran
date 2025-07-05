import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    // In demo mode we run with in-memory mock data, no real DB.
    if (process.env.APP_MODE === "demo") {
      console.log("🛈 Demo mode – skipping MongoDB connection");
      return;
    }

    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("MONGO_URI environment variable is not defined");
    }

    await mongoose.connect(mongoUri);
    console.log("📦 Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
