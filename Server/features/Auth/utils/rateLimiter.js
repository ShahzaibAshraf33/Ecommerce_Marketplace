const rateLimit = require("express-rate-limit");

/**
 * Rate limiter for forgot password requests
 * Prevents multiple OTP requests to the same email
 */
const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.FORGOT_PASSWORD_RATE_LIMIT || 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: "Too many forgot password attempts, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req, res) => {
    // Skip for certain conditions if needed
    return false;
  },
  keyGenerator: (req, res) => {
    // Rate limit by email instead of IP for forgot password
    return req.body.email || req.ip;
  },
});

/**
 * Rate limiter for login attempts
 * Prevents brute force attacks
 */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login attempts per 15 minutes
  message: {
    success: false,
    message: "Too many login attempts, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate limiter for OTP verification attempts
 * Prevents brute force OTP attacks
 */
const otpVerificationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each email to 5 verification attempts
  message: {
    success: false,
    message: "Too many OTP verification attempts, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req, res) => {
    return req.body.email || req.ip;
  },
});

module.exports = {
  forgotPasswordLimiter,
  loginLimiter,
  otpVerificationLimiter,
};
