import UsersController from '@/controllers/users.controller';
import { UpdateUserSchema } from '@/dtos/users.dto';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

class UserRoute implements Routes {
  public path = '/user';
  public router = Router();
  public userController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Apply authMiddleware to all routes under `/user`
    this.router.use(this.path, authMiddleware);

    this.router.get(`${this.path}`, this.userController.getUsers);
    this.router.get(`${this.path}/:id`, this.userController.getUserById);
    this.router.put(`${this.path}/:id`, validationMiddleware(UpdateUserSchema, 'body'), this.userController.updateUser);
    this.router.delete(`${this.path}/:id`, this.userController.deleteUser);
  }
}

export default UserRoute;
