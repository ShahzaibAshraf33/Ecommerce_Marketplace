const { signup } = require("../services/signUpservice");
const { verifyOTP, resendOTP } = require("../services/otpService");
const ApiError = require("../utils/ApiError");
const prisma = require("../config/prisma");

/**
 * Step 1: Register user and send OTP
 */
const signupController = async (req, res) => {
  try {
    const user = await signup(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully. OTP sent to email",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        message: user.message,
      },
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    console.error("Signup Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * Step 2: Verify OTP and confirm email
 */
const verifyEmailController = async (req, res) => {
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
 * Resend OTP to email
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
  signupController,
  verifyEmailController,
  resendOTPController,
};