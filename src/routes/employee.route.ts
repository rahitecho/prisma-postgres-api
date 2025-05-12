import EmployeeController from '@/controllers/employee.controller';
import { EmployeeDto } from '@/dtos/employee.dto';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

class EmployeeRoute implements Routes {
  public path = '/employee';
  public router = Router();
  public controller = new EmployeeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(this.path, authMiddleware);

    this.router.get(`${this.path}`, this.controller.getEmployees);
    this.router.get(`${this.path}/:id`, this.controller.getEmployeeById);
    this.router.post(`${this.path}`, validationMiddleware(EmployeeDto, 'body'), this.controller.createEmployee);
    this.router.put(`${this.path}/:id`, validationMiddleware(EmployeeDto, 'body'), this.controller.updateEmployee);
    this.router.delete(`${this.path}/:id`, this.controller.deleteEmployee);
  }
}

export default EmployeeRoute;
