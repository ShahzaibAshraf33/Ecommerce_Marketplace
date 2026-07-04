const { verifyToken } = require("../utils/tokenService");
const ApiError = require("../utils/ApiError");

/**
 * Verify JWT token from cookies or headers
 */
const verifyAuth = (req, res, next) => {
  try {
    // Get token from cookies or Authorization header
    let token = req.cookies?.accessToken;

    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      throw new ApiError(401, "Access token is required");
    }

    // Verify token
    const decoded = verifyToken(token, false);

    // Attach user data to request
    req.user = decoded;

    next();
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

module.exports = {
  verifyAuth,
};
