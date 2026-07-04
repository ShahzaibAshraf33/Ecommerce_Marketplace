const { z } = require("zod");

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = Array.isArray(error.errors)
        ? error.errors
        : Array.isArray(error.issues)
        ? error.issues
        : [];

      const formattedErrors = issues.map((err) => ({
        field: Array.isArray(err.path) ? err.path.join('.') : String(err.path || ''),
        message: err.message || String(err)
      }));

      console.log(' Validation Error:', formattedErrors);

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: formattedErrors,
      });
    }

    
    console.error('Middleware Error:', error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = validate;