const { login, refreshAccessToken } = require("../services/authService");
const ApiError = require("../utils/ApiError");

/**
 * Login user with email and password
 */
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Call login service
    const { user, accessToken, refreshToken } = await login(email, password);

    // Set tokens in cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user,
        accessToken,
      },
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    console.error("Login Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * Refresh access token
 */
const refreshTokenController = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token is required",
      });
    }

    const { accessToken } = await refreshAccessToken(refreshToken);

    // Update access token cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Token refreshed",
      data: {
        accessToken,
      },
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    console.error("Refresh Token Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * Logout user
 */
const logoutController = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  loginController,
  refreshTokenController,
  logoutController,
};