import { z } from 'zod';

export const SubscriptionDto = z.object({
  id: z.string().uuid().optional(),
  status: z.enum(['trial', 'active', 'cancelled']),
  startDate: z.date(),
  endDate: z.date(),
  companyId: z.string().uuid(),
  planId: z.string().uuid(),
});

export type SubscriptionDtoType = z.infer<typeof SubscriptionDto>;
