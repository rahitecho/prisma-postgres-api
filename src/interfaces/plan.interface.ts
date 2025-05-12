import { Subscription } from './subscription.interface';

export interface Plan {
  id: string;
  name: string;
  price: number;
  maxUsers: number;
  features: string[];
  subscriptions?: Subscription[];
}
