/**
 * Not Found Middleware
 * ---------------------
 * This middleware is triggered when no route matches the incoming request.
 *
 * Purpose:
 * - It helps catch all unhandled routes (404 errors).
 * - It forwards a formatted error to the centralized error handler.
 *
 * How it works:
 * 1. Creates a new Error object with a custom message including the attempted route.
 * 2. Sets the response status code to 404 (Not Found).
 * 3. Forwards the error to the next middleware (which should be the error handler).
 *
 * Usage:
 * - Place this after all valid route handlers in server.js.
 * - The error will then be caught and processed by the `errorHandler` middleware.
 */

const notFound = (req, res, next) => {
  const error = new Error(`🔍 Route ${req.originalUrl} not found`);
  res.status(404);
  next(error);
};

export default notFound;
