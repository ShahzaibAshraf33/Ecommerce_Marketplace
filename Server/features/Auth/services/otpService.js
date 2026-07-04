const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");
const { generateOTP } = require("../utils/tokenService");
const { sendOTPEmail } = require("../utils/emailService");

/**
 * Generate and send OTP to user email
 * @param {number} userId - User ID
 * @param {string} email - User email
 * @param {string} userName - User name
 */
const generateAndSendOTP = async (userId, email, userName) => {
  try {
    // Delete previous OTPs for this user
    await prisma.oTP.deleteMany({
      where: { userId },
    });

    // Generate OTP
    const otp = generateOTP();

    // Calculate expiry time
    const expiryMinutes = parseInt(process.env.OTP_EXPIRY) || 10;
    const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);

    // Save OTP to database
    const otpRecord = await prisma.oTP.create({
      data: {
        userId,
        code: otp,
        expiresAt,
      },
    });

    // Send OTP via email
    await sendOTPEmail(email, otp, userName);

    return {
      success: true,
      message: "OTP sent successfully",
      expiresAt,
    };
  } catch (error) {
    console.error("OTP generation error:", error);
    throw new ApiError(500, "Failed to generate and send OTP");
  }
};

/**
 * Verify OTP for user
 * @param {number} userId - User ID
 * @param {string} otp - OTP code to verify
 */
const verifyOTP = async (userId, otp) => {
  try {
    // Check if user exists and not verified
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (user.emailVerified) {
      throw new ApiError(400, "Email already verified");
    }

    // Find latest OTP for user
    const otpRecord = await prisma.oTP.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    if (!otpRecord) {
      throw new ApiError(400, "No OTP found. Please request a new OTP");
    }

    // Check if OTP expired
    if (new Date() > otpRecord.expiresAt) {
      throw new ApiError(400, "OTP has expired. Please request a new OTP");
    }

    // Check attempts
    const maxAttempts = parseInt(process.env.MAX_OTP_ATTEMPTS, 10) || 5;
    if (otpRecord.attempts >= maxAttempts) {
      throw new ApiError(
        400,
        "Maximum OTP verification attempts exceeded. Please request a new OTP"
      );
    }

    // Verify OTP
    if (otpRecord.code !== otp) {
      // Increment attempts
      await prisma.oTP.update({
        where: { id: otpRecord.id },
        data: { attempts: otpRecord.attempts + 1 },
      });

      throw new ApiError(400, "Invalid OTP");
    }

    // Mark email as verified
    await prisma.user.update({
      where: { id: userId },
      data: { emailVerified: true },
    });

    // Delete OTP
    await prisma.oTP.delete({
      where: { id: otpRecord.id },
    });

    return {
      success: true,
      message: "Email verified successfully",
    };
  } catch (error) {
    console.error("OTP verification error:", error);
    throw error;
  }
};

/**
 * Resend OTP to user
 * @param {number} userId - User ID
 * @param {string} email - User email
 * @param {string} userName - User name
 */
const resendOTP = async (userId, email, userName) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (user.emailVerified) {
      throw new ApiError(400, "Email already verified");
    }

    // Generate and send new OTP
    return await generateAndSendOTP(userId, email, userName);
  } catch (error) {
    console.error("OTP resend error:", error);
    throw error;
  }
};

module.exports = {
  generateAndSendOTP,
  verifyOTP,
  resendOTP,
};
