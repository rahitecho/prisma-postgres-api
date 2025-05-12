import prisma from '@/databases';
import { PlanDtoType } from '@/dtos/plan.dto';
import { HttpException } from '@/exceptions/HttpException';
import { Plan } from '@/interfaces/plan.interface';
import { isEmpty } from '@/utils/util';

class PlanService {
  public async findAllPlans(): Promise<Plan[]> {
    return prisma.plan.findMany();
  }

  public async findPlanById(planId: string): Promise<Plan> {
    if (isEmpty(planId)) throw new HttpException(400, 'Plan ID is empty');
    const plan = await prisma.plan.findUnique({ where: { id: planId } });
    if (!plan) throw new HttpException(404, "Plan doesn't exist");

    return plan;
  }

  public async createPlan(planData: PlanDtoType): Promise<Plan> {
    if (isEmpty(planData)) throw new HttpException(400, 'Plan data is empty');

    return prisma.plan.create({ data: planData });
  }

  public async updatePlan(planId: string, planData: Partial<PlanDtoType>): Promise<Plan> {
    if (isEmpty(planData)) throw new HttpException(400, 'Plan data is empty');
    const plan = await prisma.plan.update({ where: { id: planId }, data: planData });
    return plan;
  }

  public async deletePlan(planId: string): Promise<Plan> {
    try {
      return await prisma.plan.delete({ where: { id: planId } });
    } catch {
      throw new HttpException(404, "Plan doesn't exist");
    }
  }
}

export default PlanService;
