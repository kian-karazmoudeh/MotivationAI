const { NODE_ENV } = require('../config/env');

/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  // Default error status and message
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  
  // Handle specific error types
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation Error',
      errors: err.errors || err.message
    });
  }
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      message: 'Unauthorized: Invalid or missing token'
    });
  }
  
  // Generic error response
  res.status(status).json({
    message,
    ...(NODE_ENV !== 'production' && { stack: err.stack })
  });
};

module.exports = errorHandler; 