// Validation middleware
const validateRequest = (schema) => (req, res, next) => {
  try {
    if (schema.params) {
      schema.params.parse(req.params);
    }
    
    if (schema.body) {
      schema.body.parse(req.body);
    }
    
    if (schema.query) {
      schema.query.parse(req.query);
    }
    
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Validation failed",
      errors: error.errors || error.message
    });
  }
};

module.exports = validateRequest; 