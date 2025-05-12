import CompanyController from '@/controllers/company.controller';
import { CompanyDto } from '@/dtos/company.dto';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

class CompanyRoute implements Routes {
  public path = '/company';
  public router = Router();
  public companyController = new CompanyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Apply authMiddleware to all routes under `/user`
    this.router.use(this.path, authMiddleware);

    this.router.get(`${this.path}`, this.companyController.getCompanys);
    this.router.get(`${this.path}/:id`, this.companyController.getCompanyById);
    this.router.post(`${this.path}`, validationMiddleware(CompanyDto, 'body'), this.companyController.createCompany);
    this.router.put(`${this.path}/:id`, validationMiddleware(CompanyDto, 'body'), this.companyController.updateCompany);
    this.router.delete(`${this.path}/:id`, this.companyController.deletePost);
  }
}

export default CompanyRoute;
