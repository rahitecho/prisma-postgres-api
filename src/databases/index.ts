import { CustomerModel } from '@/models/customer.model';
import { DB_HOST, DB_NAME, DB_PASS, DB_USER } from '@config';
import { DataSource } from 'typeorm';

// export const dbConnection = {
//   url: MONGODB_URI,
//   options: {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
// };

export const dbConnection = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: 5432,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  entities: [CustomerModel],
  synchronize: true,
  logging: false,
  migrations: [],
  subscribers: [],
});
