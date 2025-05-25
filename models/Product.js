import mongoose from "mongoose";

/**
 * Product Schema
 * --------------
 * Represents a product available in the store.
 * Fields:
 * - name: Product's name (required)
 * - price: Product's price (non-negative, required)
 * - description: Optional short text description
 * - stock: Number of items available (non-negative, required)
 * - images: Array of image URLs (each must be a valid URL)
 */

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Stock cannot be negative"],
    },
    images: {
      type: [String],
      default: [],
      validate: {
        validator: function (arr) {
          return arr.every((url) => /^https?:\/\/.+/.test(url));
        },
        message: "Each image must be a valid URL",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
