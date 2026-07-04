const { z } = require("zod");

const googleAuthSchema = z.object({
  idToken: z
    .string({ required_error: "ID token is required" }),
});

module.exports = {
  googleAuthSchema,
};
