import { EmployeeDtoType } from '@/dtos/employee.dto';
import { Employee } from '@/interfaces/employee.interface';
import EmployeeService from '@/services/employee.service';
import { NextFunction, Request, Response } from 'express';

class EmployeeController {
  public employeeService = new EmployeeService();

  public getEmployees = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employees: Employee[] = await this.employeeService.findAllEmployees();
      res.status(200).json({ data: employees, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeeId = req.params.id;
      const employee: Employee = await this.employeeService.findEmployeeById(employeeId);
      res.status(200).json({ data: employee, message: 'findById' });
    } catch (error) {
      next(error);
    }
  };

  public createEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: EmployeeDtoType = req.body;
      const newEmployee: Employee = await this.employeeService.createEmployee(data);
      res.status(201).json({ data: newEmployee, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeeId = req.params.id;
      const data: Partial<EmployeeDtoType> = req.body;
      const updated: Employee = await this.employeeService.updateEmployee(employeeId, data);
      res.status(200).json({ data: updated, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeeId = req.params.id;
      const deleted: Employee = await this.employeeService.deleteEmployee(employeeId);
      res.status(200).json({ data: deleted, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default EmployeeController;
