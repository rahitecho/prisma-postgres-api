import { NextFunction, Request, Response } from 'express';
import CustomerService from '@/services/customer.service';
import { Customer } from '@/interfaces/customer.interface';
import { CreateCustomerDto } from '@/dtos/customer.dto';

class CustomerController {
  public customerService = new CustomerService();

  public getCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllCustomer: Customer[] = await this.customerService.findAllCustomer();
      res.status(200).json({ data: findAllCustomer, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customerData: CreateCustomerDto = req.body;
      const createCustomerData: Customer = await this.customerService.createCustomer(customerData);
      res.status(201).json({ data: createCustomerData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}

export default CustomerController;
