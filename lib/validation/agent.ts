
import { z } from "zod";

export const agentSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50),
  lastName: z.string().trim().min(1, "Last name is required").max(50),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address"),

  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(20, "Enter a valid phone number"),

  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((value) => {
      const date = new Date(`${value}T00:00:00.000Z`);

      return (
        !Number.isNaN(date.getTime()) &&
        date.toISOString().slice(0, 10) === value &&
        date < new Date()
      );
    }, "Enter a valid date of birth"),

  gender: z.enum(["MALE", "FEMALE", "OTHER"], {
    message: "Select a gender",
  }),

  country: z.string().trim().min(1, "Select a country"),
});
