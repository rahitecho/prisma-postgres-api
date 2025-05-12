import { PlanDtoType } from '@/dtos/plan.dto';
import { Plan } from '@/interfaces/plan.interface';
import PlanService from '@/services/plan.service';
import { NextFunction, Request, Response } from 'express';

class PlanController {
  public planService = new PlanService();

  public getPlans = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const plans: Plan[] = await this.planService.findAllPlans();
      res.status(200).json({ data: plans, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getPlanById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const planId = req.params.id;
      const plan: Plan = await this.planService.findPlanById(planId);
      res.status(200).json({ data: plan, message: 'findById' });
    } catch (error) {
      next(error);
    }
  };

  public createPlan = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const planData: PlanDtoType = req.body;
      const newPlan: Plan = await this.planService.createPlan(planData);
      res.status(201).json({ data: newPlan, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updatePlan = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const planId = req.params.id;
      const planData: PlanDtoType = req.body;
      const updatedPlan: Plan = await this.planService.updatePlan(planId, planData);
      res.status(200).json({ data: updatedPlan, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletePlan = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const planId = req.params.id;
      const deletedPlan: Plan = await this.planService.deletePlan(planId);
      res.status(200).json({ data: deletedPlan, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default PlanController;
