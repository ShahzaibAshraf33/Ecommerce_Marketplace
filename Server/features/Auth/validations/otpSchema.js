const { z } = require("zod");

const otpSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email format"),

  otp: z
    .string({ required_error: "OTP is required" })
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^[0-9]+$/, "OTP must contain only numbers"),
});

module.exports = {
  otpSchema,
};