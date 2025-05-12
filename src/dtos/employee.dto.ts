import { z } from 'zod';

export const EmployeeDto = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  companyId: z.string().min(1, 'Company ID is required'),
  position: z.string().optional(),
});

export type EmployeeDtoType = z.infer<typeof EmployeeDto>;

export const UpdateEmployeeDto = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  email: z.string().email('Invalid email address').optional(),
  companyId: z.string().min(1, 'Company ID is required').optional(),
  position: z.string().optional(),
});

export type UpdateEmployeeDtoType = z.infer<typeof UpdateEmployeeDto>;
