import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(2, { message: "Name is mandatory" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone should be 10 digit" })
    .max(10, { message: "Phone should be 10 digit" }),
  address: z.string().min(2, { message: "Address is mandatory" }),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 character" })
    .max(25, { message: "Password should be less than 25 character" }),
});
