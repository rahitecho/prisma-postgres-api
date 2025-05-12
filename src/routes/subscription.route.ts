import SubscriptionController from '@/controllers/subscription.controller';
import { SubscriptionDto } from '@/dtos/subscription.dto';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

class SubscriptionRoute implements Routes {
  public path = '/subscription';
  public router = Router();
  public subscriptionController = new SubscriptionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(this.path, authMiddleware);

    this.router.get(`${this.path}`, this.subscriptionController.getSubscriptions);
    this.router.get(`${this.path}/:id`, this.subscriptionController.getSubscriptionById);
    this.router.post(`${this.path}`, validationMiddleware(SubscriptionDto, 'body'), this.subscriptionController.createSubscription);
    this.router.put(`${this.path}/:id`, validationMiddleware(SubscriptionDto, 'body'), this.subscriptionController.updateSubscription);
    this.router.delete(`${this.path}/:id`, this.subscriptionController.deleteSubscription);
  }
}

export default SubscriptionRoute;
