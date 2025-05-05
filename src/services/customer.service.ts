// import { Repository } from 'typeorm';
import { Customer } from '@/interfaces/customer.interface';
import { CustomerModel } from '@/models/customer.model';
import { CreateCustomerDto } from '@/dtos/customer.dto';
import { HttpException } from '@/exceptions/HttpException';
import prisma from '@/databases';

class CustomerService {
  public async findAllCustomer(): Promise<Customer[]> {
    return await prisma.customer.findMany();
  }

  public async createCustomer(customerData: CreateCustomerDto): Promise<Customer> {
    const findCustomer: Customer = await prisma.customer.findUnique({ where: { email: customerData.email } });
    if (findCustomer) throw new HttpException(409, `This email ${customerData.email} already exists`);
    const transformedData = {
      ...customerData,
      isverified: customerData.isverified ? 1 : 0,
      dob: customerData.dob ? new Date(customerData.dob) : null,
    };
    const customer = prisma.customer.create({ data: transformedData });
    return customer;
  }
}

export default CustomerService;
