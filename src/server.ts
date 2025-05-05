import App from '@/app';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import CustomerRoute from '@routes/customer.route';
import UserRoute from '@/routes/user.route';
import AuthRoute from '@/routes/auth.route';

validateEnv();

const app = new App([new IndexRoute(), new CustomerRoute(), new UserRoute(), new AuthRoute()]);

app.listen();
