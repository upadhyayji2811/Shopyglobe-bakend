import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

/**
 * Controller: getCart
 * -------------------
 * Fetches the cart for the currently logged-in user.
 * - Finds the cart by user ID
 * - Populates product details inside each item
 * - Returns the cart object or an empty items array if no cart exists
 *
 * Endpoint: GET /cart
 */

export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );
    res.json(cart || { items: [] });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller: addToCart
 * ---------------------
 * Adds a product to the user's cart:
 * - Validates the product ID
 * - Creates a new cart if one doesn't exist
 * - If product already in cart, increments quantity
 * - Otherwise, adds it as a new item in the cart
 * - Saves and returns the updated cart
 *
 * Endpoint: POST /cart
 */

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId)
      return res.status(400).json({ message: "ProductId not provided" });
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller: updateCartItem
 * --------------------------
 * Updates the quantity of a specific product in the user's cart:
 * - Finds the cart by user ID
 * - Locates the specific item in the cart
 * - Updates its quantity
 * - Saves and returns the updated cart
 *
 * Endpoint: PUT /cart/:productId
 */

export const updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (!item)
      return res.status(404).json({ message: "Item not found in cart" });

    item.quantity = quantity;
    await cart.save();
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller: removeCartItem
 * --------------------------
 * Removes a product from the user's cart:
 * - Finds the cart by user ID
 * - Filters out the item to be removed
 * - Saves and returns the updated cart
 * - If item was not found, returns a 404 response
 *
 * Endpoint: DELETE /cart/:productId
 */

export const removeCartItem = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const initialLength = cart.items.length;

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    if (cart.items.length === initialLength) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    await cart.save();

    res.status(200).json({
      message: "Item removed from cart successfully",
      cart,
    });
  } catch (error) {
    next(error);
  }
};
