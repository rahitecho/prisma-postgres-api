import PostController from '@/controllers/post.controller';
import { createPostSchema, updatePostSchema } from '@/dtos/post.dto';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

class PostRoute implements Routes {
  public path = '/post';
  public router = Router();
  public postController = new PostController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Apply authMiddleware to all routes under `/user`
    this.router.use(this.path, authMiddleware);

    this.router.get(`${this.path}`, this.postController.getPosts);
    this.router.get(`${this.path}/:id`, this.postController.getPostById);
    this.router.post(`${this.path}`, validationMiddleware(createPostSchema, 'body'), this.postController.createPost);
    this.router.put(`${this.path}/:id`, validationMiddleware(updatePostSchema, 'body'), this.postController.updatePost);
    this.router.delete(`${this.path}/:id`, this.postController.deletePost);
  }
}

export default PostRoute;
