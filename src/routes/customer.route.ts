import CustomerController from '@/controllers/customer.controller';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import { Router } from 'express';

class CustomerRoute implements Routes {
  public path = '/customer';
  public router = Router();
  public customerController = new CustomerController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.customerController.getCustomer);
    this.router.post(`${this.path}`, this.customerController.createCustomer);
  }
}

export default CustomerRoute;
