const jwt = require("jsonwebtoken");
const ApiError = require("./ApiError");

/**
 * Generate JWT access token
 * @param {object} payload - Token payload
 * @returns {string} JWT token
 */
const generateAccessToken = (payload) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || "7d",
    });
    return token;
  } catch (error) {
    throw new ApiError(500, "Failed to generate access token");
  }
};

/**
 * Generate JWT refresh token
 * @param {object} payload - Token payload
 * @returns {string} JWT refresh token
 */
const generateRefreshToken = (payload) => {
  try {
    const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE || "30d",
    });
    return token;
  } catch (error) {
    throw new ApiError(500, "Failed to generate refresh token");
  }
};

/**
 * Verify JWT token
 * @param {string} token - JWT token
 * @param {boolean} isRefreshToken - Whether it's a refresh token
 * @returns {object} Decoded token payload
 */
const verifyToken = (token, isRefreshToken = false) => {
  try {
    const secret = isRefreshToken
      ? process.env.REFRESH_TOKEN_SECRET
      : process.env.JWT_SECRET;

    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Token has expired");
    }
    throw new ApiError(401, "Invalid token");
  }
};

/**
 * Generate random token for password reset
 * @returns {string} Random token
 */
const generateRandomToken = () => {
  const randomString = Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  return randomString;
};

/**
 * Generate 6-digit OTP
 * @returns {string} 6-digit OTP
 */
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  generateRandomToken,
  generateOTP,
};
