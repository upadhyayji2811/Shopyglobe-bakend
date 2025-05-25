// Import MongoDB and dotenv to use environment variables
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";
import topProduct from "./topProducts.js";

// Load environment variables from .env file
dotenv.config();

const importData = async () => {
  try {
    // Use cloud DB if available, otherwise use local DB
    const mongoURI = process.env.MONGO_URI_CLOUD || process.env.MONGO_URI;

    // Connect to MongoDB using the selected URI
    await mongoose.connect(mongoURI);

    // 2. Clear existing product data from the 'products' collection
    await Product.deleteMany();

    // 3. Map over the imported topProduct array
    //    Transform each item into the format that matches our Product model
    const productsWithName = topProduct.map((item) => ({
      name: item.name,
      price: item.price,
      description: item.description || "",
      stock: item.stock,
      images: item.images,
    }));

    // 4. Insert the transformed array into the MongoDB collection
    await Product.insertMany(productsWithName);

    // 5. Log success message and exit the process
    console.log("Products Imported!");
    process.exit(); // Exit with success (code 0)
  } catch (error) {
    // If any error occurs during the process, log it
    console.error("Error importing:", error);
    process.exit(1); // Exit with error (code 1)
  }
};

// Call the function to execute the import process
importData();
