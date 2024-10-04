import { z } from "zod";

const signInSchema = z.object({
  email: z
    .string({ message: "Invalid email" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ message: "Invalid password" })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(16, { message: "Password must be at most 16 characters" }),
});

const signUpSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters" })
    .max(10, { message: "Phone number must be at most 10 characters" }),
  address: z
    .string()
    .min(2, { message: "Address must be at least 2 characters" })
    .max(50, { message: "Address must be at most 50 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(25, { message: "Password must be at most 25 characters" }),
});

export { signInSchema, signUpSchema };
