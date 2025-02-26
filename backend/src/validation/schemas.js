const { z } = require('zod');

// Zod validation schemas
const loginSchema = {
  body: z.object({
    email: z.string({
        message:"Email is invalid"
    })
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
      .regex(/[!@#$%^&*]/, { message: "Password must contain at least one special character" })
  })
};

const signupSchema = {
  body: z.object({
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
  })
};

const moodSchema = {
  params: z.object({
    mood: z.string({
        message:"Mood is invalid"
    })
      .min(1, { message: "Mood parameter is required" })
      .max(100, { message: "Mood must be less than 100 characters" })
      .regex(/^[a-zA-Z\s]+$/, { message: "Mood can only contain letters and spaces" })
  })
};

// Password change schema
const passwordChangeSchema = {
  body: z.object({
    currentPassword: z.string({
      message: "Current password is invalid"
    })
      .min(1, { message: "Current password is required" }),
    newPassword: z.string({
      message: "New password is invalid"
    })
      .min(6, { message: "New password must be at least 6 characters" })
      .max(100, { message: "New password must be less than 100 characters" })
      .regex(/\d/, { message: "New password must contain at least one number" })
      .regex(/[a-z]/, { message: "New password must contain at least one lowercase letter" })
      .regex(/[A-Z]/, { message: "New password must contain at least one uppercase letter" })
      .regex(/[!@#$%^&*]/, { message: "New password must contain at least one special character" })
  })
};

// Profile update schema
const profileUpdateSchema = {
  body: z.object({
    firstname: z.string({
      message: "First name is invalid"
    })
      .min(1, { message: "First name is required" })
      .max(50, { message: "First name must be less than 50 characters" })
      .regex(/^[a-zA-Z\s-']+$/, { message: "First name can only contain letters, spaces, hyphens and apostrophes" }),
    lastname: z.string({
      message: "Last name is invalid"
    })
      .min(1, { message: "Last name is required" })
      .max(50, { message: "Last name must be less than 50 characters" })
      .regex(/^[a-zA-Z\s-']+$/, { message: "Last name can only contain letters, spaces, hyphens and apostrophes" }),
    about: z.string({
      message: "About is invalid"
    })
      .max(1000, { message: "About section must be less than 1000 characters" })
      .optional(),
    bigDream: z.string({
      message: "Big dream is invalid"
    })
      .max(1000, { message: "Big dream must be less than 1000 characters" })
      .optional(),
    inspiration: z.string({
      message: "Inspiration is invalid"
    })
      .max(1000, { message: "Inspiration must be less than 1000 characters" })
      .optional(),
    obstacles: z.string({
      message: "Obstacles is invalid"
    })
      .max(1000, { message: "Obstacles must be less than 1000 characters" })
      .optional(),
    fears: z.string({
      message: "Fears is invalid"
    })
      .max(1000, { message: "Fears must be less than 1000 characters" })
      .optional(),
    regrets: z.string({
      message: "Regrets is invalid"
    })
      .max(1000, { message: "Regrets must be less than 1000 characters" })
      .optional()
  })
};

module.exports = {
  loginSchema,
  signupSchema,
  moodSchema,
  passwordChangeSchema,
  profileUpdateSchema
}; 