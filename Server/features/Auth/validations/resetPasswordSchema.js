const { z } = require("zod");

const resetPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
    
  otp: z
    .string({ required_error: "OTP is required" })
    .length(6, "OTP must be exactly 6 digits"),

  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .regex(
      /[A-Z]/,
      "Password must contain at least one uppercase letter"
    )
    .regex(
      /[a-z]/,
      "Password must contain at least one lowercase letter"
    )
    .regex(
      /[0-9]/,
      "Password must contain at least one number"
    )
    .regex(
      /[@$!%*?&]/,
      "Password must contain at least one special character"
    ),

  confirmPassword: z
    .string({ required_error: "Confirm password is required" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

module.exports = {
  resetPasswordSchema,
};
