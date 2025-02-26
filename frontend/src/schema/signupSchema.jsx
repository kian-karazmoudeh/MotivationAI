import { z } from 'zod';

export const signupSchema = z.object({
  firstname: z.string({
      message:"First name is invalid"
  })
    .min(1, { message: "First name is required" })
    .max(50, { message: "First name must be less than 50 characters" })
    .regex(/^[a-zA-Z\s-']+$/, { message: "First name can only contain letters, spaces, hyphens and apostrophes" }),
  lastname: z.string({
      message:"Last name is invalid"
  })
    .min(1, { message: "Last name is required" })
    .max(50, { message: "Last name must be less than 50 characters" })
    .regex(/^[a-zA-Z\s-']+$/, { message: "Last name can only contain letters, spaces, hyphens and apostrophes" }),
  email: z.string({
      message:"Email is invalid"
  })
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email format" })
    .max(255, { message: "Email must be less than 255 characters" }),
  password: z.string({
      message:"Password is invalid"
  })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(100, { message: "Password must be less than 100 characters" })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[!@#$%^&*]/, { message: "Password must contain at least one special character" }),
  confirmPassword: z.string(),
  about: z.string({
      message:"About is invalid"
  })
    .max(1000, { message: "About section must be less than 1000 characters" })
    .optional(),
  bigDream: z.string({
      message:"Big dream is invalid"
  })
    .max(1000, { message: "Big dream must be less than 1000 characters" })
    .optional(),
  inspiration: z.string({
      message:"Inspiration is invalid"
  })
    .max(1000, { message: "Inspiration must be less than 1000 characters" })
    .optional(),
  obstacles: z.string({
      message:"Obstacles is invalid"
  })
    .max(1000, { message: "Obstacles must be less than 1000 characters" })
    .optional(),
  fears: z.string({
      message:"Fears is invalid"
  })
    .max(1000, { message: "Fears must be less than 1000 characters" })
    .optional(),
  regrets: z.string({
      message:"Regrets is invalid"
  })
    .max(1000, { message: "Regrets must be less than 1000 characters" })
    .optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
}); 