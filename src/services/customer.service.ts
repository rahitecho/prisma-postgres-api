import { Repository } from 'typeorm';
import { Customer } from '@/interfaces/customer.interface';
import { CustomerModel } from '@/models/customer.model';
import { dbConnection } from '@/databases';
import { CreateCustomerDto } from '@/dtos/customer.dto';
import { HttpException } from '@/exceptions/HttpException';

class CustomerService {
  private customerRepositary: Repository<CustomerModel>;

  constructor() {
    this.customerRepositary = dbConnection.getRepository(CustomerModel);
  }

  public async findAllCustomer(): Promise<Customer[]> {
    return await this.customerRepositary.find();
  }

  public async createCustomer(customerData: CreateCustomerDto): Promise<Customer> {
    const findCustomer: Customer = await this.customerRepositary.findOne({ where: { email: customerData.email } });
    if (findCustomer) throw new HttpException(409, `This email ${customerData.email} already exists`);
    const transformedData = {
      ...customerData,
      isverified: customerData.isverified ? 1 : 0,
    };
    const customer = this.customerRepositary.create(transformedData);
    return await this.customerRepositary.save(customer);
  }
}

export default CustomerService;
