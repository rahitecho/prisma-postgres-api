import prisma from '@/databases';
import { CompanyDtoType } from '@/dtos/company.dto';
import { HttpException } from '@/exceptions/HttpException';
import { Company } from '@/interfaces/company.interface';
import { isEmpty } from '@/utils/util';

class CompanyService {
  public async findAllCompany(): Promise<Company[]> {
    return prisma.company.findMany();
  }

  public async findCompanyById(companyId: string): Promise<Company> {
    if (isEmpty(companyId)) throw new HttpException(400, 'Company ID is empty');
    const company = await prisma.company.findUnique({ where: { id: companyId } });
    if (!company) throw new HttpException(404, "Company doesn't exist");

    return company;
  }

  public async createCompany(companyData: CompanyDtoType): Promise<Company> {
    const existingCompanyDomain = await prisma.company.findUnique({ where: { domain: companyData.domain } });
    if (existingCompanyDomain) {
      throw new HttpException(409, 'Domain already eist');
    }
    return await prisma.company.create({
      data: companyData,
    });
  }

  public async updateCompany(companyId: string, companyData: Partial<CompanyDtoType>): Promise<Company> {
    if (isEmpty(companyData)) throw new HttpException(400, 'Company data is empty');

    if (companyId) {
      const existingCompany = await prisma.company.findUnique({ where: { id: companyId } });
      if (!existingCompany) {
        throw new HttpException(409, `This company doesn't exists`);
      }
    }

    const updatedData = { ...companyData };

    const company = await prisma.company.update({
      where: { id: companyId },
      data: updatedData,
    });

    return company;
  }

  public async deleteCompany(companyId: string): Promise<Company> {
    try {
      return await prisma.company.delete({ where: { id: companyId } });
    } catch {
      throw new HttpException(404, "User doesn't exist");
    }
  }
}

export default CompanyService;
