import Product from "../models/Product.js";

/**
 * Controller: getAllProducts
 * ---------------------------
 * Fetches all products from the database.
 * - Uses Product.find() to retrieve all documents
 * - Returns the full list as a JSON response
 *
 * Endpoint: GET /products
 */

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller: getProductById
 * ---------------------------
 * Fetches a single product by its ID.
 * - Extracts the product ID from request params
 * - Searches for the product using Product.findById()
 * - If found, returns the product as JSON
 * - If not found, responds with a 404 error
 *
 * Endpoint: GET /products/:id
 */

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new product
 * @route   POST /products
 * @access  Public (you can restrict this if needed)
 */
export const createProduct = async (req, res, next) => {
  try {
    const { name, price, description, stock, images } = req.body;

    const product = new Product({
      name,
      price,
      description,
      stock,
      images,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a product
 * @route   PUT /products/:id
 * @access  Public (can be restricted)
 */
export const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a product
 * @route   DELETE /products/:id
 * @access  Public (can be restricted)
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};
