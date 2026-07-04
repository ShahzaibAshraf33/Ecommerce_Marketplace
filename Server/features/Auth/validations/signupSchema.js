const { z } = require("zod");

const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .regex(/^[A-Za-z ]+$/, "Name must contain only letters"),

  email: z
    .string()
    .trim()
    .email("Invalid email"),

  phoneNumber: z
    .string()
    .trim()
    .min(11, "Phone number must be at least 11 digits")
    .max(15, "Phone number must be at most 15 digits")
    .regex(/^[0-9]+$/, "Phone number must contain only numbers"),

  password: z
    .string()
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
});

module.exports = {
  signupSchema,
};