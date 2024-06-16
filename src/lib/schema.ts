import { LoginFormData, RegisterFormData } from "./form-data";
import { ZodType, z } from "zod";

export const loginSchema: ZodType<LoginFormData> = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerSchema: ZodType<RegisterFormData> = z
  .object({
    username: z.string().min(2, "Username must be at least 2 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    email: z.string().email(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password do not match",
    path: ["confirmPassword"],
  });
