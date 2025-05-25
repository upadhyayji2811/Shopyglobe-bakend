import mongoose from "mongoose";

/**
 * @Connects to MongoDB using the URI from environment variables.
 *
 * Priority:
 * - If `MONGO_URI_CLOUD` exists, use it (for cloud deployment like MongoDB Atlas).
 * - Otherwise, fallback to `MONGO_URI` (for local development).
 *
 * @On success: Logs the host, port, and database name.
 * @On failure: Logs the error and exits the process.
 */

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI_CLOUD || process.env.MONGO_URI;
    const conn = await mongoose.connect(uri);
    console.log(
      `MongoDB Connected: ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`
    );
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
