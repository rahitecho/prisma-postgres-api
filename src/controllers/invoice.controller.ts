import { InvoiceDtoType } from '@/dtos/invoice.dto';
import { Invoice } from '@/interfaces/invoice.interface';
import InvoiceService from '@/services/invoice.service';
import { NextFunction, Request, Response } from 'express';

class InvoiceController {
  public invoiceService = new InvoiceService();

  public getInvoices = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const invoices: Invoice[] = await this.invoiceService.findAllInvoices();
      res.status(200).json({ data: invoices, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getInvoiceById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const invoiceId = req.params.id;
      const invoice: Invoice = await this.invoiceService.findInvoiceById(invoiceId);
      res.status(200).json({ data: invoice, message: 'findById' });
    } catch (error) {
      next(error);
    }
  };

  public createInvoice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const invoiceData: InvoiceDtoType = req.body;
      const newInvoice: Invoice = await this.invoiceService.createInvoice(invoiceData);
      res.status(201).json({ data: newInvoice, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateInvoice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const invoiceId = req.params.id;
      const invoiceData: InvoiceDtoType = req.body;
      const updatedInvoice: Invoice = await this.invoiceService.updateInvoice(invoiceId, invoiceData);
      res.status(200).json({ data: updatedInvoice, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteInvoice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const invoiceId = req.params.id;
      const deletedInvoice: Invoice = await this.invoiceService.deleteInvoice(invoiceId);
      res.status(200).json({ data: deletedInvoice, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default InvoiceController;
