import prisma from '@/databases';
import { EmployeeDtoType } from '@/dtos/employee.dto';
import { HttpException } from '@/exceptions/HttpException';
import { Employee } from '@/interfaces/employee.interface';
import { isEmpty } from '@/utils/util';
import { hash } from 'bcrypt';

class EmployeeService {
  public async findAllEmployees(): Promise<Employee[]> {
    return prisma.employee.findMany();
  }

  public async findEmployeeById(employeeId: string): Promise<Employee> {
    if (isEmpty(employeeId)) throw new HttpException(400, 'Employee ID is empty');
    const employee = await prisma.employee.findUnique({ where: { id: employeeId } });
    if (!employee) throw new HttpException(404, "Employee doesn't exist");

    return employee;
  }

  public async createEmployee(employeeData: EmployeeDtoType): Promise<Employee> {
    if (isEmpty(employeeData)) throw new HttpException(400, 'Employee data is empty');

    const existing = await prisma.employee.findUnique({ where: { email: employeeData.email } });
    if (existing) throw new HttpException(409, `This email already exists`);

    const hashedPassword = await hash(employeeData.password, 10);

    const employee = await prisma.employee.create({
      data: { ...employeeData, password: hashedPassword },
    });

    return employee;
  }

  public async updateEmployee(employeeId: string, employeeData: Partial<EmployeeDtoType>): Promise<Employee> {
    if (isEmpty(employeeData)) throw new HttpException(400, 'Employee data is empty');

    const employee = await prisma.employee.update({
      where: { id: employeeId },
      data: employeeData,
    });

    return employee;
  }

  public async deleteEmployee(employeeId: string): Promise<Employee> {
    try {
      return await prisma.employee.delete({ where: { id: employeeId } });
    } catch {
      throw new HttpException(404, "Employee doesn't exist");
    }
  }
}

export default EmployeeService;
