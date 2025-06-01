// Show error response in JSON mode
class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.isOperational = true; // Well for error operational identify
  }
}

module.exports = AppError;