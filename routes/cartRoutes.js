import express from "express";
import {
  addToCart,
  updateCartItem,
  removeCartItem,
  getCart,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

// Create a new Express router instance
const router = express.Router();

// All routes in this file are protected by authentication middleware
// Apply the 'protect' middleware to ensure user is logged in
router.use(protect);

/**
 * @route   /cart (GET)
 * @desc    Get the cart details of the logged-in user
 * @access  Private (protected route)
 */
router.get("/", getCart);

/**
 * @route   /cart (POST)
 * @desc    Add a product to the user's cart
 * @access  Private (protected route)
 */
router.post("/", addToCart);

/**
 * @route   /cart/:productId (PUT)
 * @desc    Update the quantity of a product in the user's cart
 * @access  Private (protected route)
 */
router.put("/:productId", updateCartItem);

/**
 * @route   /cart/:productId (DELETE)
 * @desc    Remove a product from the user's cart
 * @access  Private (protected route)
 */
router.delete("/:productId", removeCartItem);

export default router;
