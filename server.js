import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import notFound from "./middleware/notFound.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Connect to DB
connectDB();

// Welcome Routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the ShoppyGlobe API 🚀" });
});

// Mounting route handlers
// All product-related endpoints will start with /products (e.g., /products/:id)
app.use("/products", productRoutes);

// All cart-related endpoints will start with /cart (e.g., /cart/:productId)
app.use("/cart", cartRoutes);

// Authentication routes (e.g., /register, /login)
app.use("/", authRoutes);

// Middleware for handling unknown routes (404 errors)
app.use(notFound);

// Custom error-handling middleware for handling all thrown errors
app.use(errorHandler);

// Start the server and listen on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
