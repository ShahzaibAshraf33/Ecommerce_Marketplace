const {
  forgotPassword,
  verifyResetOTP,
  resetPassword,
} = require("../services/passwordService");
const ApiError = require("../utils/ApiError");

/**
 * Initiate forgot password process
 */
const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    const result = await forgotPassword(email);

    res.status(200).json({
      success: result.success,
      message: result.message,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    console.error("Forgot Password Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * Verify reset OTP
 */
const verifyResetOTPController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const result = await verifyResetOTP(email, otp);

    res.status(200).json({
      success: result.success,
      message: "Reset OTP is valid",
      data: result,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    console.error("Verify Reset OTP Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * Reset password with OTP
 */
const resetPasswordController = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    const result = await resetPassword(email, otp, password);

    res.status(200).json({
      success: result.success,
      message: result.message,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    console.error("Reset Password Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  forgotPasswordController,
  verifyResetOTPController,
  resetPasswordController,
};
