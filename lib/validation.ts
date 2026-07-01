import { z } from "zod";

/** Shared schemas used by both the client forms and the API routes. */

export const bookingSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email."),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  sessionType: z.string().trim().min(1, "Please choose a session type."),
  date: z
    .string()
    .min(1, "Please pick a date.")
    .refine((d) => !Number.isNaN(Date.parse(d)), "Please pick a valid date."),
  timeSlot: z.string().trim().min(1, "Please choose a time."),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email."),
  message: z.string().trim().min(10, "Tell me a little more (10+ characters)."),
});

export type BookingInput = z.infer<typeof bookingSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
