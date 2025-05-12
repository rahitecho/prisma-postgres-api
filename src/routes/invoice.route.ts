import InvoiceController from '@/controllers/invoice.controller';
import { InvoiceDto } from '@/dtos/invoice.dto';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

class InvoiceRoute implements Routes {
  public path = '/invoice';
  public router = Router();
  public invoiceController = new InvoiceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(this.path, authMiddleware);

    this.router.get(`${this.path}`, this.invoiceController.getInvoices);
    this.router.get(`${this.path}/:id`, this.invoiceController.getInvoiceById);
    this.router.post(`${this.path}`, validationMiddleware(InvoiceDto, 'body'), this.invoiceController.createInvoice);
    this.router.put(`${this.path}/:id`, validationMiddleware(InvoiceDto, 'body'), this.invoiceController.updateInvoice);
    this.router.delete(`${this.path}/:id`, this.invoiceController.deleteInvoice);
  }
}

export default InvoiceRoute;
