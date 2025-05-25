/**
 * Error Handling Middleware
 * -------------------------
 * This centralized error handler captures any errors thrown in route handlers or middleware
 * and sends a clean and consistent JSON response to the client.
 *
 * Parameters:
 * - err: The error object caught by Express.
 * - req: The incoming request object.
 * - res: The outgoing response object.
 * - next: The next middleware function (not used here but required by Express).
 *
 * Behavior:
 * 1. If the response status code is still 200, change it to 500 (internal server error).
 * 2. Return a JSON response with:
 *    - message: The error message.
 *    - stack: The stack trace (hidden in production mode).
 *
 * Usage:
 * - This middleware should be placed **after all route handlers** in server.js.
 */

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
