import { CompanyDtoType } from '@/dtos/company.dto';
import { Company } from '@/interfaces/company.interface';
import CompanyService from '@/services/company.service';
import { NextFunction, Request, Response } from 'express';

class CompanyController {
  public companyService = new CompanyService();

  public getCompanys = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllPost: Company[] = await this.companyService.findAllCompany();
      res.status(200).json({ data: findAllPost, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCompanyById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId = req.params.id;
      const post: Company = await this.companyService.findCompanyById(postId);
      res.status(200).json({ data: post, message: 'findById' });
    } catch (error) {
      next(error);
    }
  };

  public createCompany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postData: CompanyDtoType = req.body;
      const createPostData: Company = await this.companyService.createCompany(postData);
      res.status(201).json({ data: createPostData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateCompany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const companyId = req.params.id;
      const companyData: CompanyDtoType = req.body;
      const updateCompanyData: Company = await this.companyService.updateCompany(companyId, companyData);
      res.status(201).json({ data: updateCompanyData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const companyId = req.params.id;
      const deleteCompanyData: Company = await this.companyService.deleteCompany(companyId);

      res.status(200).json({ data: deleteCompanyData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default CompanyController;
