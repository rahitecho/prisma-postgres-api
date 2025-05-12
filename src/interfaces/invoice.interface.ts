import { Subscription } from './subscription.interface';

export interface Invoice {
  id: string;
  subscriptionId: string;
  amount: number;
  dueDate: Date;
  paidAt?: Date | null;
  subscription?: Subscription;
}
