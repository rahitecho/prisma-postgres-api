import { z } from 'zod';

export const InvoiceDto = z.object({
  id: z.string().uuid().optional(),
  subscriptionId: z.string().uuid(),
  amount: z.number(),
  dueDate: z.date(),
  paidAt: z.date().nullable().optional(),
});

export type InvoiceDtoType = z.infer<typeof InvoiceDto>;
