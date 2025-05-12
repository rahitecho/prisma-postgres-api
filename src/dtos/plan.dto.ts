import { z } from 'zod';

export const PlanDto = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  price: z.number(),
  maxUsers: z.number(),
  features: z.array(z.string()),
});

export type PlanDtoType = z.infer<typeof PlanDto>;
