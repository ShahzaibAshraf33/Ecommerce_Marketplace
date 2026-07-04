const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate.middleware");
const { verifyAuth } = require("../middleware/authMiddleware");
const {
  forgotPasswordLimiter,
  loginLimiter,
  otpVerificationLimiter,
} = require("../utils/rateLimiter");

// Import controllers
const {
  signupController,
  verifyEmailController,
  resendOTPController,
} = require("../controllers/SignupController");
const {
  loginController,
  refreshTokenController,
  logoutController,
} = require("../controllers/loginController");
const {
  verifyOTPController,
  resendOTPController: resendOTPControllerOTP,
} = require("../controllers/otpController");
const {
  forgotPasswordController,
  verifyResetOTPController,
  resetPasswordController,
} = require("../controllers/passwordController");
const {
  googleAuthController,
} = require("../controllers/googleAuthController");

// Import schemas
const { signupSchema } = require("../validations/signupSchema");
const { signInSchema } = require("../validations/signInSchema");
const { otpSchema } = require("../validations/otpSchema");
const { forgotPasswordSchema } = require("../validations/forgotPasswordSchema");
const { resetPasswordSchema } = require("../validations/resetPasswordSchema");
const { googleAuthSchema } = require("../validations/googleAuthSchema");

// ============ SIGNUP FLOW ============
// Step 1: Register user (sends OTP)
router.post("/signup", validate(signupSchema), signupController);

// Step 2: Verify OTP (email verification)
router.post(
  "/verify-email",
  otpVerificationLimiter,
  validate(otpSchema),
  verifyOTPController
);

// Step 3: Resend OTP if needed
router.post(
  "/resend-otp",
  validate(forgotPasswordSchema),
  resendOTPControllerOTP
);

// ============ LOGIN FLOW ============
router.post("/login", loginLimiter, validate(signInSchema), loginController);

// ============ GOOGLE OAUTH FLOW ============
router.post("/google", validate(googleAuthSchema), googleAuthController);

// ============ PASSWORD RECOVERY FLOW ============
// Request password reset (sends email)
router.post(
  "/forgot-password",
  forgotPasswordLimiter,
  validate(forgotPasswordSchema),
  forgotPasswordController
);

// Verify reset OTP
router.post("/verify-reset-otp", verifyResetOTPController);

// Reset password with OTP
router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  resetPasswordController
);

// ============ TOKEN MANAGEMENT ============
// Refresh access token
router.post("/refresh-token", refreshTokenController);

// Logout (requires auth)
router.post("/logout", verifyAuth, logoutController);

module.exports = router;