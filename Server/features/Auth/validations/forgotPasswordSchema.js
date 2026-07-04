const { z } = require("zod");

const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email format"),
});

module.exports = {
  forgotPasswordSchema,
};
