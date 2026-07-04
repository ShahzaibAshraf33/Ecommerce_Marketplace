const nodemailer = require("nodemailer");
const ApiError = require("./ApiError");

// Create Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD, // Use Gmail App Password, not regular password
  },
});

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email service error:", error);
  } else if (success) {
    console.log("✅ Email service connected successfully");
  }
});

/**
 * Send OTP email
 * @param {string} email - User email
 * @param {string} otp - One-time password
 * @param {string} userName - User name
 */
const sendOTPEmail = async (email, otp, userName) => {
  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 20px auto; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .header { text-align: center; color: #333; margin-bottom: 30px; }
            .otp-box { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; }
            .otp-code { font-size: 36px; font-weight: bold; letter-spacing: 5px; font-family: monospace; }
            .footer { text-align: center; color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; }
            .warning { color: #d32f2f; font-size: 14px; margin-top: 15px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Email Verification</h2>
            </div>
            <p>Hi <strong>${userName}</strong>,</p>
            <p>Thank you for signing up! Please verify your email address using the OTP below:</p>
            <div class="otp-box">
              <p>Your One-Time Password (OTP)</p>
              <div class="otp-code">${otp}</div>
            </div>
            <p>This OTP will expire in ${process.env.OTP_EXPIRY} minutes.</p>
            <div class="warning">
              ⚠️ Do not share this OTP with anyone. We will never ask for your OTP via email or phone.
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Your App Name. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: "Verify Your Email - OTP",
      html: htmlContent,
    });

    return true;
  } catch (error) {
    console.error("Email sending error:", error);
    throw new ApiError(500, "Failed to send OTP email");
  }
};

/**
 * Send forgot password email (OTP)
 * @param {string} email - User email
 * @param {string} otp - Reset OTP
 * @param {string} userName - User name
 */
const sendForgotPasswordEmail = async (email, otp, userName) => {
  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 20px auto; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .header { text-align: center; color: #333; margin-bottom: 30px; }
            .otp-box { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; }
            .otp-code { font-size: 36px; font-weight: bold; letter-spacing: 5px; font-family: monospace; }
            .footer { text-align: center; color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; }
            .warning { color: #d32f2f; font-size: 14px; margin-top: 15px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Reset Your Password</h2>
            </div>
            <p>Hi <strong>${userName}</strong>,</p>
            <p>We received a request to reset your password. Please use the OTP below to set a new password:</p>
            <div class="otp-box">
              <p>Your Password Reset OTP</p>
              <div class="otp-code">${otp}</div>
            </div>
            <div class="warning">
              ⚠️ This OTP will expire in 10 minutes. If you didn't request a password reset, please ignore this email.
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Your App Name. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: "Reset Your Password - OTP",
      html: htmlContent,
    });

    return true;
  } catch (error) {
    console.error("Email sending error:", error);
    throw new ApiError(500, "Failed to send reset password email");
  }
};

module.exports = {
  sendOTPEmail,
  sendForgotPasswordEmail,
};
