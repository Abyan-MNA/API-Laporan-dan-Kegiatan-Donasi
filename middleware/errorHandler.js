// Error handler
const AppError = require("../utils/AppError");

const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.message} ---`, err.stack);

  const statusCode = err.status || 500; // Default internal error
  const message = err.message || "Galat server dalam / Internal server error";

  return res.status(statusCode).json({
    status_info: "Error",
    message
  });
};

module.exports = errorHandler;