import {z} from "zod";

export const registerSchema = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters long"),
    email: z.string().trim().min(1, "Email is required").email("Please provide a valid email").toLowerCase(),
    password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters long")
});

/**
 * Validation schema for user login
 * Validates email format and ensures password is provided
 */
const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please provide a valid email")
    .toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

export { registerSchema, loginSchema };
