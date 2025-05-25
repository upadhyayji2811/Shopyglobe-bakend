import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/productController.js";

// Create a new Express router instance
const router = express.Router();

/**
 * @route   /products (GET, POST)
 * @desc    Get all products or create a new one
 */
router.route("/").get(getAllProducts).post(createProduct);

/**
 * @route   /products/:id (GET, PUT, DELETE)
 * @desc    Get, update, or delete a product by ID
 */
router
  .route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;
