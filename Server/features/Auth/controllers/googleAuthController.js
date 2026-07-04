const prisma = require("../config/prisma");
const { generateAccessToken, generateRefreshToken } = require("../utils/tokenService");
const ApiError = require("../utils/ApiError");
const { OAuth2Client } = require("google-auth-library");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Google OAuth sign-in/sign-up
 */
const googleAuthController = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      throw new ApiError(400, "ID token is required");
    }

    // Verify and decode Google ID token
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, picture, sub: googleId } = ticket.getPayload();

    if (!email) {
      throw new ApiError(400, "Email not provided in Google token");
    }

    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { email },
    });

    // If user doesn't exist, create new user
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: name || email.split("@")[0],
          googleId,
          emailVerified: true, // Google email is already verified
          phoneNumber: `${Date.now()}`, // Placeholder, user can update later
          password: null, // No password for OAuth users
        },
      });
    } else if (!user.googleId) {
      // If user exists but doesn't have googleId, add it
      user = await prisma.user.update({
        where: { email },
        data: { googleId },
      });
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

    // Set tokens in cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    // Return user and tokens
    const { password: _, ...userWithoutPassword } = user;

    res.status(user.createdAt === user.updatedAt ? 201 : 200).json({
      success: true,
      message: user.createdAt === user.updatedAt
        ? "Account created successfully"
        : "Login successful",
      data: {
        user: userWithoutPassword,
        accessToken,
        isNewUser: user.createdAt === user.updatedAt,
      },
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    console.error("Google Auth Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  googleAuthController,
};
