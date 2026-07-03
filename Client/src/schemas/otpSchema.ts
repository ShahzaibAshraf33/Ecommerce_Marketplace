import { z } from "zod";

export const otpSchema = z.object({
  code: z
    .array(z.string().regex(/^\d$/, "Code must be numeric"))
    .length(6, "Enter all 6 digits"),
});

export type OtpFormValues = z.infer<typeof otpSchema>;

export interface OtpFormInputValues {
  code: string[];
}