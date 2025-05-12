import { Subscription } from './subscription.interface';
import { User } from './users.interface';

export interface Company {
  id: string;
  name: string;
  domain: string;
  isActive: boolean;
  users?: User[];
  subscriptions?: Subscription[];
}
