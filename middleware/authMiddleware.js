import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Middleware: protect
 * --------------------
 * This middleware protects routes by ensuring only authenticated users can access them.
 *
 * Steps:
 * 1. Check if the 'Authorization' header exists and starts with 'Bearer'.
 * 2. Extract the token from the header.
 * 3. Verify the token using JWT and decode the user ID.
 * 4. Find the user from the database (excluding the password field).
 * 5. Attach the user object to the `req` object for later use in the route handler.
 * 6. If no token or invalid token, return 401 Unauthorized.
 *
 * Usage:
 * Add `protect` to any route you want to make private.
 * Example: `router.get('/cart', protect, getCart)`
 */

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
