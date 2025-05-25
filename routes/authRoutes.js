import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

// Create a new Express router instance
const router = express.Router();

/**
 * @route   POST /register
 * @desc    Register a new user with name, email, and password
 * @access  Public
 */
router.post("/register", registerUser);

/**
 * @route   POST /login
 * @desc    Authenticate user with email and password, return JWT
 * @access  Public
 */
router.post("/login", loginUser);

export default router;
