import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      message: "Email is invalid",
    })
    .email({ message: "Invalid email format" })
    .max(255, { message: "Email must be less than 255 characters" }),
  password: z
    .string({
      message: "Password is invalid",
    })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(100, { message: "Password must be less than 100 characters" })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[!@#$%^&*]/, {
      message: "Password must contain at least one special character",
    }),
});
