// src/schemas/customer.schema.ts
import { z } from 'zod';

export const CreateCustomerSchema = z.object({
  name: z.string().max(55),
  dob: z
    .preprocess(arg => {
      if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
      return undefined;
    }, z.date())
    .optional(),
  gender: z.string().max(11).optional(),
  phone: z.string().max(55),
  email: z.string().email().max(55),
  sport_id: z.number().int(),
  city_id: z.number().int(),
  customer_code: z.string().max(55),
  location: z.string(),
  address: z.string(),
  employment_status: z.string().max(11),
  resident_status: z.string().max(11),
  status: z.number().int(),
  created_by: z.number().int().optional(),
  otp: z.string().max(45).optional(),
  isverified: z.boolean().optional(),
  otp_expiry_time: z.string().max(45).optional(),
  valid_otp_time: z.number().optional(),
  google_id: z.string().max(100).optional(),
  facebook_id: z.string().max(100).optional(),
  apple_id: z.string().max(100).optional(),
  order_id: z.string().max(100).optional(),
  payment_id: z.string().max(100).optional(),
  order_status: z.string().max(45).optional(),
  picture: z.string().max(4096).optional(),
  venue_id: z.number().optional(),
});

export type CreateCustomerDto = z.infer<typeof CreateCustomerSchema>;
