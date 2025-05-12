import { Company } from './company.interface';
import { Invoice } from './invoice.interface';
import { Plan } from './plan.interface';

export interface Subscription {
  id: string;
  status: 'trial' | 'active' | 'cancelled' | string;
  startDate: Date;
  endDate: Date;
  companyId: string;
  planId: string;
  company?: Company;
  plan?: Plan;
  invoices?: Invoice[];
}
