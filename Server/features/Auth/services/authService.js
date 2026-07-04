const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/ApiError");
const { generateAccessToken, generateRefreshToken } = require("../utils/tokenService");

/**
 * Login user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 */
const login = async (email, password) => {
  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    // Check if email is verified
    if (!user.emailVerified) {
      throw new ApiError(
        403,
        "Please verify your email first before logging in"
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password");
    }

    // Generate tokens
    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    const refreshToken = generateRefreshToken({
      id: user.id,
      email: user.email,
    });

    // Return user data and tokens
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Refresh access token using refresh token
 * @param {string} refreshToken - Refresh token
 */
const refreshAccessToken = async (refreshToken) => {
  try {
    const { verifyToken } = require("../utils/tokenService");

    const decoded = verifyToken(refreshToken, true);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    return {
      accessToken,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  login,
  refreshAccessToken,
};
