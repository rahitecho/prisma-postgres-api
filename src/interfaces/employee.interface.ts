import { Company } from './company.interface';
import { Post } from './post.interface';

export interface Employee {
  id: string;
  name: string;
  email: string;
  password: string;
  companyId: string;
  company?: Company;
  position?: string;
  posts?: Post[];
}
