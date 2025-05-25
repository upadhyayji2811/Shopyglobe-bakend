import mongoose from "mongoose";

/**
 * Cart Item Schema
 * ----------------
 * Represents a single item inside the cart.
 * Each item stores:
 * - The product reference (linked to the Product model)
 * - The quantity of the product
 */

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product reference is required"],
    },
    quantity: {
      type: Number,
      default: 1,
      min: [1, "Quantity must be at least 1"],
    },
  },
  { _id: false }
); // Prevents automatic creation of _id for subdocs if unnecessary

/**
 * Cart Schema
 * -----------
 * Represents a user's shopping cart.
 * Each cart stores:
 * - A unique user reference
 * - A list of cart items
 */

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
      unique: true, // One cart per user
    },
    items: {
      type: [cartItemSchema],
      validate: {
        validator: function (value) {
          /**
           * Custom Validator:
           * - If it's a new cart (this.isNew), it must contain at least one item.
           * - On updates, validation is skipped (return true).
           */
          return this.isNew ? value.length > 0 : true;
        },
        message: "Cart must have at least one item",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
