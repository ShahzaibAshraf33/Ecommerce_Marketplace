const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/ApiError");
const { generateOTP } = require("../utils/tokenService");
const { sendForgotPasswordEmail } = require("../utils/emailService");

/**
 * Initiate forgot password process
 * @param {string} email - User email
 */
const forgotPassword = async (email) => {
  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Return generic message for security
      return {
        success: true,
        message: "If email exists, reset OTP will be sent",
      };
    }

    // Delete previous reset tokens (using ForgotPasswordToken table to store OTPs)
    await prisma.forgotPasswordToken.deleteMany({
      where: { userId: user.id },
    });

    // Generate reset OTP
    const resetOTP = generateOTP();

    // Hash OTP for storage
    const hashedOTP = await bcrypt.hash(resetOTP, 10);

    // Save reset OTP with expiry (10 minutes)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.forgotPasswordToken.create({
      data: {
        userId: user.id,
        token: hashedOTP, // using token column to store hashed OTP
        expiresAt,
      },
    });

    // Send reset email with unhashed OTP
    await sendForgotPasswordEmail(email, resetOTP, user.name);

    return {
      success: true,
      message: "If email exists, reset OTP will be sent",
    };
  } catch (error) {
    console.error("Forgot password error:", error);
    throw error;
  }
};

/**
 * Verify reset OTP
 * @param {string} email - User email
 * @param {string} otp - Reset OTP
 */
const verifyResetOTP = async (email, otp) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new ApiError(400, "Invalid email or OTP");
    }

    // Find all tokens for this user
    const resetTokens = await prisma.forgotPasswordToken.findMany({
      where: { userId: user.id },
    });

    let validToken = null;

    // Check each token
    for (const tokenRecord of resetTokens) {
      const isValid = await bcrypt.compare(otp, tokenRecord.token);
      if (isValid) {
        validToken = tokenRecord;
        break;
      }
    }

    if (!validToken) {
      throw new ApiError(400, "Invalid reset OTP");
    }

    // Check expiry
    if (new Date() > validToken.expiresAt) {
      throw new ApiError(400, "Reset OTP has expired");
    }

    return {
      success: true,
      userId: validToken.userId,
      email: user.email,
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Reset password
 * @param {string} email - User email
 * @param {string} otp - Reset OTP
 * @param {string} newPassword - New password
 */
const resetPassword = async (email, otp, newPassword) => {
  try {
    // Verify OTP first
    const tokenData = await verifyResetOTP(email, otp);

    const user = await prisma.user.findUnique({
      where: { id: tokenData.userId },
    });

    // Verify new password is not the same as old password
    if (user.password) {
      const isSamePassword = await bcrypt.compare(newPassword, user.password);
      if (isSamePassword) {
        throw new ApiError(400, "New password cannot be the same as the old password");
      }
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user password
    await prisma.user.update({
      where: { id: tokenData.userId },
      data: {
        password: hashedPassword,
        lastPasswordChangeAt: new Date(),
      },
    });

    // Delete used OTP tokens for this user
    await prisma.forgotPasswordToken.deleteMany({
      where: { userId: tokenData.userId },
    });

    return {
      success: true,
      message: "Password reset successfully",
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  forgotPassword,
  verifyResetOTP,
  resetPassword,
};
