import { SubscriptionDtoType } from '@/dtos/subscription.dto';
import { Subscription } from '@/interfaces/subscription.interface';
import SubscriptionService from '@/services/subscription.service';
import { NextFunction, Request, Response } from 'express';

class SubscriptionController {
  public subscriptionService = new SubscriptionService();

  public getSubscriptions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subscriptions: Subscription[] = await this.subscriptionService.findAllSubscriptions();
      res.status(200).json({ data: subscriptions, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getSubscriptionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subscriptionId = req.params.id;
      const subscription: Subscription = await this.subscriptionService.findSubscriptionById(subscriptionId);
      res.status(200).json({ data: subscription, message: 'findById' });
    } catch (error) {
      next(error);
    }
  };

  public createSubscription = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subscriptionData: SubscriptionDtoType = req.body;
      const newSubscription: Subscription = await this.subscriptionService.createSubscription(subscriptionData);
      res.status(201).json({ data: newSubscription, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateSubscription = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subscriptionId = req.params.id;
      const subscriptionData: SubscriptionDtoType = req.body;
      const updatedSubscription: Subscription = await this.subscriptionService.updateSubscription(subscriptionId, subscriptionData);
      res.status(200).json({ data: updatedSubscription, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteSubscription = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subscriptionId = req.params.id;
      const deletedSubscription: Subscription = await this.subscriptionService.deleteSubscription(subscriptionId);
      res.status(200).json({ data: deletedSubscription, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default SubscriptionController;
