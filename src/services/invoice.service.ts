import prisma from '@/databases';
import { InvoiceDtoType } from '@/dtos/invoice.dto';
import { HttpException } from '@/exceptions/HttpException';
import { Invoice } from '@/interfaces/invoice.interface';
import { isEmpty } from '@/utils/util';

class InvoiceService {
  public async findAllInvoices(): Promise<Invoice[]> {
    return prisma.invoice.findMany({ include: { subscription: true } });
  }

  public async findInvoiceById(invoiceId: string): Promise<Invoice> {
    if (isEmpty(invoiceId)) throw new HttpException(400, 'Invoice ID is empty');
    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: { subscription: true },
    });
    if (!invoice) throw new HttpException(404, "Invoice doesn't exist");
    return invoice;
  }

  public async createInvoice(data: InvoiceDtoType): Promise<Invoice> {
    if (isEmpty(data)) throw new HttpException(400, 'Invoice data is empty');
    return prisma.invoice.create({ data });
  }

  public async updateInvoice(invoiceId: string, data: Partial<InvoiceDtoType>): Promise<Invoice> {
    if (isEmpty(data)) throw new HttpException(400, 'Invoice data is empty');
    return prisma.invoice.update({ where: { id: invoiceId }, data });
  }

  public async deleteInvoice(invoiceId: string): Promise<Invoice> {
    try {
      return await prisma.invoice.delete({ where: { id: invoiceId } });
    } catch {
      throw new HttpException(404, "Invoice doesn't exist");
    }
  }
}

export default InvoiceService;
