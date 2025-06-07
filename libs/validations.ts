import { z } from "zod";

export const SingupFormValidation = z.object({
  username: z.string().min(2, "Username must be at least 2 characters").max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const SinginFormValidation = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
