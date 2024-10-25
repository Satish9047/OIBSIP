import { z } from "zod";

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password should be at least 8 character" })
      .max(25, { message: "Password should be less than 25 character" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password should be at least 8 character" })
      .max(25, { message: "Password should be less than 25 character" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const resetPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
});
