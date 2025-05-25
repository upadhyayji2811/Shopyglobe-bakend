import mongoose from "mongoose";

/**
 * User Schema
 * -----------
 * Defines the structure for user accounts in the database.
 * Fields:
 * - name: Full name of the user (required)
 * - email: User's unique email address (required, must be valid format)
 * - password: User's password (hashed before saving, not returned in queries)
 */

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      // select: false, // Prevents password from being returned in queries
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
