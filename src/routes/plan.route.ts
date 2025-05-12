import PlanController from '@/controllers/plan.controller';
import { PlanDto } from '@/dtos/plan.dto';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

class PlanRoute implements Routes {
  public path = '/plan';
  public router = Router();
  public planController = new PlanController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(this.path, authMiddleware);

    this.router.get(`${this.path}`, this.planController.getPlans);
    this.router.get(`${this.path}/:id`, this.planController.getPlanById);
    this.router.post(`${this.path}`, validationMiddleware(PlanDto, 'body'), this.planController.createPlan);
    this.router.put(`${this.path}/:id`, validationMiddleware(PlanDto, 'body'), this.planController.updatePlan);
    this.router.delete(`${this.path}/:id`, this.planController.deletePlan);
  }
}

export default PlanRoute;
