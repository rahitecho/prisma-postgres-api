import prisma from '@/databases';
import { CreateUserDto } from '@/dtos/users.dto';
import { HttpException } from '@/exceptions/HttpException';
import { User } from '@/interfaces/users.interface';
import { isEmpty } from '@/utils/util';
import { hash } from 'bcrypt';

class UserService {
  public async findAllUser(): Promise<User[]> {
    return prisma.user.findMany();
  }

  public async findUserById(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'User ID is empty');
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new HttpException(404, "User doesn't exist");

    return user;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'User data is empty');
    const existingUser = await prisma.user.findUnique({ where: { email: userData.email } });
    if (existingUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashPassword = await hash(userData.password, 10);
    const user = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashPassword,
      },
    });
    return user;
  }

  public async updateUser(userId: number, userData: Partial<CreateUserDto>): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'User data is empty');

    if (userData.email) {
      const existingUser = await prisma.user.findUnique({ where: { email: userData.email } });
      if (existingUser && existingUser.id !== userId) {
        throw new HttpException(409, `This email ${userData.email} already exists`);
      }
    }

    if (userId) {
      const existingUser = await prisma.user.findUnique({ where: { id: userId } });
      if (!existingUser) {
        throw new HttpException(409, `This User doesn't exists`);
      }
    }

    const updatedData = { ...userData };

    if (userData.password) {
      updatedData.password = await hash(userData.password, 10);
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: updatedData,
    });

    return user;
  }

  public async deleteUser(userId: number): Promise<User> {
    try {
      return await prisma.user.delete({ where: { id: userId } });
    } catch {
      throw new HttpException(404, "User doesn't exist");
    }
  }
}

export default UserService;
