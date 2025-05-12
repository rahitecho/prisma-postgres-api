import App from '@/app';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import CustomerRoute from '@routes/customer.route';
import UserRoute from '@/routes/user.route';
import AuthRoute from '@/routes/auth.route';
import PostRoute from '@/routes/post.route';
import CompanyRoute from '@/routes/company.route';
import PlanRoute from '@/routes/plan.route';
import SubscriptionRoute from '@/routes/subscription.route';
import InvoiceRoute from '@/routes/invoice.route';
import EmployeeRoute from '@/routes/employee.route';

validateEnv();

const app = new App([
  new IndexRoute(),
  new CustomerRoute(),
  new UserRoute(),
  new AuthRoute(),
  new PostRoute(),
  new CompanyRoute(),
  new PlanRoute(),
  new SubscriptionRoute(),
  new InvoiceRoute(),
  new EmployeeRoute(),
]);

app.listen();
