import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * Helper Function: generateToken
 * ------------------------------
 * Generates a signed JWT token containing the user's ID as payload.
 * This token is used for authenticating protected routes.
 *
 * @param {string} id - MongoDB _id of the user
 * @returns {string} - Signed JWT token (expires in 15 minutes)
 */

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "15min",
  });
};

/**
 * Controller: registerUser
 * -------------------------
 * Handles user registration:
 * - Checks if the user already exists using email
 * - Hashes the password securely with bcrypt
 * - Creates a new user in the database
 * - Responds with the user data and a JWT token
 *
 * Endpoint: POST /register
 */

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller: loginUser
 * ----------------------
 * Handles user login:
 * - Verifies the user exists using email
 * - Compares the provided password with the hashed password
 * - Responds with the user data and JWT token if credentials match
 *   Endpoint: POST /login
 */

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};
