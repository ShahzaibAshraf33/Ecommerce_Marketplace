const { verifyOTP, resendOTP, generateAndSendOTP } = require("../services/otpService");
const ApiError = require("../utils/ApiError");
const prisma = require("../config/prisma");

/**
 * Verify OTP for email confirmation
 */
const verifyOTPController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify OTP
    const result = await verifyOTP(user.id, otp);

    res.status(200).json({
      success: true,
      message: result.message,
      data: {
        id: user.id,
        email: user.email,
        emailVerified: true,
      },
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    console.error("OTP Verification Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * Resend OTP to user email
 */
const resendOTPController = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Resend OTP
    const result = await resendOTP(user.id, email, user.name);

    res.status(200).json({
      success: true,
      message: result.message,
      expiresAt: result.expiresAt,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    console.error("Resend OTP Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  verifyOTPController,
  resendOTPController,
};