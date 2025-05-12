import { z } from 'zod';

export const CompanyDto = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  domain: z.string(),
  isActive: z.boolean().optional(),
});

export type CompanyDtoType = z.infer<typeof CompanyDto>;
