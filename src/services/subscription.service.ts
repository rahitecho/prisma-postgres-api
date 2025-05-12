import prisma from '@/databases';
import { SubscriptionDtoType } from '@/dtos/subscription.dto';
import { HttpException } from '@/exceptions/HttpException';
import { Subscription } from '@/interfaces/subscription.interface';
import { isEmpty } from '@/utils/util';

class SubscriptionService {
  public async findAllSubscriptions(): Promise<Subscription[]> {
    return prisma.subscription.findMany({ include: { plan: true, company: true, invoices: true } });
  }

  public async findSubscriptionById(subscriptionId: string): Promise<Subscription> {
    if (isEmpty(subscriptionId)) throw new HttpException(400, 'Subscription ID is empty');
    const subscription = await prisma.subscription.findUnique({
      where: { id: subscriptionId },
      include: { plan: true, company: true, invoices: true },
    });
    if (!subscription) throw new HttpException(404, "Subscription doesn't exist");
    return subscription;
  }

  public async createSubscription(data: SubscriptionDtoType): Promise<Subscription> {
    if (isEmpty(data)) throw new HttpException(400, 'Subscription data is empty');
    return prisma.subscription.create({ data });
  }

  public async updateSubscription(subscriptionId: string, data: Partial<SubscriptionDtoType>): Promise<Subscription> {
    if (isEmpty(data)) throw new HttpException(400, 'Subscription data is empty');
    return prisma.subscription.update({ where: { id: subscriptionId }, data });
  }

  public async deleteSubscription(subscriptionId: string): Promise<Subscription> {
    try {
      return await prisma.subscription.delete({ where: { id: subscriptionId } });
    } catch {
      throw new HttpException(404, "Subscription doesn't exist");
    }
  }
}

export default SubscriptionService;
