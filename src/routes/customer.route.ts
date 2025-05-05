import CustomerController from '@/controllers/customer.controller';
import { CreateCustomerSchema } from '@/dtos/customer.dto';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

class CustomerRoute implements Routes {
  public path = '/customer';
  public router = Router();
  public customerController = new CustomerController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Apply authMiddleware to all routes under `/customer`
    this.router.use(this.path, authMiddleware);

    this.router.get(`${this.path}`, this.customerController.getCustomer);
    this.router.post(`${this.path}`, validationMiddleware(CreateCustomerSchema, 'body'), this.customerController.createCustomer);
  }
}

export default CustomerRoute;
