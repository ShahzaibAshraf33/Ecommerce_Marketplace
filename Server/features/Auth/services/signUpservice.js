const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/ApiError");
const { generateAndSendOTP } = require("./otpService");

const signup = async (userData) => {
  const { name, email, phoneNumber, password } = userData;

  // Check if user already exists
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { phoneNumber }],
    },
  });

  if (existingUser) {
    if (!existingUser.emailVerified && existingUser.email === email) {
      // Resend OTP for unverified account using same email
      await generateAndSendOTP(existingUser.id, email, existingUser.name);
      const { password: _, ...userWithoutPassword } = existingUser;
      return {
        ...userWithoutPassword,
        message: "Account already exists but is not verified. OTP resent to your email.",
      };
    }

    throw new ApiError(409, "User with this email or phone already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  let user;
  try {
    user = await prisma.user.create({
      data: {
        name,
        email,
        phoneNumber,
        password: hashedPassword,
      },
    });

    // Generate and send OTP
    await generateAndSendOTP(user.id, email, name);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      message: "User registered successfully. Please verify your email with OTP",
    };
  } catch (error) {
    if (user?.id) {
      try {
        await prisma.user.delete({
          where: { id: user.id },
        });
      } catch (rollbackError) {
        console.error("Failed to rollback user after OTP failure:", rollbackError);
      }
    }
    throw error;
  }
};

module.exports = { signup };