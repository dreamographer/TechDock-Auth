import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(2, "Full name must have at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(
      8,
      "Password must have at least 8 characters with alphanumber combination"
    )
    .refine(
      (password: string) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password), //regex for password validation
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
      }
    ),
});
