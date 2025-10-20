import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("DEBUG: MONGO_URI =", process.env.MONGO_URI); // should print correctly
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected...");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
